<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { botApi, type FileData } from '@/api/bot'
import { useBotStore } from '@/stores/bot'

const botStore = useBotStore()
const validationError = ref('')
const isSaving = ref(false)
const isUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const promptPlaceholder = 'Вы — Алекс, полезный искусственный интеллект службы поддержки клиентов. Ваш тон должен быть дружелюбным, лаконичным и профессиональным. Всегда ставьте в приоритет быстрое решение проблемы пользователя.'

const formatDate = (iso: string): string => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

const pluralFiles = (n: number): string => {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return `${n} файл`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} файла`
  return `${n} файлов`
}

const loadData = async () => {
  await botStore.loadBotConfig()
  await botStore.loadFiles()
}

const canSave = computed(() => (botStore.botConfig.name ?? '').trim().length > 0 && (botStore.botConfig.prompt ?? '').trim().length > 0)

const saveChanges = async () => {
  validationError.value = ''

  if (!(botStore.botConfig.name ?? '').trim()) {
    validationError.value = 'Пожалуйста, заполните поле "Имя Бота"'
    return
  }

  if (!(botStore.botConfig.prompt ?? '').trim()) {
    validationError.value = 'Пожалуйста, заполните поле "Системный Промпт"'
    return
  }

  if (isSaving.value) return
  isSaving.value = true
  try {
    await botStore.updateBotConfig(botStore.botConfig)
    validationError.value = ''
    alert('Изменения сохранены')
  } catch (error) {
    console.error('Failed to save changes', error)
    alert('Не удалось сохранить изменения')
  } finally {
    isSaving.value = false
  }
}

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  await uploadNewFile(target.files[0])
  // reset input
  if (fileInput.value) {
      fileInput.value.value = ''
  }
}

const onDrop = async (event: DragEvent) => {
  if (!event.dataTransfer?.files || event.dataTransfer.files.length === 0) return
  await uploadNewFile(event.dataTransfer.files[0])
}

const uploadNewFile = async (file: File) => {
  if (isUploading.value) return

  // Validate type
  const validTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!validTypes.includes(file.type) && !file.name.endsWith('.docx') && !file.name.endsWith('.txt') && !file.name.endsWith('.pdf')) {
      alert('Поддерживает форматы PDF, TXT, DOCX')
      return
  }

  // Validate size
  if (file.size > 10 * 1024 * 1024) {
      alert('Размер файла до 10 МБ')
      return
  }

  isUploading.value = true
  try {
      const newFile = await botApi.uploadFile(file)
      botStore.files.push(newFile)
  } catch (error) {
      console.error('Failed to upload file', error)
      alert('Не удалось загрузить файл')
  } finally {
      isUploading.value = false
  }
}

const deleteFile = async (fileId: string) => {
  try {
      await botApi.deleteFile(fileId)
      botStore.files = botStore.files.filter(f => f.id !== fileId)
  } catch (error) {
      console.error('Failed to delete file', error)
      alert('Не удалось удалить файл')
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6 lg:mt-[100px] mt-[20px]">
      <h1 class="text-[32px] font-semibold text-[#42008A] leading-[16px] tracking-[0.24px]">Автоматизация</h1>

      <div class="bg-[#F4EFFF] rounded-[15px] p-6 lg:w-[1121px] lg:h-[455px] relative">
        <h2 class="text-[20px] font-medium text-black leading-[16px] tracking-[0.24px] mb-4 lg:absolute lg:left-[31px] lg:top-[27px]">Настройки бота</h2>
        <div class="hidden lg:block absolute w-[1077.01px] h-[0px] left-[17px] top-[74.98px] border-t border-[rgba(66,0,138,0.69)]"></div>
        <div class="lg:hidden border-t border-[rgba(66,0,138,0.69)] my-4"></div>

        <div v-if="validationError" class="mb-4 p-3 bg-red-100 border border-red-300 rounded-[8px] text-red-700 text-[14px]">
          {{ validationError }}
        </div>

        <div class="lg:absolute lg:left-[31px] lg:top-[100px] w-full lg:w-[1063px]">
          <label class="block text-[16px] font-medium text-black leading-[16px] tracking-[0.24px] mb-2">Имя Бота</label>
          <input
            v-model="botStore.botConfig.name"
            type="text"
            placeholder="Алекс"
            class="w-full h-[53px] bg-transparent border border-[rgba(66,0,138,0.69)] rounded-[10px] px-4 font-medium text-[16px] text-black focus:outline-none focus:border-[#42008A]"
          >
        </div>

        <div class="mt-6 lg:mt-0 lg:absolute lg:left-[31px] lg:top-[202px] w-full lg:w-[1063px]">
          <label class="block text-[16px] font-medium text-black leading-[16px] tracking-[0.24px] mb-2">Системный Промпт</label>
          <textarea
            v-model="botStore.botConfig.prompt"
            :placeholder="promptPlaceholder"
            class="w-full h-[124px] bg-transparent border border-[rgba(66,0,138,0.69)] rounded-[10px] p-4 font-medium text-[16px] leading-[20px] tracking-[0.24px] text-[rgba(66,71,84,0.6)] placeholder-gray-400 focus:outline-none focus:border-[#42008A] resize-none"
          ></textarea>
          <p class="mt-2 text-[14px] font-medium text-black leading-[16px] tracking-[0.24px]">Определяет основные характеристики и инструкции для вашего бота.</p>
        </div>

        <button
          @click="saveChanges"
          :disabled="!canSave || isSaving"
          class="mt-6 lg:mt-0 lg:absolute lg:right-[31px] lg:bottom-[23px] w-[202px] h-[40px] rounded-[10px] font-medium text-[14px] leading-[16px] tracking-[0.24px] flex items-center justify-center transition-colors"
          :class="canSave && !isSaving ? 'bg-[#42008A] text-white hover:bg-opacity-90' : 'bg-[#E5E7EB] text-[#8B95A7] cursor-not-allowed'"
        >
          {{ isSaving ? 'Сохранение...' : 'Сохранить Изменения' }}
        </button>
      </div>

      <div class="bg-[#F4EFFF] rounded-[15px] p-6 lg:w-[1121px] min-h-[539px] relative">
        <div class="flex justify-between items-center mb-4 lg:absolute lg:left-[31px] lg:top-[32px] lg:w-[1056px]">
          <h2 class="text-[20px] font-medium text-black leading-[16px] tracking-[0.24px]">База данных</h2>
          <div class="bg-[rgba(66,0,138,0.69)] text-white text-[12px] font-medium leading-[16px] tracking-[0.24px] px-3 py-1 rounded-[13px] flex items-center justify-center min-w-[100px] h-[26px]">
            {{ pluralFiles(botStore.files.length) }}
          </div>
        </div>

        <div class="hidden lg:block absolute w-[1056px] h-[0px] left-[31px] top-[85.48px] border-t border-[rgba(66,0,138,0.69)]"></div>
        <div class="lg:hidden border-t border-[rgba(66,0,138,0.69)] my-4 relative top-[-10px]"></div>

        <div
          @dragover.prevent
          @drop.prevent="onDrop"
          class="border-2 border-dashed border-[rgba(66,0,138,0.69)] rounded-[10px] p-8 flex flex-col items-center justify-center lg:absolute lg:left-[31px] lg:top-[109px] lg:w-[1056px] lg:h-[206px]"
        >
          <svg width="45" height="40" viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-4">
            <path d="M22.5 12.5V26.6667M22.5 12.5L16.6667 18.3333M22.5 12.5L28.3333 18.3333M32.3167 19.3167C34.7214 19.5768 36.9818 20.7303 38.6441 22.5484C40.3065 24.3664 41.2514 26.7161 41.2917 29.1667C41.2917 33.7667 37.5583 37.5 32.9583 37.5H12.9583C7.89167 37.5 3.79167 33.4 3.79167 28.3333C3.79167 23.5167 7.50833 19.5667 12.225 19.1833C13.2039 13.4357 18.2 9.09117 24.0326 9.17646C29.8651 9.26176 34.6293 13.7483 35.4333 19.5667" stroke="#9A7CC2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="22.5" cy="18.5" r="13.5" fill="#9A7CC2"/>
            <path d="M22.5 13V24M22.5 13L18 17.5M22.5 13L27 17.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="text-[14px] font-medium text-[#424754] mb-1">Перетащите файлы сюда</p>
          <p class="text-[12px] font-semibold tracking-[0.24px] text-[#424754] mb-4">Поддерживает форматы PDF, TXT, DOCX размером до 10 МБ.</p>
          <div class="flex flex-col items-start pt-[16px] w-[155px] h-[54px]">
            <button
              @click="triggerFileInput"
              :disabled="isUploading"
              class="bg-white border border-[#C2C6D6] rounded-[8px] flex flex-col justify-center items-center px-4 py-2 w-[155px] h-[38px] hover:bg-gray-50 disabled:opacity-50"
            >
              <span class="font-medium text-[14px] leading-[20px] text-center text-[#191B23]">
                {{ isUploading ? 'Загрузка...' : 'Загрузить Файлы' }}
              </span>
            </button>
          </div>
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            @change="handleFileUpload"
          >
        </div>

        <div class="mt-8 lg:mt-0 flex flex-col gap-4 lg:absolute lg:left-[31px] lg:top-[347px] w-full lg:w-[1056px]">
          <div
            v-for="file in botStore.files"
            :key="file.id"
            class="border border-[rgba(66,0,138,0.69)] rounded-[10px] p-4 flex items-center justify-between h-[73px] bg-transparent"
          >
            <div class="flex items-center gap-4">
              <div class="w-[29px] h-[37px] flex-shrink-0 text-[#9A7CC2]">
                <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
              </div>
              <div class="flex flex-col">
                <span class="font-medium text-[14px] leading-[20px] text-[#191B23]">{{ file.name }}</span>
                <span class="font-semibold text-[12px] leading-[16px] tracking-[0.24px] text-[#424754]">{{ (file.size / 1024 / 1024).toFixed(1) }} MB • {{ formatDate(file.uploadDate) }}</span>
              </div>
            </div>
            <button
              @click="deleteFile(file.id)"
              class="w-[36px] h-[27px] text-[#9A7CC2] hover:text-[#42008A] flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
</style>

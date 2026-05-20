<template>
  <div class="w-full">
    <div v-if="!chatStore.canAccessChat" class="mb-4 p-4 bg-[#FEF3C7] border border-[#FBBF24] rounded-[10px] text-[#92400E] text-[14px] text-center">
      Пожалуйста, сначала заполните форму в разделе <strong>Автоматизация</strong> (Имя Бота и Системный Промпт)
    </div>

    <div class="flex gap-2 items-center">
      <input
        v-model="messageText"
        type="text"
        placeholder="Введите сообщение..."
        :disabled="!chatStore.canAccessChat || isLoading"
        @keyup.enter="sendMessage"
        class="flex-1 h-[44px] px-4 py-2 border border-[rgba(66,0,138,0.2)] rounded-[10px] text-[14px] focus:outline-none focus:border-[#42008A] disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed"
      />
      <button
        @click="sendMessage"
        :disabled="!chatStore.canAccessChat || isLoading || !messageText.trim()"
        class="flex-shrink-0 w-[44px] h-[44px] rounded-[10px] flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :class="chatStore.canAccessChat && messageText.trim() && !isLoading
          ? 'bg-[#42008A] hover:bg-opacity-90 text-white'
          : 'bg-[#E5E7EB] text-[#9CA3AF]'"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
          <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16679026 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.98722575 L3.03521743,10.4282188 C3.03521743,10.5853161 3.19218622,10.7424135 3.50612381,10.7424135 L16.6915026,11.5279004 C16.6915026,11.5279004 17.1624089,11.5279004 17.1624089,12.0005435 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" fill="currentColor"/>
        </svg>
      </button>
    </div>

    <div v-if="chatStore.error" class="mt-2 text-[12px] text-red-600">
      {{ chatStore.error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const messageText = ref('')

const isLoading = computed(() => chatStore.isLoading)

const sendMessage = async () => {
  if (!messageText.value.trim() || !chatStore.canAccessChat || isLoading.value) {
    return
  }

  const text = messageText.value
  messageText.value = ''

  await chatStore.sendMessage(text)
}
</script>

<style scoped></style>


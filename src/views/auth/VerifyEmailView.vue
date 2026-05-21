<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authApi } from '@/api/auth'

const route = useRoute()
const router = useRouter()

const codeDigits = ref(['', '', '', '', '', ''])
const isLoading = ref(false)
const isResending = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const verificationEmail = computed(() => {
  const queryEmail = route.query.email
  const storedEmail = sessionStorage.getItem('verificationEmail')

  if (typeof queryEmail === 'string' && queryEmail.trim()) {
    return queryEmail.trim()
  }

  return storedEmail || ''
})

watch(
  verificationEmail,
  (value) => {
    if (value) {
      sessionStorage.setItem('verificationEmail', value)
    }
  },
  { immediate: true }
)

const code = computed(() => codeDigits.value.join(''))

const focusDigit = (index: number) => {
  const input = document.getElementById(`verification-code-${index}`) as HTMLInputElement | null
  input?.focus()
  input?.select()
}

const handleInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '').slice(-1)
  codeDigits.value[index] = value

  if (value && index < codeDigits.value.length - 1) {
    focusDigit(index + 1)
  }
}

const handleKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !codeDigits.value[index] && index > 0) {
    focusDigit(index - 1)
  }
}

const handlePaste = (event: ClipboardEvent) => {
  const pasted = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6) || ''
  if (!pasted) return

  event.preventDefault()
  codeDigits.value = Array.from({ length: 6 }, (_, index) => pasted[index] || '')
}

const handleVerify = async () => {
  if (code.value.length !== 6 || !verificationEmail.value) {
    errorMessage.value = 'Введите 6-значный код'
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    const response = await authApi.verifyEmail({
      email: verificationEmail.value,
      code: code.value
    })

    if (response.token) {
      localStorage.setItem('token', response.token)
    }

    sessionStorage.removeItem('verificationEmail')
    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Не удалось подтвердить email'
  } finally {
    isLoading.value = false
  }
}

const handleResend = async () => {
  if (!verificationEmail.value) {
    errorMessage.value = 'Email для отправки кода не найден'
    return
  }

  try {
    isResending.value = true
    errorMessage.value = ''
    successMessage.value = ''

    await authApi.resendCode({
      email: verificationEmail.value
    })

    successMessage.value = 'Новый код отправлен на email'
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Не удалось отправить код повторно'
  } finally {
    isResending.value = false
  }
}
</script>

<template>
  <div class="verification-page relative w-full min-h-screen bg-white overflow-hidden font-['Inter']">
    <!-- Декоративные эллипсы -->
    <div class="absolute w-[531px] h-[307.5px] left-[183px] top-[806.5px] bg-[#D7D3F6] blur-[50px] pointer-events-none"></div>
    <div class="absolute w-[179px] h-[337px] left-[658px] top-[942px] bg-[#42008A] blur-[50px] pointer-events-none"></div>

    <!-- Основной контент на весь экран -->
    <div class="w-full min-h-screen flex flex-col items-center justify-center relative px-4 py-8">
      <div class="verification-card w-full max-w-[600px] bg-white shadow-[5px_5px_4px_rgba(0,0,0,0.09)] rounded-[30px] p-6 sm:p-10 flex flex-col items-center justify-center">
        <div class="flex items-center justify-center gap-[4px] mb-[4px]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#42008A"/>
            <path d="M19.5 16.5L20.65 19.35L23.5 20.5L20.65 21.65L19.5 24.5L18.35 21.65L15.5 20.5L18.35 19.35L19.5 16.5Z" fill="#42008A"/>
          </svg>
          <span class="text-[24px] font-semibold text-[#42008A] leading-[29px]">replAI</span>
        </div>

        <p class="text-[16px] font-normal text-[#000000] leading-[19px] text-center mb-[55px]">Подтвердите email</p>

        <p class="text-[16px] font-normal text-[#6B7280] leading-[19px] text-center max-w-[434px] mb-[39px]">
          Мы отправили код подтверждения на ваш email. Введите его ниже для завершения регистрации.
        </p>

        <div class="flex gap-[12px] sm:gap-[14px] mb-[61px]">
          <input
            v-for="(digit, index) in codeDigits"
            :key="index"
            :id="`verification-code-${index}`"
            :value="digit"
            type="text"
            inputmode="numeric"
            maxlength="1"
            autocomplete="one-time-code"
            class="verification-input h-[54px] w-[49px] bg-[rgba(173,173,173,0.2)] rounded-[10px] text-center text-[20px] font-medium outline-none focus:border focus:border-[#42008A] transition-colors text-[#000000]"
            @input="handleInput(index, $event)"
            @keydown="handleKeydown(index, $event)"
            @paste="handlePaste"
          />
        </div>

        <button
          type="button"
          @click="handleVerify"
          :disabled="isLoading"
          class="w-full max-w-[232px] h-[54px] bg-[#42008A] text-[#FFFFFF] rounded-[10px] text-[16px] font-medium leading-[19px] hover:bg-[#5a1a9f] transition-colors disabled:opacity-70 flex items-center justify-center mb-[24px]"
        >
          {{ isLoading ? 'Проверка...' : 'Подтвердить' }}
        </button>

        <p v-if="errorMessage" class="mb-[10px] text-[14px] text-[#b91c1c] text-center">
          {{ errorMessage }}
        </p>
        <p v-if="successMessage" class="mb-[10px] text-[14px] text-[#15803d] text-center">
          {{ successMessage }}
        </p>

        <div class="flex flex-wrap items-center justify-center gap-x-[6px] gap-y-1 text-[16px] leading-[19px] text-center">
          <span class="text-[#000000]">Не получили код?</span>
          <button type="button" @click="handleResend" :disabled="isResending" class="text-[#42008A] hover:underline disabled:opacity-70">
            {{ isResending ? 'Отправляем...' : 'Отправить повторно' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.verification-page {
  background: linear-gradient(135deg, #D7D3F6 0%, #E8E5F3 100%);
}

@media (max-width: 640px) {
  .verification-input {
    width: 40px;
    height: 48px;
  }
}
</style>

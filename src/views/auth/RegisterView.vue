<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/auth'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = useRouter()

const companyName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  if (!email.value || !password.value || password.value !== confirmPassword.value) {
    errorMessage.value = password.value !== confirmPassword.value ? 'Пароли не совпадают' : 'Заполните обязательные поля'
    return
  }

  try {
    isLoading.value = true
    errorMessage.value = ''
    const response = await authApi.register({
      companyName: companyName.value,
      email: email.value,
      password: password.value
    })

    const verificationEmail = response.user?.email || email.value
    sessionStorage.setItem('verificationEmail', verificationEmail)
    router.push({
      path: '/verify-email',
      query: {
        email: verificationEmail
      }
    })
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Ошибка регистрации'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AuthLayout>
    <div class="w-full bg-white shadow-[5px_5px_4px_rgba(0,0,0,0.09)] rounded-[30px] p-6 sm:p-10 lg:w-[558px] lg:h-[691px] flex flex-col items-center justify-center relative mx-auto">
      <div class="flex items-center justify-center gap-[4px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#42008A"/>
          <path d="M19.5 16.5L20.65 19.35L23.5 20.5L20.65 21.65L19.5 24.5L18.35 21.65L15.5 20.5L18.35 19.35L19.5 16.5Z" fill="#42008A"/>
        </svg>
        <span class="text-[24px] font-semibold text-[#42008A] leading-[29px]">replAI</span>
      </div>

      <p class="text-[16px] font-normal text-[#000000] leading-[19px] text-center mt-[11px] mb-[30px] w-full">
        Создайте свой аккаунт
      </p>

      <form @submit.prevent="handleRegister" class="flex flex-col w-full max-w-[453px]">
        <div class="flex flex-col mb-[16px]">
          <label class="text-[16px] font-normal text-[#000000] leading-[19px] mb-[9px]">Название компании</label>
          <input
              v-model="companyName"
              type="text"
              placeholder="Acme Ink."
              class="w-full h-[54px] bg-[rgba(173,173,173,0.2)] rounded-[10px] px-4 text-[16px] font-normal outline-none focus:border focus:border-[#42008A] transition-colors placeholder:text-[rgba(66,71,84,0.5)] text-[#000000]"
          />
        </div>

        <div class="flex flex-col mb-[16px]">
          <label class="text-[16px] font-normal text-[#000000] leading-[19px] mb-[9px]">Email</label>
          <input
              v-model="email"
              type="email"
              placeholder="Введите email"
              class="w-full h-[54px] bg-[rgba(173,173,173,0.2)] rounded-[10px] px-4 text-[16px] font-normal outline-none focus:border focus:border-[#42008A] transition-colors placeholder:text-[rgba(66,71,84,0.5)] text-[#000000]"
          />
        </div>

        <div class="flex flex-col relative mb-[16px]">
          <label class="text-[16px] font-normal text-[#000000] leading-[19px] mb-[9px]">Пароль</label>
          <div class="relative w-full">
            <input
                v-model="password"
                :type="isPasswordVisible ? 'text' : 'password'"
                placeholder="Создайте пароль"
                class="w-full h-[54px] bg-[rgba(173,173,173,0.2)] rounded-[10px] px-4 pr-12 text-[16px] font-normal outline-none focus:border focus:border-[#42008A] transition-colors placeholder:text-[rgba(66,71,84,0.5)] text-[#000000]"
            />
            <button
                type="button"
                @click="isPasswordVisible = !isPasswordVisible"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#42008A] transition-colors flex items-center justify-center h-full"
            >
              <svg v-if="!isPasswordVisible" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            </button>
          </div>
        </div>

        <div class="flex flex-col relative mb-[14px]">
          <label class="text-[16px] font-normal text-[#000000] leading-[19px] mb-[9px]">Подтвердите пароль</label>
          <div class="relative w-full">
            <input
                v-model="confirmPassword"
                :type="isConfirmPasswordVisible ? 'text' : 'password'"
                placeholder="Повторите пароль"
                class="w-full h-[54px] bg-[rgba(173,173,173,0.2)] rounded-[10px] px-4 pr-12 text-[16px] font-normal outline-none focus:border focus:border-[#42008A] transition-colors placeholder:text-[rgba(66,71,84,0.5)] text-[#000000]"
            />
            <button
                type="button"
                @click="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#42008A] transition-colors flex items-center justify-center h-full"
            >
              <svg v-if="!isConfirmPasswordVisible" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            </button>
          </div>
        </div>

        <p v-if="errorMessage" class="mb-[16px] text-[14px] text-[#b91c1c]">
          {{ errorMessage }}
        </p>

        <button
            type="submit"
            :disabled="isLoading"
            class="w-full h-[54px] bg-[#42008A] text-[#FFFFFF] rounded-[10px] text-[16px] font-medium leading-[19px] hover:bg-[#5a1a9f] transition-colors disabled:opacity-70 flex items-center justify-center"
        >
          {{ isLoading ? 'Загрузка...' : 'Создать аккаунт' }}
        </button>

        <div class="flex justify-center gap-1 mt-[25px]">
          <span class="text-[16px] font-normal text-[#000000] leading-[19px]">Уже есть аккаунт?</span>
          <RouterLink to="/login" class="text-[16px] font-normal text-[#42008A] leading-[19px] hover:underline">Войти</RouterLink>
        </div>
      </form>

    </div>
  </AuthLayout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi } from '@/api/auth'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) return

  try {
    isLoading.value = true
    const response = await authApi.login({
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', response.token)
    router.push('/dashboard')
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AuthLayout>
    <div class="bg-white rounded-[32px] p-10 w-full max-w-[480px] shadow-sm">
      <div class="flex flex-col items-center mb-10">
        <div class="flex items-center gap-2 mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#31007E"/>
            <path d="M19.5 16.5L20.65 19.35L23.5 20.5L20.65 21.65L19.5 24.5L18.35 21.65L15.5 20.5L18.35 19.35L19.5 16.5Z" fill="#31007E"/>
          </svg>
          <span class="text-[24px] font-bold text-[#31007E] tracking-wide">REPLAI</span>
        </div>
        <p class="text-[#111111] text-[15px]">Введите ваши данные для входа в аккаунт</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-6">
        <div class="flex flex-col gap-2.5">
          <label class="text-[14px] font-medium text-[#111111]">Email Adress</label>
          <input
              v-model="email"
              type="email"
              placeholder="Введите email"
              class="w-full bg-[#F4F4F4] rounded-xl px-4 py-3.5 text-[15px] outline-none border border-transparent focus:border-[#31007E] transition-colors placeholder:text-[#A19DAA]"
          />
        </div>

        <div class="flex flex-col gap-2.5">
          <label class="text-[14px] font-medium text-[#111111]">Password</label>
          <div class="relative">
            <input
                v-model="password"
                :type="isPasswordVisible ? 'text' : 'password'"
                placeholder="Введите пароль"
                class="w-full bg-[#F4F4F4] rounded-xl px-4 py-3.5 text-[15px] outline-none border border-transparent focus:border-[#31007E] transition-colors pr-12 placeholder:text-[#A19DAA]"
            />
            <button
                type="button"
                @click="isPasswordVisible = !isPasswordVisible"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-[#A19DAA] hover:text-[#31007E] transition-colors"
            >
              <svg v-if="!isPasswordVisible" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            </button>
          </div>
          <div class="flex justify-end mt-1">
            <a href="#" class="text-[14px] text-[#31007E] hover:underline">Забыли пароль?</a>
          </div>
        </div>

        <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-[#31007E] text-white rounded-xl py-4 text-[15px] font-medium hover:bg-[#4a00bf] transition-colors disabled:opacity-70 mt-2"
        >
          {{ isLoading ? 'Загрузка...' : 'Войти' }}
        </button>

        <div class="text-center mt-2">
          <span class="text-[14px] text-[#111111]">Нет аккаунта? </span>
          <RouterLink to="/register" class="text-[14px] text-[#31007E] hover:underline">Зарегистрироваться</RouterLink>
        </div>
      </form>
    </div>
  </AuthLayout>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="relative w-full min-h-screen bg-[#F8F8FB] overflow-hidden flex flex-col font-['Inter']">
    <!-- Фоновые пятна -->
    <div class="absolute top-[-100px] left-[30%] w-[600px] h-[400px] bg-[#6821ce] opacity-40 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-[-200px] left-[-100px] w-[500px] h-[500px] bg-[#4100a3] opacity-50 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-[-100px] right-[-50px] w-[400px] h-[400px] bg-[#6821ce] opacity-30 blur-[120px] rounded-full pointer-events-none"></div>

    <!-- Шапка -->
    <header class="relative z-10 flex justify-between items-center px-[80px] py-[40px]">
      <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
        <!-- SVG Иконка -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#31007E"/>
          <path d="M19.5 16.5L20.65 19.35L23.5 20.5L20.65 21.65L19.5 24.5L18.35 21.65L15.5 20.5L18.35 19.35L19.5 16.5Z" fill="#31007E"/>
        </svg>
        <span class="text-[20px] font-bold text-[#31007E] tracking-wide">REPLAI</span>
      </div>

      <div class="flex items-center gap-8">
        <button @click="router.push('/login')" class="flex items-center gap-2 bg-transparent border-none text-[15px] font-medium text-[#111111] hover:text-[#31007E] transition-colors">
          Войти
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button @click="router.push('/register')" class="bg-transparent border-none text-[15px] font-medium text-[#111111] hover:text-[#31007E] transition-colors">
          Регистрация
        </button>
      </div>
    </header>

    <!-- Основной контент -->
    <main class="relative z-10 flex gap-[24px] px-[80px] pb-[80px] flex-1">

      <!-- Левый блок с текстом -->
      <section class="flex-[1.2] bg-white rounded-[32px] pl-[79px] pr-[40px] flex flex-col justify-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] py-[80px]">

        <!-- Заголовок точно по Figma (Semi Bold, 48px, 100% line-height, #42008A, 666px ширина) -->
        <h1 class="text-[48px] font-semibold text-[#42008A] leading-[100%] mb-[40px] max-w-[666px]">
          Превратите разговоры<br>в реальный доход
        </h1>

        <!-- Описание точно по Figma (Regular, 20px, 100% line-height, #000000, 545px ширина) -->
        <p class="text-[20px] font-normal text-[#000000] leading-[100%] tracking-[0%] mb-[40px] max-w-[545px] opacity-100">
          AI-ассистент для Telegram и WhatsApp,<br>
          который отвечает клиентам,<br>
          квалифицирует лидов и автоматизирует продажи 24/7.
        </p>

        <button @click="router.push('/register')" class="bg-[#31007E] text-white border-none rounded-2xl px-10 py-5 text-[18px] font-medium w-max hover:bg-[#4a00bf] transition-colors">
          Попробовать бесплатно
        </button>
      </section>

      <!-- Правый блок (заглушки для будущих элементов) -->
      <section class="flex-1 flex gap-[24px]">
        <div class="flex-1 bg-[#D9D9D9] rounded-[24px] min-h-[600px]"></div>
        <div class="flex-1 bg-[#D9D9D9] rounded-[24px] min-h-[600px]"></div>
      </section>
    </main>
  </div>
</template>
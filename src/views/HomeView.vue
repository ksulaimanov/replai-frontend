<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <!-- Десктоп версия (1440px) -->
  <div class="hidden lg:flex lg:justify-center relative w-full h-[819px] bg-white overflow-hidden font-['Inter']">
    <div class="relative w-[1440px] h-[819px]">
    <!-- Ellipse 10 -->
    <div class="absolute w-[953.58px] h-[900.34px] left-[-312px] top-[-282.35px] bg-[#D7D3F6] blur-[50px] pointer-events-none" style="transform: rotate(56.52deg)"></div>

    <!-- Ellipse 11 -->
    <div class="absolute w-[474px] h-[493px] left-[-406px] top-[424px] bg-[#42008A] blur-[75px] pointer-events-none" style="transform: rotate(56.52deg)"></div>

    <!-- Ellipse 8 -->
    <div class="absolute w-[710px] h-[655px] left-[712px] top-[130px] bg-[#D7D3F6] blur-[50px] pointer-events-none" style="transform: rotate(56.52deg)"></div>

    <!-- Ellipse 9 -->
    <div class="absolute w-[474px] h-[493px] left-[1029px] top-[140px] bg-[#42008A] blur-[75px] pointer-events-none" style="transform: rotate(56.52deg)"></div>

    <!-- Ellipse 12 -->
    <div class="absolute w-[474px] h-[493px] left-[320px] top-[-450px] bg-[#42008A] blur-[75px] pointer-events-none" style="transform: rotate(56.52deg)"></div>

    <!-- Шапка -->
    <header class="absolute top-[47px] left-0 right-0 z-10 flex justify-between items-center px-[80px]">
      <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#42008A"/>
          <path d="M19.5 16.5L20.65 19.35L23.5 20.5L20.65 21.65L19.5 24.5L18.35 21.65L15.5 20.5L18.35 19.35L19.5 16.5Z" fill="#42008A"/>
        </svg>
        <span class="text-[24px] font-semibold text-[#42008A]">replAI</span>
      </div>

      <div class="flex items-center gap-8">
        <button @click="router.push('/login')" class="flex items-center gap-2 bg-transparent border-none text-[16px] font-medium text-[#000000] hover:text-[#42008A] transition-colors">
          Войти
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button @click="router.push('/register')" class="bg-transparent border-none text-[16px] font-medium text-[#000000] hover:text-[#42008A] transition-colors">
          Регистрация
        </button>
      </div>
    </header>

    <!-- Основной контент -->
    <div class="relative z-10">
      <!-- Rectangle 14 - Белый блок слева -->
      <section class="absolute w-[618px] h-[555px] left-[50px] top-[177px] bg-white rounded-[30px] flex flex-col justify-center px-[79px]">
        <h1 class="text-[48px] font-semibold text-[#42008A] leading-[58px] mb-[40px] max-w-[666px]">
          Превратите разговоры<br>в реальный доход
        </h1>

        <p class="text-[20px] font-normal text-[#000000] leading-[24px] mb-[40px] max-w-[545px]">
          AI-ассистент для Telegram и WhatsApp,<br>
          который отвечает клиентам,<br>
          квалифицирует лидов и автоматизирует продажи 24/7.
        </p>

        <button @click="router.push('/register')" class="w-[376px] h-[78px] bg-[#42008A] text-white border-none rounded-[20px] text-[20px] font-medium hover:bg-[#5a1a9f] transition-colors flex items-center justify-center">
          Попробовать бесплатно
        </button>
      </section>

      <!-- Rectangle 12 - Серый блок справа сверху -->
      <div class="absolute w-[326px] h-[555px] left-[703px] top-[177px] bg-[#D9D9D9] rounded-[30px]"></div>

      <!-- Rectangle 13 - Серый блок справа внизу -->
      <div class="absolute w-[326px] h-[555px] left-[1064px] top-[177px] bg-[#D9D9D9] rounded-[30px]"></div>
    </div>
    </div>
  </div>

  <!-- Мобильная и планшетная версия -->
  <div class="lg:hidden relative w-full min-h-screen bg-white overflow-x-hidden font-['Inter']">
    <!-- Эллипсы для мобильной версии (масштабированные) -->
    <div class="absolute w-[600px] h-[500px] left-[-200px] top-[-150px] bg-[#D7D3F6] blur-[40px] pointer-events-none" style="transform: rotate(56.52deg)"></div>
    <div class="absolute w-[300px] h-[300px] left-[-250px] top-[250px] bg-[#42008A] blur-[50px] pointer-events-none" style="transform: rotate(56.52deg)"></div>
    <div class="absolute w-[400px] h-[400px] right-[-100px] top-[100px] bg-[#D7D3F6] blur-[40px] pointer-events-none" style="transform: rotate(56.52deg)"></div>
    <div class="absolute w-[300px] h-[300px] right-[-50px] top-[-100px] bg-[#42008A] blur-[50px] pointer-events-none" style="transform: rotate(56.52deg)"></div>

    <!-- Шапка мобильная -->
    <header class="relative z-10 flex justify-between items-center px-4 md:px-8 py-4 md:py-6">
      <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
        <svg width="20" height="20" md:width="24" md:height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#42008A"/>
          <path d="M19.5 16.5L20.65 19.35L23.5 20.5L20.65 21.65L19.5 24.5L18.35 21.65L15.5 20.5L18.35 19.35L19.5 16.5Z" fill="#42008A"/>
        </svg>
        <span class="text-lg md:text-2xl font-semibold text-[#42008A]">replAI</span>
      </div>

      <div class="flex items-center gap-4 md:gap-8">
        <button @click="router.push('/login')" class="hidden sm:flex items-center gap-2 bg-transparent border-none text-sm md:text-base font-medium text-[#000000] hover:text-[#42008A] transition-colors">
          Войти
          <svg width="16" height="16" md:width="20" md:height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button @click="router.push('/login')" class="sm:hidden bg-transparent border-none">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="#42008A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 17L15 12L10 7" stroke="#42008A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12H3" stroke="#42008A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button @click="router.push('/register')" class="hidden sm:block bg-transparent border-none text-sm md:text-base font-medium text-[#000000] hover:text-[#42008A] transition-colors">
          Регистрация
        </button>
      </div>
    </header>

    <!-- Основной контент мобильный -->
    <main class="relative z-10 flex flex-col gap-6 md:gap-8 px-4 md:px-8 py-8 md:py-12 pb-12 md:pb-16">
      <!-- Белый блок с текстом -->
      <section class="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-center">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#42008A] leading-tight mb-4 md:mb-6">
          Превратите разговоры в реальный доход
        </h1>

        <p class="text-sm sm:text-base md:text-lg font-normal text-[#000000] leading-relaxed mb-6 md:mb-8">
          AI-ассистент для Telegram и WhatsApp, который отвечает клиентам, квалифицирует лидов и автоматизирует продажи 24/7.
        </p>

        <button @click="router.push('/register')" class="w-full sm:w-auto bg-[#42008A] text-white border-none rounded-xl md:rounded-2xl py-3 md:py-4 px-6 md:px-8 text-base md:text-lg font-medium hover:bg-[#5a1a9f] transition-colors">
          Попробовать бесплатно
        </button>
      </section>

      <!-- Серые блоки для изображений -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div class="bg-[#D9D9D9] rounded-2xl md:rounded-3xl h-48 sm:h-56 md:h-64"></div>
        <div class="bg-[#D9D9D9] rounded-2xl md:rounded-3xl h-48 sm:h-56 md:h-64"></div>
      </div>
    </main>
  </div>
</template>
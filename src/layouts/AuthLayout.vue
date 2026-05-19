<script setup lang="ts"></script>

<template>
  <!-- Главный контейнер: высота 100vh, отступы по краям (p-4), расстояние между блоками (gap-4) -->
  <div class="min-h-screen lg:h-screen w-full bg-white flex flex-col lg:flex-row p-4 gap-4 font-['Inter']">

    <!-- Левый блок (Тёмный фон) -->
    <!-- Занимает половину ширины (lg:w-1/2) и всю доступную высоту (lg:h-full) -->
    <div class="relative w-full lg:w-1/2 min-h-[400px] lg:min-h-0 lg:h-full bg-[#020005] rounded-[15px] overflow-hidden flex flex-col justify-center p-8 sm:p-12 lg:pl-[54px]">
      <!-- Эллипсы -->
      <div class="absolute w-[300px] h-[300px] lg:w-[179px] lg:h-[337px] left-[-50px] top-[-50px] lg:left-[485px] lg:top-[10px] bg-[#42008A] blur-[50px] opacity-80 pointer-events-none"></div>
      <div class="absolute w-[300px] h-[300px] lg:w-[531px] lg:h-[307.5px] left-[50%] bottom-[-50px] lg:left-[183px] lg:top-[806.5px] bg-[#42008A] blur-[50px] -translate-x-1/2 lg:translate-x-0 opacity-80 pointer-events-none"></div>
      <div class="absolute hidden lg:block w-[542px] h-[461px] left-[122px] top-[336px] bg-[#42008A] blur-[50px] pointer-events-none"></div>

      <!-- Текст -->
      <div class="relative z-10 w-full max-w-[666px]">
        <h1 class="text-white text-[28px] sm:text-[32px] lg:text-[36px] font-normal leading-[1.2] lg:leading-[44px] mb-[24px]">
          Запустите AI-продажи<br>за несколько минут
        </h1>
        <p class="text-[rgba(255,255,255,0.8)] text-[14px] sm:text-[16px] font-normal leading-[1.5] lg:leading-[19px]">
          Подключите Telegram и WhatsApp,<br>
          настройте AI и автоматизируйте<br>
          общение с клиентами.
        </p>
      </div>
    </div>

    <!-- Правый блок (Светлый фон с формой) -->
    <div class="relative w-full lg:w-1/2 min-h-[500px] lg:min-h-0 lg:h-full bg-[#D7D3F6] rounded-[15px] overflow-hidden flex items-center justify-center p-4 sm:p-8 lg:p-0">
      <!-- Эллипсы светлого фона -->
      <div class="hidden lg:block absolute w-[208px] h-[195px] right-[10%] top-[5%] bg-[#D9D9D9] blur-[75px] pointer-events-none"></div>
      <div class="hidden lg:block absolute w-[208px] h-[195px] right-[10%] bottom-[10%] bg-[#D9D9D9] blur-[75px] pointer-events-none"></div>
      <div class="hidden lg:block absolute w-[208px] h-[195px] left-[5%] top-[25%] bg-[#D9D9D9] blur-[75px] pointer-events-none"></div>
      <div class="hidden lg:block absolute w-[208px] h-[195px] left-[5%] bottom-[10%] bg-[#D9D9D9] blur-[75px] pointer-events-none"></div>
      <div class="lg:hidden absolute w-[300px] h-[300px] bg-[#D9D9D9] blur-[75px] pointer-events-none"></div>

      <!-- Контейнер для формы (LoginView/RegisterView) -->
      <div class="relative z-10 w-full max-w-[558px]">
        <slot />
      </div>
    </div>

  </div>
</template>
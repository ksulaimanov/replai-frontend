<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen w-full">
    <div class="hidden lg:flex flex-col justify-center w-1/2 bg-[#090014] relative overflow-hidden px-16 xl:px-24">
      <div class="absolute top-[30%] left-[20%] w-[700px] h-[700px] bg-[#4a00bf] rounded-full mix-blend-screen filter blur-[150px] opacity-40"></div>

      <div class="relative z-10 max-w-xl">
        <h1 class="text-white text-[44px] font-medium leading-[1.2] mb-6 tracking-wide">
          Запустите AI-продажи<br />за несколько минут
        </h1>
        <p class="text-[#A19DAA] text-[18px] leading-[1.5]">
          Подключите Telegram и WhatsApp,<br />
          настройте AI и автоматизируйте<br />
          общение с клиентами.
        </p>
      </div>
    </div>

    <div class="w-full lg:w-1/2 bg-[#E1DEEF] flex items-center justify-center p-8">
      <slot />
    </div>
  </div>
</template>
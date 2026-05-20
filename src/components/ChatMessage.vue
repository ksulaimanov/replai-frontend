<template>
  <div class="flex gap-3" :class="message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'">
    <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full" :class="message.sender === 'bot' ? 'bg-[#D7D3F6]' : 'bg-[#E5E7EB]'">
      <template v-if="message.sender === 'bot'">
        <!-- Robot icon -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
          <path d="M12 2C11.45 2 11 2.45 11 3V4H9C7.9 4 7 4.9 7 6V10C7 11.1 6.1 12 5 12H4C3.45 12 3 12.45 3 13V15C3 15.55 3.45 16 4 16H5V18C5 19.1 5.9 20 7 20H17C18.1 20 19 19.1 19 18V16H20C20.55 16 21 15.55 21 15V13C21 12.45 20.55 12 20 12H19C17.9 12 17 11.1 17 10V6C17 4.9 16.1 4 15 4H13V3C13 2.45 12.55 2 12 2Z" fill="#42008A"/>
          <circle cx="9" cy="10" r="1.5" fill="white"/>
          <circle cx="15" cy="10" r="1.5" fill="white"/>
          <path d="M12 15C11.45 15 11 15.45 11 16C11 16.55 11.45 17 12 17C12.55 17 13 16.55 13 16C13 15.45 12.55 15 12 15Z" fill="white"/>
        </svg>
      </template>
      <template v-else>
        <!-- User icon placeholder -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
          <circle cx="12" cy="8" r="4" stroke="#424754" stroke-width="2"/>
          <path d="M4 20C4 16.134 7.582 13 12 13C16.418 13 20 16.134 20 20" stroke="#424754" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </template>
    </div>

    <div class="flex-1 max-w-xs lg:max-w-md" :class="message.sender === 'user' ? 'text-right' : 'text-left'">
      <div
        class="inline-block rounded-[12px] px-4 py-2 break-words whitespace-pre-wrap"
        :class="message.sender === 'bot'
          ? 'bg-[#42008A] text-white rounded-tr-[0px]'
          : 'bg-[#E5E7EB] text-[#111827] rounded-tl-[0px]'"
      >
        <span class="text-[14px] leading-[20px]">{{ message.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/stores/chat'

interface Props {
  message: ChatMessage
}

defineProps<Props>()
</script>

<style scoped></style>


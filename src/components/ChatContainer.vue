<template>
  <div class="h-full flex flex-col rounded-[15px] bg-white border border-[rgba(66,0,138,0.1)]">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-[rgba(66,0,138,0.1)]">
      <h2 class="text-[18px] font-semibold text-[#42008A]">Чат с ботом</h2>
      <button
        @click="clearChat"
        :disabled="messages.length === 0 || isClearing"
        class="text-[12px] font-medium px-3 py-1 rounded-[8px] transition-colors"
        :class="messages.length > 0 && !isClearing
          ? 'bg-[rgba(66,0,138,0.1)] text-[#42008A] hover:bg-[rgba(66,0,138,0.2)]'
          : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'"
      >
        {{ isClearing ? 'Очистка...' : 'Очистить чат' }}
      </button>
    </div>

    <!-- Messages Area -->
    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
      <div v-if="messages.length === 0" class="flex items-center justify-center h-full text-center">
        <div class="flex flex-col items-center gap-3">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-30">
            <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
          </svg>
          <p class="text-[14px] text-[#9CA3AF]">Чат пуст. Начните диалог с ботом!</p>
        </div>
      </div>

      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />

      <div v-if="isLoading" class="flex justify-start">
        <div class="flex gap-2 items-center px-4 py-3">
          <div class="w-2 h-2 bg-[#42008A] rounded-full animate-bounce" style="animation-delay: 0s"></div>
          <div class="w-2 h-2 bg-[#42008A] rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="w-2 h-2 bg-[#42008A] rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 border-t border-[rgba(66,0,138,0.1)]">
      <ChatInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { computed, ref, watch, nextTick } from 'vue'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'

const chatStore = useChatStore()
const messagesContainer = ref<HTMLDivElement | null>(null)
const isClearing = ref(false)

const messages = computed(() => chatStore.messages)
const isLoading = computed(() => chatStore.isLoading)

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

watch(() => chatStore.messages.length, () => {
  scrollToBottom()
})

const clearChat = async () => {
  if (messages.value.length === 0) return

  isClearing.value = true
  try {
    chatStore.clearMessages()
  } finally {
    isClearing.value = false
  }
}

// Scroll to bottom on mount
watch(() => messagesContainer.value, () => {
  if (messagesContainer.value) {
    scrollToBottom()
  }
})
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite;
}
</style>


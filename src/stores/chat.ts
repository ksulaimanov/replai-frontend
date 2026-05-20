import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useBotStore } from './bot'
import * as chatApi from '@/api/chat'

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: number
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const botStore = useBotStore()

  const canAccessChat = computed(() => {
    return botStore.botConfig.name.trim().length > 0 && botStore.botConfig.prompt.trim().length > 0
  })

  const sendMessage = async (text: string) => {
    if (!canAccessChat.value) {
      error.value = 'Пожалуйста, сначала заполните форму в разделе Автоматизация'
      return
    }

    if (!text.trim()) {
      return
    }

    // Add user message
    const userMessageId = `user-${Date.now()}`
    messages.value.push({
      id: userMessageId,
      text: text.trim(),
      sender: 'user',
      timestamp: Date.now()
    })

    error.value = null
    isLoading.value = true

    try {
      const response = await chatApi.sendMessage(text)

      // Add bot response
      const botMessageId = `bot-${Date.now()}`
      messages.value.push({
        id: botMessageId,
        text: response.response,
        sender: 'bot',
        timestamp: Date.now()
      })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Не удалось получить ответ от бота'
      console.error('Failed to send message:', err)
    } finally {
      isLoading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
    error.value = null
  }

  return {
    messages,
    isLoading,
    error,
    canAccessChat,
    sendMessage,
    clearMessages
  }
})


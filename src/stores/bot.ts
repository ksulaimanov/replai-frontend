import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { botApi, type BotConfig } from '@/api/bot'

export const useBotStore = defineStore('bot', () => {
  const botConfig = reactive<BotConfig>({
    name: '',
    prompt: ''
  })

  const files = ref<any[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadBotConfig = async () => {
    isLoading.value = true
    error.value = null
    try {
      const config = await botApi.getBotConfig()
      if (config) {
        botConfig.name = config.name
        botConfig.prompt = config.prompt
        if (config.id) {
          botConfig.id = config.id
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load bot config'
      console.error('Failed to load bot config:', err)
    } finally {
      isLoading.value = false
    }
  }

  const loadFiles = async () => {
    isLoading.value = true
    error.value = null
    try {
      files.value = await botApi.getFiles()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load files'
      console.error('Failed to load files:', err)
    } finally {
      isLoading.value = false
    }
  }

  const updateBotConfig = async (config: BotConfig) => {
    isLoading.value = true
    error.value = null
    try {
      const updatedConfig = await botApi.updateBotConfig(config)
      botConfig.name = updatedConfig.name
      botConfig.prompt = updatedConfig.prompt
      if (updatedConfig.id) {
        botConfig.id = updatedConfig.id
      }
      return updatedConfig
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update bot config'
      console.error('Failed to update bot config:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    botConfig,
    files,
    isLoading,
    error,
    loadBotConfig,
    loadFiles,
    updateBotConfig
  }
})


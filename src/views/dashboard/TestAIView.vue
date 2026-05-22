<script setup lang="ts">
import { ref, nextTick } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { http } from '@/api/http'

interface Message {
  role: 'user' | 'bot'
  text: string
  time: string
}

const messages = ref<Message[]>([])
const input = ref('')
const loading = ref(false)
const chatBox = ref<HTMLElement | null>(null)

function now(): string {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

async function scrollBottom() {
  await nextTick()
  if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight
}

async function send() {
  const text = input.value.trim()
  if (!text || loading.value) return

  input.value = ''
  messages.value.push({ role: 'user', text, time: now() })
  await scrollBottom()

  loading.value = true
  try {
    const res = await http.post<{ reply: string }>('/api/test-chat', { message: text })
    const parts = (res.data.reply || '').split('|||').map((s: string) => s.trim()).filter(Boolean)
    for (const part of parts) {
      messages.value.push({ role: 'bot', text: part, time: now() })
    }
  } catch (e: any) {
    const detail = e?.response?.data?.message || 'Ошибка соединения с ИИ'
    messages.value.push({ role: 'bot', text: `⚠️ ${detail}`, time: now() })
  } finally {
    loading.value = false
    await scrollBottom()
  }
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6 mt-4 lg:mt-[40px]">
      <div>
        <h1 class="text-[32px] font-semibold text-[#42008A] leading-tight">Тест AI</h1>
        <p class="mt-1 text-[14px] text-[#424754]">Смоделируйте диалог с вашим ботом прямо в браузере.</p>
      </div>

      <div class="bg-[#F4EFFF] rounded-[15px] flex flex-col overflow-hidden" style="height: calc(100vh - 220px); min-height: 480px;">

        <!-- Шапка -->
        <div class="flex items-center gap-3 px-6 py-4 border-b border-[rgba(66,0,138,0.12)]">
          <div class="w-9 h-9 rounded-full bg-[#42008A] flex items-center justify-center text-white font-bold text-[14px] shrink-0">Б</div>
          <div>
            <div class="font-semibold text-[#42008A] text-[15px] leading-tight">бот</div>
            <div class="text-[11px] text-[#127336] font-medium flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-[#127336] inline-block"></span> Онлайн
            </div>
          </div>
        </div>

        <!-- Сообщения -->
        <div ref="chatBox" class="relative flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3 scroll-smooth">
          <div
            v-if="messages.length === 0"
            class="absolute inset-0 flex items-center justify-center text-[18px] font-medium text-[#42008A] opacity-35 pointer-events-none select-none"
          >
            Начните чат
          </div>
          <div v-for="(msg, i) in messages" :key="i"
               :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
            <div :class="[
              'max-w-[72%] px-4 py-2.5 rounded-[14px] text-[14px] leading-[1.5] break-words',
              msg.role === 'user'
                ? 'bg-[#42008A] text-white rounded-br-[4px]'
                : 'bg-white text-[#191B23] shadow-sm rounded-bl-[4px]'
            ]">
              {{ msg.text }}
              <div :class="['text-[10px] mt-1', msg.role === 'user' ? 'text-[rgba(255,255,255,0.6)] text-right' : 'text-[#9CA3AF]']">
                {{ msg.time }}
              </div>
            </div>
          </div>

          <!-- Индикатор набора -->
          <div v-if="loading" class="flex justify-start">
            <div class="bg-white shadow-sm rounded-[14px] rounded-bl-[4px] px-4 py-3 flex gap-1 items-center">
              <span v-for="n in 3" :key="n" class="w-2 h-2 rounded-full bg-[#42008A] opacity-60 animate-bounce"
                    :style="{ animationDelay: `${(n - 1) * 0.15}s` }"></span>
            </div>
          </div>
        </div>

        <!-- Поле ввода -->
        <div class="px-6 py-4 border-t border-[rgba(66,0,138,0.12)] flex gap-3 items-end bg-white/60">
          <textarea
            v-model="input"
            @keydown="handleKey"
            :disabled="loading"
            rows="1"
            placeholder="Напишите сообщение… (Enter — отправить)"
            class="flex-1 resize-none border border-[rgba(66,0,138,0.4)] rounded-[10px] px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#42008A] bg-transparent leading-[1.5] max-h-[120px] overflow-y-auto"
          ></textarea>
          <button
            @click="send"
            :disabled="!input.trim() || loading"
            class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
            :class="input.trim() && !loading ? 'bg-[#42008A] text-white hover:bg-opacity-85' : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.animate-bounce { animation: bounce 0.8s infinite ease-in-out; }
</style>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { getLeads, getChatMessages, type Lead, type MessageResponse } from '@/api/bot'
import { useToast } from '@/composables/useToast'

const { success, error } = useToast()

const leads = ref<Lead[]>([])
const loading = ref(true)
const search = ref('')

const selectedLead = ref<Lead | null>(null)
const messages = ref<MessageResponse[]>([])
const messagesLoading = ref(false)

onMounted(async () => {
  try {
    leads.value = await getLeads()
  } catch {
    error('Не удалось загрузить лиды. Проверьте подключение к сети.')
  } finally {
    loading.value = false
  }
})

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim()
  if (!q) return leads.value
  return leads.value.filter(l =>
    (l.name ?? '').toLowerCase().includes(q) ||
    (l.phone ?? '').includes(q) ||
    l.externalChatId.includes(q) ||
    (l.leadSummary ?? '').toLowerCase().includes(q)
  )
})

async function openChat(lead: Lead) {
  selectedLead.value = lead
  messages.value = []
  if (!lead.chatId) return
  messagesLoading.value = true
  try {
    messages.value = await getChatMessages(lead.chatId)
  } catch {
    error('Не удалось загрузить историю переписки.')
  } finally {
    messagesLoading.value = false
  }
}

function closeChat() {
  selectedLead.value = null
  messages.value = []
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('ru-RU', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  } catch {
    return iso
  }
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

function exportCsv() {
  const filename = `leads-${new Date().toISOString().slice(0, 10)}.csv`
  const header = ['#', 'Имя', 'Телефон', 'Статус', 'Детали', 'Дата']
  const rows = filtered.value.map((l, i) => [
    i + 1,
    l.name ?? '—',
    l.phone ?? '—',
    l.status === 'HOT_LEAD' ? 'Горячий лид' : 'Активный',
    l.leadSummary ?? '—',
    formatDate(l.createdAt)
  ])
  const csv = [header, ...rows]
    .map(r => r.map(String).map(v => `"${v.replace(/"/g, '""')}"`).join(','))
    .join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
  success(`Файл экспортирован: ${filename}`)
}
</script>

<template>
  <DashboardLayout>
    <div class="flex flex-col gap-6 mt-4 lg:mt-[40px]">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-[32px] font-semibold text-[#42008A] leading-tight">Лиды</h1>
          <p class="mt-1 text-[14px] text-[#424754]">Контакты, автоматически собранные ботом из переписки.</p>
        </div>
        <button
          @click="exportCsv"
          :disabled="!filtered.length"
          class="flex items-center gap-2 px-5 py-2.5 rounded-[10px] font-semibold text-[14px] transition-colors shrink-0"
          :class="filtered.length ? 'bg-[#42008A] text-white hover:bg-opacity-90' : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Экспорт CSV
        </button>
      </div>

      <!-- Search -->
      <div v-if="!loading && leads.length" class="relative max-w-[400px]">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <input
          v-model="search"
          type="text"
          placeholder="Поиск по имени, телефону, статусу…"
          class="w-full pl-9 pr-4 py-2.5 border border-[rgba(66,0,138,0.3)] rounded-[10px] text-[14px] focus:outline-none focus:border-[#42008A] bg-white"
        />
      </div>

      <!-- Table card -->
      <div class="bg-[#F4EFFF] rounded-[15px] overflow-hidden">

        <!-- SKELETON -->
        <div v-if="loading" class="p-2">
          <div class="bg-[rgba(189,165,213,0.5)] rounded-t-[10px] px-6 py-4 flex gap-4">
            <div class="h-3 w-6 bg-[rgba(66,0,138,0.15)] rounded animate-pulse"></div>
            <div class="h-3 w-28 bg-[rgba(66,0,138,0.15)] rounded animate-pulse"></div>
            <div class="h-3 w-24 bg-[rgba(66,0,138,0.15)] rounded animate-pulse ml-8"></div>
            <div class="h-3 w-16 bg-[rgba(66,0,138,0.15)] rounded animate-pulse ml-auto"></div>
          </div>
          <div class="divide-y divide-[rgba(202,185,224,0.4)]">
            <div v-for="i in 5" :key="i" class="flex items-center gap-4 px-6 py-4 bg-[rgba(238,233,250,0.4)]">
              <div class="w-5 h-3 bg-[rgba(66,0,138,0.08)] rounded animate-pulse"></div>
              <div class="flex items-center gap-2 flex-1">
                <div class="w-8 h-8 rounded-full bg-[rgba(66,0,138,0.12)] animate-pulse shrink-0"></div>
                <div class="h-3 rounded animate-pulse bg-[rgba(66,0,138,0.1)]" :style="{ width: (50 + i * 18) + 'px' }"></div>
              </div>
              <div class="h-6 w-28 rounded-[8px] bg-[rgba(66,0,138,0.08)] animate-pulse"></div>
              <div class="h-3 w-16 rounded animate-pulse bg-[rgba(66,0,138,0.08)]"></div>
              <div class="h-3 w-24 rounded animate-pulse bg-[rgba(66,0,138,0.08)]"></div>
            </div>
          </div>
        </div>

        <!-- EMPTY STATE -->
        <div v-else-if="!leads.length" class="flex flex-col items-center justify-center py-16 px-6 text-center">
          <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-6">
            <ellipse cx="60" cy="88" rx="44" ry="8" fill="rgba(66,0,138,0.06)"/>
            <rect x="30" y="28" width="60" height="52" rx="14" fill="#D7D3F6"/>
            <rect x="30" y="28" width="60" height="52" rx="14" stroke="#9A7CC2" stroke-width="1.5"/>
            <circle cx="46" cy="50" r="5" fill="#42008A" opacity="0.8"/>
            <circle cx="74" cy="50" r="5" fill="#42008A" opacity="0.8"/>
            <circle cx="47.5" cy="48.5" r="1.5" fill="white"/>
            <circle cx="75.5" cy="48.5" r="1.5" fill="white"/>
            <path d="M50 60 Q60 68 70 60" stroke="#42008A" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>
            <line x1="60" y1="28" x2="60" y2="16" stroke="#9A7CC2" stroke-width="2" stroke-linecap="round"/>
            <circle cx="60" cy="13" r="4" fill="#42008A"/>
            <rect x="14" y="40" width="16" height="8" rx="4" fill="#D7D3F6" stroke="#9A7CC2" stroke-width="1.5"/>
            <rect x="90" y="40" width="16" height="8" rx="4" fill="#D7D3F6" stroke="#9A7CC2" stroke-width="1.5"/>
          </svg>
          <h3 class="text-[18px] font-semibold text-[#42008A] mb-2">Ваш бот Алина уже наготове!</h3>
          <p class="text-[14px] text-[#6B7280] leading-[1.6] max-w-[360px] mb-6">
            Как только клиент напишет свой телефон в Telegram, контакт мгновенно появится здесь.
          </p>
          <RouterLink to="/test-ai">
            <button class="flex items-center gap-2 bg-[#42008A] text-white px-6 py-2.5 rounded-[10px] font-semibold text-[14px] hover:bg-opacity-90 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Протестировать бота
            </button>
          </RouterLink>
        </div>

        <!-- SEARCH EMPTY -->
        <div v-else-if="!filtered.length" class="flex flex-col items-center justify-center py-12 gap-2">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" class="text-[#C4B5FD]"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <p class="text-[15px] font-medium text-[#6B7280]">Ничего не найдено</p>
          <p class="text-[13px] text-[#9CA3AF]">Попробуйте изменить поисковый запрос</p>
        </div>

        <!-- DATA TABLE -->
        <div v-else class="overflow-x-auto">
          <table class="w-full min-w-[700px]">
            <thead>
              <tr class="bg-[rgba(189,165,213,0.7)] text-[14px] font-semibold text-[#191B23]">
                <th class="px-6 py-4 text-left w-10">#</th>
                <th class="px-4 py-4 text-left">Имя</th>
                <th class="px-4 py-4 text-left">Телефон</th>
                <th class="px-4 py-4 text-left">Статус</th>
                <th class="px-4 py-4 text-left">Детали</th>
                <th class="px-4 py-4 text-left">Дата</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[rgba(202,185,224,0.4)]">
              <tr
                v-for="(lead, idx) in filtered"
                :key="lead.id"
                @click="openChat(lead)"
                class="bg-[rgba(238,233,250,0.5)] hover:bg-[rgba(209,196,240,0.4)] transition-colors cursor-pointer"
              >
                <td class="px-6 py-4 text-[13px] text-[#9CA3AF]">{{ idx + 1 }}</td>

                <td class="px-4 py-4">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-[#42008A] flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                      {{ (lead.name ?? lead.externalChatId).charAt(0).toUpperCase() }}
                    </div>
                    <span class="text-[14px] font-medium text-[#191B23]">{{ lead.name ?? '—' }}</span>
                  </div>
                </td>

                <td class="px-4 py-4">
                  <span v-if="lead.phone" class="inline-flex items-center gap-1.5 bg-white border border-[rgba(66,0,138,0.2)] rounded-[8px] px-3 py-1 text-[13px] font-medium text-[#42008A]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.61 3.41 2 2 0 013.61 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.09a16 16 0 006 6l.96-.96a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    {{ lead.phone }}
                  </span>
                  <span v-else class="text-[13px] text-[#9CA3AF]">—</span>
                </td>

                <td class="px-4 py-4">
                  <span
                    v-if="lead.status === 'HOT_LEAD'"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-red-100 text-red-700"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Горячий
                  </span>
                  <span v-else class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-[rgba(66,0,138,0.08)] text-[#42008A]">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#42008A] opacity-60"></span>
                    Активный
                  </span>
                </td>

                <td class="px-4 py-4 max-w-[220px]">
                  <span v-if="lead.leadSummary" class="text-[13px] text-[#6B7280] line-clamp-2">{{ lead.leadSummary }}</span>
                  <span v-else class="text-[13px] text-[#9CA3AF]">—</span>
                </td>

                <td class="px-4 py-4 text-[13px] text-[#6B7280] whitespace-nowrap">{{ formatDate(lead.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer count -->
        <div v-if="!loading && filtered.length" class="px-6 py-3 text-[13px] text-[#9CA3AF] border-t border-[rgba(202,185,224,0.4)] bg-[rgba(238,233,250,0.5)]">
          Показано {{ filtered.length }} из {{ leads.length }} {{ leads.length === 1 ? 'лида' : 'лидов' }}
        </div>
      </div>
    </div>

    <!-- Chat History Panel -->
    <Teleport to="body">
      <div v-if="selectedLead" class="fixed inset-0 z-50 flex" @keydown.esc="closeChat">

        <!-- Backdrop -->
        <div class="flex-1 bg-black/40 backdrop-blur-sm" @click="closeChat"></div>

        <!-- Drawer -->
        <div class="w-full max-w-[420px] bg-white flex flex-col shadow-2xl">

          <!-- Header -->
          <div class="px-5 py-4 border-b border-gray-100 flex items-center gap-3 bg-[#F4EFFF]">
            <button
              @click="closeChat"
              class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(66,0,138,0.1)] transition-colors shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#42008A" stroke-width="2" stroke-linecap="round"/></svg>
            </button>

            <div class="w-9 h-9 rounded-full bg-[#42008A] flex items-center justify-center text-white text-[13px] font-bold shrink-0">
              {{ (selectedLead.name ?? selectedLead.externalChatId).charAt(0).toUpperCase() }}
            </div>

            <div class="flex-1 min-w-0">
              <div class="text-[15px] font-semibold text-[#42008A] truncate">
                {{ selectedLead.name ?? 'Клиент' }}
              </div>
              <div class="text-[12px] text-[#9CA3AF] truncate">
                {{ selectedLead.phone ?? selectedLead.externalChatId }}
              </div>
            </div>

            <span
              v-if="selectedLead.status === 'HOT_LEAD'"
              class="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-100 text-red-700"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              HOT
            </span>
          </div>

          <!-- Lead summary strip -->
          <div v-if="selectedLead.leadSummary" class="px-5 py-2.5 bg-amber-50 border-b border-amber-100">
            <p class="text-[12px] text-amber-700 font-medium">
              <span class="font-semibold">Причина лида:</span> {{ selectedLead.leadSummary }}
            </p>
          </div>

          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-[#FAFAFA]">

            <div v-if="messagesLoading" class="flex flex-col gap-3">
              <div v-for="i in 5" :key="i" class="flex" :class="i % 2 === 0 ? 'justify-end' : 'justify-start'">
                <div class="h-10 rounded-2xl animate-pulse bg-gray-200" :style="{ width: (120 + i * 20) + 'px' }"></div>
              </div>
            </div>

            <div v-else-if="!messages.length" class="flex flex-col items-center justify-center h-full py-12 gap-2">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" class="text-[#C4B5FD]"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <p class="text-[14px] text-[#9CA3AF]">Нет сообщений</p>
            </div>

            <div
              v-else
              v-for="msg in messages"
              :key="msg.id"
              class="flex"
              :class="msg.isFromClient ? 'justify-start' : 'justify-end'"
            >
              <div
                class="max-w-[78%] px-4 py-2.5 rounded-2xl text-[13px] leading-[1.5]"
                :class="msg.isFromClient
                  ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
                  : 'bg-[#42008A] text-white rounded-tr-sm'"
              >
                <p class="whitespace-pre-wrap break-words">{{ msg.content }}</p>
                <p class="text-[10px] mt-1 opacity-50 text-right">{{ formatTime(msg.timestamp) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </DashboardLayout>
</template>

<style scoped>
table { border-collapse: collapse; }
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

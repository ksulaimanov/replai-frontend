<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { getLeads, type Lead } from '@/api/bot'

const leads = ref<Lead[]>([])
const loading = ref(true)
const search = ref('')

onMounted(async () => {
  try {
    leads.value = await getLeads()
  } catch {
    // keep empty
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
    l.externalChatId.includes(q)
  )
})

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

function exportCsv() {
  const header = ['#', 'Имя', 'Телефон', 'Chat ID', 'Дата']
  const rows = filtered.value.map((l, i) => [
    i + 1,
    l.name ?? '—',
    l.phone ?? '—',
    l.externalChatId,
    formatDate(l.createdAt)
  ])
  const csv = [header, ...rows].map(r => r.map(String).map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
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
      <div class="relative max-w-[400px]">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <input
          v-model="search"
          type="text"
          placeholder="Поиск по имени, телефону, chat ID…"
          class="w-full pl-9 pr-4 py-2.5 border border-[rgba(66,0,138,0.3)] rounded-[10px] text-[14px] focus:outline-none focus:border-[#42008A] bg-white"
        />
      </div>

      <!-- Table -->
      <div class="bg-[#F4EFFF] rounded-[15px] overflow-hidden">

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center h-[200px] text-[#9A7CC2] text-[14px]">
          Загрузка лидов…
        </div>

        <!-- Empty -->
        <div v-else-if="!filtered.length" class="flex flex-col items-center justify-center h-[240px] gap-3">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="text-[#C4B5FD]"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <p class="text-[15px] font-medium text-[#6B7280]">
            {{ search ? 'Ничего не найдено' : 'Лидов пока нет' }}
          </p>
          <p class="text-[13px] text-[#9CA3AF] text-center max-w-[280px]">
            {{ search ? 'Попробуйте изменить поисковый запрос' : 'Бот автоматически сохранит контакт, когда клиент пришлёт номер телефона' }}
          </p>
        </div>

        <!-- Data table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full min-w-[640px]">
            <thead>
              <tr class="bg-[rgba(189,165,213,0.7)] text-[14px] font-semibold text-[#191B23]">
                <th class="px-6 py-4 text-left w-12">#</th>
                <th class="px-4 py-4 text-left">Имя</th>
                <th class="px-4 py-4 text-left">Телефон</th>
                <th class="px-4 py-4 text-left">Chat ID</th>
                <th class="px-4 py-4 text-left">Дата</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[rgba(202,185,224,0.4)]">
              <tr
                v-for="(lead, idx) in filtered"
                :key="lead.id"
                class="bg-[rgba(238,233,250,0.5)] hover:bg-[rgba(209,196,240,0.4)] transition-colors"
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
                <td class="px-4 py-4 text-[13px] text-[#6B7280] font-mono">{{ lead.externalChatId }}</td>
                <td class="px-4 py-4 text-[13px] text-[#6B7280] whitespace-nowrap">{{ formatDate(lead.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer count -->
        <div v-if="!loading && filtered.length" class="px-6 py-3 text-[13px] text-[#9CA3AF] border-t border-[rgba(202,185,224,0.4)] bg-[rgba(238,233,250,0.5)]">
          Показано {{ filtered.length }} из {{ leads.length }} лидов
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
table { border-collapse: collapse; }
</style>

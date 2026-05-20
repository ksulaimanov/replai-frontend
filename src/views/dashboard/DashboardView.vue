<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { getAnalytics, type Analytics } from '@/api/bot'
import { useToast } from '@/composables/useToast'

const { error } = useToast()

const analytics = ref<Analytics>({ totalMessages: 0, uniqueChats: 0, leads: 0 })
const loading = ref(true)

onMounted(async () => {
  try {
    analytics.value = await getAnalytics()
  } catch {
    error('Не удалось загрузить аналитику. Проверьте подключение к сети.')
  } finally {
    loading.value = false
  }
})

const maxVal = computed(() =>
  Math.max(analytics.value.totalMessages, analytics.value.uniqueChats, analytics.value.leads, 1)
)

const bars = computed(() => [
  {
    label: 'Сообщений',
    value: analytics.value.totalMessages,
    pct: Math.round((analytics.value.totalMessages / maxVal.value) * 100),
    color: 'from-[#7C3AED] to-[#42008A]',
  },
  {
    label: 'Диалогов',
    value: analytics.value.uniqueChats,
    pct: Math.round((analytics.value.uniqueChats / maxVal.value) * 100),
    color: 'from-[#9A7CC2] to-[#6D28D9]',
  },
  {
    label: 'Лидов',
    value: analytics.value.leads,
    pct: Math.round((analytics.value.leads / maxVal.value) * 100),
    color: 'from-[#A78BFA] to-[#7C3AED]',
  },
])
</script>

<template>
  <DashboardLayout>
    <div>
      <div class="header-row flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div class="text-[18px] font-semibold text-[#424754] leading-[1.2]">Добро пожаловать</div>
          <h1 class="text-[32px] font-semibold text-[#42008A] mt-4 leading-[1.1]">Дашборд</h1>
        </div>

        <div class="header-actions flex items-center gap-4 flex-wrap justify-end">
          <RouterLink to="/test-ai" class="action-btn-link"><button class="action-btn">+ Протестировать AI</button></RouterLink>
          <RouterLink to="/integrations" class="action-btn-link"><button class="action-btn">+ Подключить канал</button></RouterLink>
          <RouterLink to="/automation" class="action-btn-link"><button class="action-btn">+ Новый сценарий</button></RouterLink>
        </div>
      </div>

      <!-- Stat cards -->
      <div class="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="stat-card">
          <div class="stat-title">Всего сообщений</div>
          <div class="stat-value">
            <div v-if="loading" class="animate-pulse mt-7">
              <div class="h-7 w-16 bg-[rgba(0,0,0,0.15)] rounded"></div>
            </div>
            <span v-else>{{ analytics.totalMessages.toLocaleString('ru-RU') }}</span>
          </div>
          <div class="stat-note">Входящие + исходящие</div>
        </div>

        <!-- Card 2 -->
        <div class="stat-card">
          <div class="stat-title">Уникальных диалогов</div>
          <div class="stat-value">
            <div v-if="loading" class="animate-pulse mt-7">
              <div class="h-7 w-12 bg-[rgba(0,0,0,0.15)] rounded"></div>
            </div>
            <span v-else>{{ analytics.uniqueChats.toLocaleString('ru-RU') }}</span>
          </div>
          <div class="stat-note">Активные чаты бота</div>
        </div>

        <!-- Card 3 -->
        <div class="stat-card">
          <div class="stat-title">Собрано лидов</div>
          <div class="stat-value">
            <div v-if="loading" class="animate-pulse mt-7">
              <div class="h-7 w-10 bg-[rgba(0,0,0,0.15)] rounded"></div>
            </div>
            <span v-else>{{ analytics.leads.toLocaleString('ru-RU') }}</span>
          </div>
          <div class="stat-note">
            <RouterLink to="/leads" class="underline underline-offset-2 hover:opacity-80">Смотреть все →</RouterLink>
          </div>
        </div>
      </div>

      <!-- Activity chart (Tailwind CSS bars) -->
      <div class="mt-10 bg-[#F4EFFF] rounded-[15px] p-6">
        <h2 class="text-[18px] font-semibold text-[#42008A] mb-6">Активность бота</h2>

        <!-- Skeleton bars -->
        <div v-if="loading" class="flex flex-col gap-5">
          <div v-for="i in 3" :key="i" class="flex items-center gap-4">
            <div class="w-[100px] shrink-0 h-3 rounded animate-pulse bg-[rgba(66,0,138,0.1)]"></div>
            <div class="flex-1 bg-[rgba(66,0,138,0.08)] rounded-full h-[14px] overflow-hidden">
              <div class="h-full rounded-full bg-[rgba(66,0,138,0.12)] animate-pulse" :style="{ width: (40 + i * 15) + '%' }"></div>
            </div>
            <div class="w-[52px] h-3 rounded animate-pulse bg-[rgba(66,0,138,0.1)]"></div>
          </div>
        </div>

        <!-- Real bars -->
        <div v-else class="flex flex-col gap-5">
          <div v-for="bar in bars" :key="bar.label" class="flex items-center gap-4">
            <div class="w-[100px] shrink-0 text-[13px] font-medium text-[#424754] text-right">{{ bar.label }}</div>
            <div class="flex-1 bg-[rgba(66,0,138,0.08)] rounded-full h-[14px] overflow-hidden">
              <div
                class="h-full rounded-full bg-gradient-to-r transition-all duration-700"
                :class="bar.color"
                :style="{ width: bar.pct + '%' }"
              ></div>
            </div>
            <div class="w-[52px] shrink-0 text-[13px] font-semibold text-[#42008A]">{{ bar.value.toLocaleString('ru-RU') }}</div>
          </div>
        </div>

        <p class="mt-5 text-[12px] text-[#9CA3AF]">Данные обновляются в реальном времени из базы данных</p>
      </div>

      <!-- Quick links -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <RouterLink to="/leads">
          <div class="quick-card group">
            <div class="quick-icon">📋</div>
            <div>
              <div class="quick-title">База лидов</div>
              <div class="quick-sub">Контакты, собранные ботом</div>
            </div>
            <svg class="ml-auto text-[#9A7CC2] group-hover:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </RouterLink>
        <RouterLink to="/test-ai">
          <div class="quick-card group">
            <div class="quick-icon">🤖</div>
            <div>
              <div class="quick-title">Тест AI</div>
              <div class="quick-sub">Диалог с вашим ботом</div>
            </div>
            <svg class="ml-auto text-[#9A7CC2] group-hover:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </RouterLink>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.action-btn-link { display: inline-flex; }
.action-btn { background: #42008A; color: #FFFFFF; border-radius: 10px; padding: 10px 16px; font-weight: 600; white-space: nowrap; }

.stat-card {
  min-height: 189px; border-radius: 15px; padding: 28px 32px;
  background: linear-gradient(119.01deg, #D7D3F6 32.05%, rgba(66, 0, 138, 0.69) 92.25%);
}
.stat-title { font-size: 18px; font-weight: 500; color: #000; }
.stat-value { margin-top: 28px; font-size: 28px; font-weight: 600; color: #000; }
.stat-note { margin-top: 36px; font-size: 16px; font-weight: 600; color: #42008A; }

.quick-card {
  display: flex; align-items: center; gap: 14px;
  background: #F4EFFF; border-radius: 14px; padding: 18px 20px;
  cursor: pointer; transition: box-shadow 0.2s;
}
.quick-card:hover { box-shadow: 0 4px 20px rgba(66,0,138,0.12); }
.quick-icon { font-size: 24px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: white; border-radius: 10px; flex-shrink: 0; }
.quick-title { font-size: 15px; font-weight: 600; color: #42008A; }
.quick-sub { font-size: 13px; color: #6B7280; margin-top: 2px; }

@media (max-width: 768px) {
  .header-actions { justify-content: flex-start; }
  .action-btn-link { width: 100%; }
  .action-btn { width: 100%; }
}
</style>

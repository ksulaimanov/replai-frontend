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
          <div class="text-[11px] font-semibold text-[#7c6fa0] uppercase tracking-[0.09em]">Добро пожаловать</div>
          <h1 class="text-[30px] font-bold text-[#1e0050] mt-1 leading-[1.1] tracking-tight">Дашборд</h1>
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
          <div class="stat-note">
            <template v-if="!loading && analytics.totalMessages === 0">
              <RouterLink to="/integrations" class="underline underline-offset-2 hover:opacity-80">Каналы не подключены. Подключить бот →</RouterLink>
            </template>
            <template v-else>Входящие + исходящие</template>
          </div>
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
          <div class="stat-note">
            <template v-if="!loading && analytics.uniqueChats === 0">
              <RouterLink to="/integrations" class="underline underline-offset-2 hover:opacity-80">Каналы не подключены. Подключить бот →</RouterLink>
            </template>
            <template v-else>Активные чаты бота</template>
          </div>
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
            <template v-if="!loading && analytics.leads === 0">
              <RouterLink to="/integrations" class="underline underline-offset-2 hover:opacity-80">Каналы не подключены. Подключить бот →</RouterLink>
            </template>
            <RouterLink v-else to="/leads" class="underline underline-offset-2 hover:opacity-80">Смотреть все →</RouterLink>
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
            <div class="quick-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#42008A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <div>
              <div class="quick-title">База лидов</div>
              <div class="quick-sub">Контакты, собранные ботом</div>
            </div>
            <svg class="ml-auto text-[#9A7CC2] group-hover:translate-x-1 transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </RouterLink>
        <RouterLink to="/test-ai">
          <div class="quick-card group">
            <div class="quick-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#42008A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><path d="M9 7h6"/><circle cx="8.5" cy="16" r="1" fill="#42008A"/><circle cx="15.5" cy="16" r="1" fill="#42008A"/></svg>
            </div>
            <div>
              <div class="quick-title">Тест AI</div>
              <div class="quick-sub">Диалог с вашим ботом</div>
            </div>
            <svg class="ml-auto text-[#9A7CC2] group-hover:translate-x-1 transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </RouterLink>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.action-btn-link { display: inline-flex; }
.action-btn {
  background: #42008A; color: #FFFFFF; border-radius: 10px; padding: 10px 18px;
  font-size: 13px; font-weight: 600; white-space: nowrap; border: none; cursor: pointer;
  transition: background 0.15s ease, transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}
.action-btn:hover { background: #350070; transform: translateY(-1px); }
.action-btn:active { transform: scale(0.97); }

.stat-card {
  min-height: 162px; border-radius: 16px; padding: 24px 28px;
  background: linear-gradient(135deg, #edeaff 0%, #ddd6fe 55%, rgba(109, 40, 217, 0.28) 100%);
  border: 1px solid rgba(139, 92, 246, 0.14);
  transition: box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.stat-card:hover { box-shadow: 0 8px 32px -8px rgba(66, 0, 138, 0.18); transform: translateY(-2px); }
.stat-title { font-size: 11px; font-weight: 600; color: #5a4d8a; text-transform: uppercase; letter-spacing: 0.07em; }
.stat-value { margin-top: 16px; font-size: 36px; font-weight: 700; color: #1e0050; line-height: 1; }
.stat-note { margin-top: 14px; font-size: 13px; font-weight: 500; color: #42008A; opacity: 0.75; }

.quick-card {
  display: flex; align-items: center; gap: 14px;
  background: #f6f2ff; border-radius: 14px; padding: 16px 18px;
  cursor: pointer;
  border: 1px solid rgba(66, 0, 138, 0.08);
  transition: box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;
}
.quick-card:hover { box-shadow: 0 4px 24px rgba(66,0,138,0.1); transform: translateY(-1px); border-color: rgba(66,0,138,0.14); }
.quick-card:active { transform: scale(0.99); }
.quick-icon { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; background: white; border-radius: 10px; flex-shrink: 0; border: 1px solid rgba(66,0,138,0.08); }
.quick-title { font-size: 14px; font-weight: 600; color: #1e0050; }
.quick-sub { font-size: 12px; color: #7c6fa0; margin-top: 2px; }

@media (max-width: 768px) {
  .header-actions { justify-content: flex-start; }
  .action-btn-link { width: 100%; }
  .action-btn { width: 100%; }
}
</style>

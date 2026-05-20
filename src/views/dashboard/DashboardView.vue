<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const userName = ref('Имя')

const stats = {
  activeDialogs: 167,
  leads: 324,
  channels: 2
}

const recentChats = ref([
  { channel: 'Telegram', client: '@alex_business', message: 'Здравствуйте, можно узнать стоимость тарифов?', time: '2 мин назад' },
  { channel: 'WhatsApp', client: '+996 700 123 456', message: 'AI помог подобрать подходящий тариф, спасибо!', time: '15 мин назад' },
  { channel: 'Telegram', client: '@digital_store', message: 'Можно подключить Telegram и WhatsApp одновременно?', time: '1 ч назад' },
  { channel: 'WhatsApp', client: '+996 555 987 321', message: '/start', time: '3 ч назад' }
])
</script>

<template>
  <DashboardLayout>
    <div>
      <div class="header-row flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div class="text-[18px] font-semibold text-[#424754] leading-[1.2]">С возвращением, {{ userName }}</div>
          <h1 class="text-[32px] font-semibold text-[#42008A] mt-4 leading-[1.1]">Дашборд</h1>
        </div>

        <div class="header-actions flex items-center gap-4 flex-wrap justify-end">
          <RouterLink to="/test-ai" class="action-btn-link"><button class="action-btn">+ Протестировать AI</button></RouterLink>
          <RouterLink to="/integrations" class="action-btn-link"><button class="action-btn">+ Подключить канал</button></RouterLink>
          <RouterLink to="/automation" class="action-btn-link"><button class="action-btn">+ Новый сценарий</button></RouterLink>
          <div class="w-10 h-10 rounded-full bg-[#f0f0f4] flex items-center justify-center ml-2 shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="8" r="3" stroke="#424754" stroke-width="1.5"/><path d="M4 20c1.5-4 14-4 16 0" stroke="#424754" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div class="stat-card">
          <div class="stat-title">Активные диалоги</div>
          <div class="stat-value">{{ stats.activeDialogs }}</div>
          <div class="stat-note">+12% за неделю</div>
        </div>
        <div class="stat-card">
          <div class="stat-title">Квалифицированные лиды</div>
          <div class="stat-value">{{ stats.leads }}</div>
          <div class="stat-note">AI определил высокий интерес</div>
        </div>
        <div class="stat-card">
          <div class="stat-title">Активные каналы</div>
          <div class="stat-value">{{ stats.channels }}</div>
          <div class="stat-note">Telegram, WhatsApp</div>
        </div>
      </div>

      <div class="mt-12">
        <h2 class="text-[20px] font-medium mb-4">Недавние чаты</h2>
        <div class="recent-table bg-[#F3F1FD] rounded-[15px] overflow-hidden w-full overflow-x-auto relative">
          <div class="absolute w-[200px] h-[300px] rounded-full left-[250px] top-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,rgba(215,211,246,0.5)_0%,rgba(66,0,138,0.05)_100%)] blur-[40px] pointer-events-none hidden"></div>
          <div class="min-w-[800px]">
            <div class="table-head bg-[rgba(189,165,213,0.7)] px-6 py-4 text-[18px] font-medium text-black grid grid-cols-[140px_200px_1fr_120px] gap-4">
              <div>Каналы</div>
              <div>Клиенты</div>
              <div>Последние сообщения</div>
              <div class="text-right">Время</div>
            </div>
            <div class="px-6 py-2 bg-[rgba(238,233,250,0.5)]">
              <div v-for="(chat, idx) in recentChats" :key="idx" class="chat-row grid grid-cols-[140px_200px_1fr_120px] gap-4 items-center py-6 border-b border-[rgba(202,185,224,0.4)] last:border-b-0 relative z-10">
                <div><span class="channel-pill inline-block py-1 px-4 rounded-[16px] text-white text-[14px] bg-[#7E57C2]">{{ chat.channel }}</span></div>
                <div class="text-[14px] text-[#555] break-words">{{ chat.client }}</div>
                <div class="text-[14px] break-words min-w-0 text-[#222]">{{ chat.message }}</div>
                <div class="text-[14px] text-right whitespace-nowrap text-[#555]">{{ chat.time }}</div>
              </div>
            </div>
            <div class="px-6 py-6 text-center text-[#42008A] font-semibold text-[14px] cursor-pointer hover:underline bg-[rgba(238,233,250,0.5)] relative z-10">Посмотреть все диалоги →</div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped>
.action-btn-link { display: inline-flex; }
.action-btn { background: #42008A; color: #FFFFFF; border-radius: 10px; padding: 10px 16px; font-weight: 600; white-space: nowrap; }
.stat-card { min-height: 189px; border-radius: 15px; padding: 28px 32px; background: linear-gradient(119.01deg, #D7D3F6 32.05%, rgba(66, 0, 138, 0.69) 92.25%); }
.stat-title { font-size: 18px; font-weight: 500; color: #000; }
.stat-value { margin-top: 28px; font-size: 28px; font-weight: 600; color: #000; }
.stat-note { margin-top: 36px; font-size: 16px; font-weight: 600; color: #42008A; }
.channel-pill { display: inline-flex; align-items: center; padding: 8px 18px; border-radius: 9999px; color: #fff; font-size: 16px; line-height: 1; }
@media (max-width: 768px) {
  .header-actions { justify-content: flex-start; }
  .action-btn-link { width: 100%; }
  .action-btn { width: 100%; }
}
</style>

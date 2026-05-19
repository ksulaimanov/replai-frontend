<script setup lang="ts">
import { ref } from 'vue'

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
  <div class="dashboard-page min-h-screen bg-white text-[#111827] font-['Inter']">
    <div class="dashboard-shell relative">
      <aside class="sidebar hidden lg:block fixed left-4 top-4 bottom-4 w-[232px] z-20">
        <div class="sidebar-card bg-[#D7D3F6] rounded-[14px] h-full p-5 flex flex-col justify-between">
          <div>
            <div class="flex items-start gap-3 mb-6">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#42008A"/><path d="M19.5 16.5L20.65 19.35L23.5 20.5L20.65 21.65L19.5 24.5L18.35 21.65L15.5 20.5L18.35 19.35L19.5 16.5Z" fill="#42008A"/></svg>
              <div>
                <div class="text-[20px] font-semibold text-[#42008A] leading-[1.2]">REPLAI</div>
                <div class="text-[12px] text-[#424754] leading-[1.3]">Управление с помощью ИИ</div>
              </div>
            </div>

            <nav class="mt-6 flex flex-col gap-3">
              <RouterLink to="/dashboard" class="block outline-none" active-class="" exact-active-class="">
                <button class="menu-btn menu-btn--active">
                  <img src="/dashboard.png" alt="dashboard" class="menu-icon" />
                  <span class="font-semibold">Дашборд</span>
                </button>
              </RouterLink>

              <RouterLink to="/automation" class="block outline-none">
                <button class="menu-btn menu-btn--ghost">
                  <img src="/automation.png" alt="automation" class="menu-icon" />
                  <span class="font-semibold">Автоматизация</span>
                </button>
              </RouterLink>

              <RouterLink to="/integrations" class="block outline-none">
                <button class="menu-btn menu-btn--ghost">
                  <img src="/integration.png" alt="integrations" class="menu-icon menu-icon--wide" />
                  <span class="font-semibold">Интеграции</span>
                </button>
              </RouterLink>

              <RouterLink to="/test-ai" class="block outline-none">
                <button class="menu-btn menu-btn--ghost">
                  <img src="/testai.png" alt="test ai" class="menu-icon menu-icon--wide" />
                  <span class="font-semibold">Тест AI</span>
                </button>
              </RouterLink>
            </nav>
          </div>
        </div>
      </aside>

      <main class="main-content relative z-10 ml-0 lg:ml-[264px] p-4 lg:p-8 xl:pr-16 w-full lg:w-auto overflow-hidden">
        <div class="decor-ellipse hidden" aria-hidden="true"></div>

        <div class="header-row flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div class="text-[18px] font-semibold text-[#424754] leading-[1.2]">С возвращением, {{ userName }}</div>
            <h1 class="text-[32px] font-semibold text-[#42008A] mt-4 leading-[1.1]">Дашборд</h1>
          </div>

          <div class="header-actions flex items-center gap-4 flex-wrap justify-end">
            <button class="action-btn">+ Протестировать AI</button>
            <button class="action-btn">+ Подключить канал</button>
            <button class="action-btn">+ Новый сценарий</button>
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
                  <div>
                    <span :class="['channel-pill inline-block py-1 px-4 rounded-[16px] text-white text-[14px]', chat.channel === 'WhatsApp' ? 'bg-[#7E57C2]' : 'bg-[#7E57C2]']">
                      {{ chat.channel }}
                    </span>
                  </div>
                  <div class="text-[14px] text-[#555] break-words">{{ chat.client }}</div>
                  <div class="text-[14px] break-words min-w-0 text-[#222]">{{ chat.message }}</div>
                  <div class="text-[14px] text-right whitespace-nowrap text-[#555]">{{ chat.time }}</div>
                </div>
              </div>

              <div class="px-6 py-6 text-center text-[#42008A] font-semibold text-[14px] cursor-pointer hover:underline bg-[rgba(238,233,250,0.5)] relative z-10">Посмотреть все диалоги →</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  overflow-x: hidden;
}

.sidebar-card {
  box-shadow: 0 0 0 1px rgba(255,255,255,0.02);
}

.menu-btn {
  width: 100%;
  min-height: 47px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  text-align: left;
  border: none;
  outline: none;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
}

.router-link-active .menu-btn--ghost {
  background: transparent !important;
}

.menu-btn--active {
  background: linear-gradient(180deg, rgba(66, 0, 138, 0.8) 0%, rgba(17, 0, 36, 0.8) 100%);
  color: #FFFFFF;
}

.menu-btn--ghost {
  color: #42008A;
  background: transparent;
}

.menu-btn--ghost:hover {
  background: rgba(66, 0, 138, 0.05);
}

.menu-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  flex: 0 0 auto;
}

.menu-icon--wide {
  width: 32px;
  height: 32px;
}

.action-btn {
  background: #42008A;
  color: #FFFFFF;
  border-radius: 10px;
  padding: 10px 16px;
  font-weight: 600;
  white-space: nowrap;
}

.stat-card {
  min-height: 189px;
  border-radius: 15px;
  padding: 28px 32px;
  background: linear-gradient(119.01deg, #D7D3F6 32.05%, rgba(66, 0, 138, 0.69) 92.25%);
}

.stat-title {
  font-size: 18px;
  font-weight: 500;
  color: #000;
}

.stat-value {
  margin-top: 28px;
  font-size: 28px;
  font-weight: 600;
  color: #000;
}

.stat-note {
  margin-top: 36px;
  font-size: 16px;
  font-weight: 600;
  color: #42008A;
}

.channel-pill {
  display: inline-flex;
  align-items: center;
  padding: 8px 18px;
  border-radius: 9999px;
  background: rgba(66, 0, 138, 0.69);
  color: #fff;
  font-size: 16px;
  line-height: 1;
}

.decor-ellipse {
  position: absolute;
  left: 220px;
  top: 520px;
  width: 180px;
  height: 260px;
  border-radius: 50%;
  background: rgba(215, 211, 246, 0.55);
  pointer-events: none;
}

@media (max-width: 1280px) {
  .main-content {
    padding-right: 24px;
  }

  .header-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 1024px) {
  .dashboard-shell {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .sidebar {
    position: relative !important;
    left: 0 !important;
    top: 0 !important;
    bottom: auto !important;
    width: calc(100% - 32px) !important;
    margin: 16px 16px 0 16px;
    height: auto !important;
  }

  .sidebar-card {
    height: auto;
  }

  .main-content {
    margin-left: 0 !important;
    padding: 0 16px 16px 16px !important;
  }

  .header-row {
    align-items: stretch;
  }

  .header-actions {
    width: 100%;
    gap: 10px;
  }

  .action-btn {
    padding: 10px 12px;
    font-size: 14px;
  }

  .recent-table {
    overflow-x: auto;
  }

  .table-head,
  .chat-row {
    min-width: 760px;
  }

  .decor-ellipse {
    display: none !important;
  }
}

@media (max-width: 640px) {
  .sidebar {
    margin: 12px 12px 0 12px;
  }

  .menu-btn {
    min-height: 44px;
  }

  .menu-icon {
    width: 18px;
    height: 18px;
  }

  .stat-card {
    padding: 22px 20px;
    min-height: 160px;
  }

  .stat-title {
    font-size: 16px;
  }

  .stat-value {
    font-size: 24px;
    margin-top: 18px;
  }

  .stat-note {
    font-size: 14px;
    margin-top: 24px;
  }

  .recent-table {
    border-radius: 12px;
  }

  .decor-ellipse {
    display: none !important;
  }
}
</style>

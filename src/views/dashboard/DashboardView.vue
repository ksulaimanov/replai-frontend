<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const menuItems = [
  { id: 'dashboard', label: 'Дашборд', icon: 'dashboard', active: false },
  { id: 'automation', label: 'Автоматизация', icon: 'automation', active: true },
  { id: 'integrations', label: 'Интеграции', icon: 'integrations', active: false },
  { id: 'test-ai', label: 'Тест AI', icon: 'test-ai', active: false }
]
</script>

<template>
  <div class="dashboard-page relative w-full min-h-screen bg-white overflow-hidden font-['Inter']">
    <div class="absolute w-[531px] h-[307.5px] left-[183px] top-[806.5px] bg-[#D7D3F6] blur-[50px] pointer-events-none"></div>
    <div class="absolute w-[179px] h-[337px] left-[658px] top-[942px] bg-[#42008A] blur-[50px] pointer-events-none"></div>

    <aside class="dashboard-menu absolute left-[10px] top-1/2 -translate-y-1/2 w-[232px] h-[799px] bg-[#D7D3F6] rounded-[14px] px-[20px] py-[36px]">
      <div class="flex items-start gap-[10px] mb-[46px]">
        <svg class="mt-[2px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#42008A"/>
          <path d="M19.5 16.5L20.65 19.35L23.5 20.5L20.65 21.65L19.5 24.5L18.35 21.65L15.5 20.5L18.35 19.35L19.5 16.5Z" fill="#42008A"/>
        </svg>
        <div>
          <div class="text-[24px] font-semibold leading-[29px] text-[#42008A]">REPLAI</div>
          <div class="mt-[2px] text-[12px] font-semibold leading-[16px] tracking-[0.24px] text-[#424754]">Управление с помощью ИИ</div>
        </div>
      </div>

      <nav class="flex flex-col gap-[17px]">
        <button
          v-for="item in menuItems"
          :key="item.id"
          type="button"
          class="menu-item relative w-full text-left h-[47px] rounded-[10px] flex items-center"
          :class="item.active ? 'bg-[linear-gradient(180deg,rgba(66,0,138,0.8)_0%,rgba(17,0,36,0.8)_100%)] text-white' : 'bg-transparent text-[#42008A]'"
        >
          <span class="menu-icon absolute left-[14px]" :class="item.active ? 'opacity-100' : 'opacity-100'">
            <svg v-if="item.icon === 'dashboard'" width="29" height="35" viewBox="0 0 29 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="2"/>
              <rect x="17" y="4" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="2"/>
              <rect x="3" y="18" width="9" height="13" rx="1.5" stroke="currentColor" stroke-width="2"/>
              <rect x="17" y="18" width="9" height="13" rx="1.5" stroke="currentColor" stroke-width="2"/>
            </svg>
            <svg v-else-if="item.icon === 'automation'" width="30" height="35" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="17" r="10" stroke="currentColor" stroke-width="2.2"/>
              <path d="M15 9V12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M15 22V25" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M7 17H10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M20 17H23" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M9.5 11.5L11.5 13.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M18.5 20.5L20.5 22.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M9.5 22.5L11.5 20.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <path d="M18.5 13.5L20.5 11.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
              <circle cx="15" cy="17" r="3" fill="currentColor"/>
            </svg>
            <svg v-else-if="item.icon === 'integrations'" width="29" height="58" viewBox="0 0 29 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="13" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M14.5 1V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M14.5 35V43" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M2 22.5H10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M19 22.5H27" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M6.5 6.5L9.5 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M19.5 6.5L16.5 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M6.5 38.5L9.5 35.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M19.5 38.5L16.5 35.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg v-else width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="17" height="24" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M10 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M19 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M10 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M10 18H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="pl-[48px] text-[14px] font-semibold leading-[16px] tracking-[0.24px]">{{ item.label }}</span>
        </button>
      </nav>
    </aside>

    <main class="dashboard-content ml-[242px] min-h-screen flex items-center justify-center px-8 py-8">
      <div class="text-center max-w-[480px]">
        <h1 class="text-[40px] font-semibold text-[#42008A] mb-4">Автоматизация</h1>
        <p class="text-[18px] text-[#424754]">Страница дашборда подготовлена по макету. Здесь можно разместить виджеты, статистику и блоки управления.</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
@media (max-width: 1024px) {
  .dashboard-page {
    min-height: 100vh;
    overflow-x: auto;
  }

  .dashboard-menu {
    position: fixed;
    top: 10px;
    left: 10px;
    transform: none;
    height: calc(100vh - 20px);
    z-index: 10;
  }

  .dashboard-content {
    margin-left: 252px;
    min-width: 900px;
  }
}
</style>

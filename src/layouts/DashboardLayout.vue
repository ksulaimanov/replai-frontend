<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const navItems = [
  { to: '/dashboard', label: 'Дашборд', icon: '/dashboard.png', exact: true },
  {
    to: '/leads', label: 'Лиды', icon: null,
    svg: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  },
  { to: '/automation', label: 'Автоматизация', icon: '/automation.png' },
  { to: '/integrations', label: 'Интеграции', icon: '/integration.png' },
  { to: '/test-ai', label: 'Тест AI', icon: '/testai.png' }
]

const activePath = computed(() => route.path)

const isActive = (path: string, exact = false) => (exact ? activePath.value === path : activePath.value.startsWith(path))
const getIconClass = (path: string, exact = false) => (isActive(path, exact) ? 'menu-icon menu-icon--active' : 'menu-icon')
const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

function handleNavClick(e: Event) {
  const btn = e.currentTarget as HTMLElement
  if (!btn) return
  btn.classList.add('menu-btn--clicked')
  setTimeout(() => btn.classList.remove('menu-btn--clicked'), 320)
}
</script>

<template>
  <div class="dashboard-layout min-h-screen bg-white text-[#111827] font-['Inter']">
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
            <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="block outline-none">
              <button class="menu-btn" @click="handleNavClick" :class="isActive(item.to, item.exact) ? 'menu-btn--active' : 'menu-btn--ghost'">
                <span v-if="item.svg" :class="getIconClass(item.to, item.exact)" v-html="item.svg"></span>
                <img v-else :src="item.icon" :alt="item.label" :class="getIconClass(item.to, item.exact)" />
                <span class="font-semibold">{{ item.label }}</span>
              </button>
            </RouterLink>
          </nav>
        </div>
      </div>
    </aside>

    <header class="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[rgba(66,0,138,0.12)] px-4 py-3 flex items-center justify-between">
      <div>
        <div class="text-[18px] font-semibold text-[#42008A] leading-tight">REPLAI</div>
        <div class="text-[11px] text-[#424754]">Управление с помощью ИИ</div>
      </div>
      <button type="button" class="burger-btn" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Открыть меню">
        <span></span><span></span><span></span>
      </button>
    </header>

    <div v-if="mobileMenuOpen" class="lg:hidden fixed inset-0 z-40 bg-black/30" @click="closeMobileMenu">
      <div class="mobile-drawer bg-[#D7D3F6] h-full w-[280px] max-w-[85vw] p-5" @click.stop>
        <div class="flex items-start justify-between gap-4 mb-6">
          <div>
            <div class="text-[20px] font-semibold text-[#42008A] leading-[1.2]">REPLAI</div>
            <div class="text-[12px] text-[#424754] leading-[1.3]">Управление с помощью ИИ</div>
          </div>
          <button type="button" class="text-[#42008A] text-[28px] leading-none" @click="closeMobileMenu">×</button>
        </div>

        <nav class="flex flex-col gap-3">
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="block outline-none" @click="closeMobileMenu">
            <button class="menu-btn" @click="handleNavClick" :class="isActive(item.to, item.exact) ? 'menu-btn--active' : 'menu-btn--ghost'">
              <img :src="item.icon" :alt="item.label" :class="getIconClass(item.to, item.exact)" />
              <span class="font-semibold">{{ item.label }}</span>
            </button>
          </RouterLink>
        </nav>
      </div>
    </div>

    <main class="main-content relative z-10 ml-0 lg:ml-[264px] p-4 lg:p-8 xl:pr-16 w-full lg:w-auto overflow-hidden">
      <Transition name="route" mode="out-in">
        <slot />
      </Transition>
    </main>
  </div>
</template>

<style scoped>
.sidebar-card { box-shadow: 0 0 0 1px rgba(255,255,255,0.02); }
.menu-btn {
  width: 100%; min-height: 47px; border-radius: 10px; display: flex; align-items: center; gap: 12px;
  padding: 0 16px; text-align: left; border: none; outline: none; background-color: transparent;
  transition: all 0.2s ease-in-out;
}
.menu-btn--active { background: linear-gradient(180deg, rgba(66, 0, 138, 0.8) 0%, rgba(17, 0, 36, 0.8) 100%); color: #FFFFFF; }
.menu-btn--ghost { color: #42008A; background: transparent; }
.menu-btn--ghost:hover { background: rgba(66, 0, 138, 0.05); }
.menu-icon { width: 32px; height: 32px; object-fit: contain; flex: 0 0 auto; transition: filter 0.2s ease-in-out; }
.menu-icon--active { filter: brightness(0) invert(1); }
.burger-btn { width: 40px; height: 40px; border-radius: 10px; border: 1px solid rgba(66,0,138,0.18); display: inline-flex; align-items: center; justify-content: center; flex-direction: column; gap: 4px; background: white; }
.burger-btn span { width: 18px; height: 2px; background: #42008A; border-radius: 9999px; }
.mobile-drawer { box-shadow: 12px 0 40px rgba(0,0,0,0.16); }
</style>

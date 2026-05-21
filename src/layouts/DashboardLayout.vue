<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ToastContainer from '@/components/ToastContainer.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

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
const closeMobileMenu = () => { mobileMenuOpen.value = false }

const userEmail = computed(() => {
  const token = authStore.token
  if (!token) return ''
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    return payload.sub ?? ''
  } catch {
    return ''
  }
})

const userInitial = computed(() => userEmail.value.charAt(0).toUpperCase() || '?')

function handleLogout() {
  authStore.clearToken()
  router.push('/login')
}
</script>

<template>
  <div class="dashboard-layout min-h-screen bg-white text-[#111827] font-['Inter']">

    <!-- ── DESKTOP SIDEBAR ── -->
    <aside class="sidebar hidden lg:block fixed left-4 top-4 bottom-4 w-[232px] z-20">
      <div class="sidebar-card bg-[#D7D3F6] rounded-[14px] h-full p-5 flex flex-col justify-between">

        <!-- Top: logo + nav -->
        <div>
          <div class="flex items-start gap-3 mb-6">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="#42008A"/><path d="M19.5 16.5L20.65 19.35L23.5 20.5L20.65 21.65L19.5 24.5L18.35 21.65L15.5 20.5L18.35 19.35L19.5 16.5Z" fill="#42008A"/></svg>
            <div>
              <div class="text-[20px] font-semibold text-[#42008A] leading-[1.2]">replAI</div>
              <div class="text-[12px] text-[#424754] leading-[1.3]">Управление с помощью ИИ</div>
            </div>
          </div>

          <nav class="mt-6 flex flex-col gap-3">
            <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="block outline-none">
              <button class="menu-btn" :class="isActive(item.to, item.exact) ? 'menu-btn--active' : 'menu-btn--ghost'">
                <span v-if="item.svg" :class="getIconClass(item.to, item.exact)" v-html="item.svg"></span>
                <img v-else :src="item.icon" :alt="item.label" :class="getIconClass(item.to, item.exact)" />
                <span class="font-semibold">{{ item.label }}</span>
              </button>
            </RouterLink>
          </nav>
        </div>

        <!-- Bottom: user profile + logout -->
        <div class="border-t border-[rgba(66,0,138,0.2)] pt-4">
          <div class="flex items-center gap-2 mb-3 px-2">
            <div class="w-8 h-8 rounded-full bg-[#42008A] flex items-center justify-center text-white text-[13px] font-bold shrink-0">
              {{ userInitial }}
            </div>
            <span class="text-[12px] text-[#424754] truncate leading-tight">{{ userEmail || 'Профиль' }}</span>
          </div>
          <button
            @click="handleLogout"
            class="w-full flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-[13px] font-semibold text-[#42008A] hover:bg-[rgba(66,0,138,0.08)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Выйти
          </button>
        </div>
      </div>
    </aside>

    <!-- ── MOBILE HEADER ── -->
    <header class="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[rgba(66,0,138,0.12)] px-4 py-3 flex items-center justify-between">
      <div>
        <div class="text-[18px] font-semibold text-[#42008A] leading-tight">replAI</div>
        <div class="text-[11px] text-[#424754]">Управление с помощью ИИ</div>
      </div>
      <button type="button" class="burger-btn" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Открыть меню">
        <span></span><span></span><span></span>
      </button>
    </header>

    <!-- ── MOBILE DRAWER ── -->
    <div v-if="mobileMenuOpen" class="lg:hidden fixed inset-0 z-40 bg-black/30" @click="closeMobileMenu">
      <div class="mobile-drawer bg-[#D7D3F6] h-full w-[280px] max-w-[85vw] p-5 flex flex-col justify-between" @click.stop>
        <div>
          <div class="flex items-start justify-between gap-4 mb-6">
            <div>
              <div class="text-[20px] font-semibold text-[#42008A] leading-[1.2]">replAI</div>
              <div class="text-[12px] text-[#424754] leading-[1.3]">Управление с помощью ИИ</div>
            </div>
            <button type="button" class="text-[#42008A] text-[28px] leading-none" @click="closeMobileMenu">×</button>
          </div>

          <nav class="flex flex-col gap-3">
            <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="block outline-none" @click="closeMobileMenu">
              <button class="menu-btn" :class="isActive(item.to, item.exact) ? 'menu-btn--active' : 'menu-btn--ghost'">
                <span v-if="item.svg" :class="getIconClass(item.to, item.exact)" v-html="item.svg"></span>
                <img v-else :src="item.icon" :alt="item.label" :class="getIconClass(item.to, item.exact)" />
                <span class="font-semibold">{{ item.label }}</span>
              </button>
            </RouterLink>
          </nav>
        </div>

        <!-- Mobile: user + logout -->
        <div class="border-t border-[rgba(66,0,138,0.2)] pt-4">
          <div class="flex items-center gap-2 mb-3 px-2">
            <div class="w-8 h-8 rounded-full bg-[#42008A] flex items-center justify-center text-white text-[13px] font-bold shrink-0">
              {{ userInitial }}
            </div>
            <span class="text-[12px] text-[#424754] truncate">{{ userEmail || 'Профиль' }}</span>
          </div>
          <button
            @click="handleLogout(); closeMobileMenu()"
            class="w-full flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-[13px] font-semibold text-[#42008A] hover:bg-[rgba(66,0,138,0.08)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Выйти
          </button>
        </div>
      </div>
    </div>

    <main class="main-content relative z-10 ml-0 lg:ml-[264px] p-4 lg:p-8 xl:pr-16 w-full lg:w-auto overflow-hidden">
      <slot />
    </main>

    <ToastContainer />
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

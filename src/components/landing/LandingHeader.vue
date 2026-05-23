<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const menuOpen = ref(false)

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<template>
  <header class="landing-header">
    <div class="landing-header__inner">
      <RouterLink to="/" class="landing-brand" @click="closeMenu">
        <img src="/mainlogo.png" alt="replai" class="h-[56px] object-contain" />
      </RouterLink>

      <nav class="landing-header__actions landing-header__actions--desktop" aria-label="Навигация">
        <RouterLink to="/login" class="header-link">Войти</RouterLink>
        <RouterLink to="/register" class="header-link header-link--solid">Регистрация</RouterLink>
      </nav>

      <button
        type="button"
        class="burger"
        :aria-expanded="menuOpen"
        aria-label="Открыть меню"
        @click="menuOpen = !menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <Transition name="header-menu">
      <div v-if="menuOpen" class="landing-header__mobile">
        <RouterLink to="/login" class="header-link header-link--mobile" @click="closeMenu">
          Войти
        </RouterLink>
        <RouterLink to="/register" class="header-link header-link--solid header-link--mobile" @click="closeMenu">
          Регистрация
        </RouterLink>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.landing-header {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px 0;
}

.landing-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 74px;
  padding: 14px 18px;
  border-radius: 15px;
  background: #fcfbff;
  box-shadow: 0 16px 40px rgba(66, 0, 138, 0.06);
}

.landing-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #42008a;
  text-decoration: none;
  font-size: 24px;
  font-weight: 600;
  line-height: 1;
}

.landing-header__actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-link {
  color: #000000;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.2;
  transition: color 0.2s ease, transform 0.2s ease;
}

.header-link:hover {
  color: #42008a;
}

.header-link--solid {
  padding: 12px 18px;
  border-radius: 999px;
  background: rgba(66, 0, 138, 0.08);
}

.burger {
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(66, 0, 138, 0.16);
  border-radius: 12px;
  background: #ffffff;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.burger span {
  width: 18px;
  height: 2px;
  border-radius: 999px;
  background: #42008a;
}

.landing-header__mobile {
  display: none;
}

.header-menu-enter-active,
.header-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.header-menu-enter-from,
.header-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 767px) {
  .landing-header {
    padding-top: 16px;
  }

  .landing-header__inner {
    min-height: 64px;
    padding-inline: 16px;
  }

  .landing-brand {
    font-size: 20px;
  }

  .landing-header__actions--desktop {
    display: none;
  }

  .burger {
    display: inline-flex;
  }

  .landing-header__mobile {
    display: grid;
    gap: 10px;
    margin-top: 12px;
    padding: 14px;
    border-radius: 15px;
    background: #fcfbff;
    box-shadow: 0 16px 40px rgba(66, 0, 138, 0.06);
  }

  .header-link--mobile {
    text-align: center;
  }
}
</style>

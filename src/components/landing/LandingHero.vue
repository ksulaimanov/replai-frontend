<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__copy">
        <p class="hero__eyebrow">AI-боты для Telegram и WhatsApp</p>
        <h1 class="hero__title">
          Превратите разговоры
          <span>в реальный доход</span>
        </h1>
        <p class="hero__description">
          AI-ассистент для Telegram и WhatsApp, который отвечает клиентам, квалифицирует лидов
          и автоматизирует продажи 24/7.
        </p>

        <RouterLink to="/register" class="hero__button">Попробовать бесплатно</RouterLink>
      </div>

      <div class="hero__visual" aria-label="Пример диалога с ботом">
        <span class="hero__orb hero__orb--left" aria-hidden="true"></span>
        <span class="hero__orb hero__orb--right" aria-hidden="true"></span>

        <div class="chat-card">
          <div class="chat-card__row">
            <div class="chat-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M4 21C4 17.134 7.13401 14 11 14H13C16.866 14 20 17.134 20 21"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div class="chat-bubble">Привет! Какие у вас условия по рассрочке на годовой тариф?</div>
          </div>

          <div class="chat-card__row chat-card__row--bot">
            <div class="chat-bubble chat-bubble--bot">
              Здравствуйте! У нас есть беспроцентная рассрочка на 3, 6 и 12 месяцев. Оформить можно
              прямо в чате за 1 минуту. Вам прислать ссылку?
            </div>
          </div>

          <div class="chat-card__row">
            <div class="chat-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <path
                  d="M4 21C4 17.134 7.13401 14 11 14H13C16.866 14 20 17.134 20 21"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div class="chat-bubble">Да, пришлите, пожалуйста.</div>
          </div>

          <div class="chat-meta">
            <span>Время отклика: 1,2 с</span>
            <span class="chat-meta__status">
              <span class="chat-meta__dot"></span>
              ИИ активен
            </span>
          </div>

          <div class="hero__badge" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 9V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V9"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
              <rect x="4" y="9" width="16" height="10" rx="5" stroke="white" stroke-width="2" />
              <circle cx="9" cy="14" r="1.5" fill="white" />
              <circle cx="15" cy="14" r="1.5" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 16px 0;
}

.hero__inner {
  display: grid;
  align-items: center;
  gap: 28px;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
}

.hero__copy {
  position: relative;
  z-index: 1;
  max-width: 600px;
  padding: 8px 0;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  margin-bottom: 18px;
  border-radius: 999px;
  background: rgba(66, 0, 138, 0.08);
  color: #42008a;
  font-size: 14px;
  font-weight: 500;
}

.hero__title {
  color: #42008a;
  font-size: 48px;
  font-weight: 600;
  line-height: 58px;
  letter-spacing: -0.02em;
}

.hero__title span {
  display: block;
}

.hero__description {
  max-width: 560px;
  margin-top: 18px;
  color: #4a4455;
  font-size: 20px;
  line-height: 24px;
}

.hero__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 62px;
  margin-top: 28px;
  padding: 0 28px;
  border-radius: 20px;
  background: #42008a;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  box-shadow: 0 18px 40px rgba(66, 0, 138, 0.2);
  transition: transform 0.2s ease, background 0.2s ease;
}

.hero__button:hover {
  background: #5300b7;
  transform: translateY(-1px);
}

.hero__visual {
  position: relative;
  z-index: 1;
  min-height: 100%;
  padding: 18px 0 12px;
}

.hero__orb {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
}

.hero__orb--left {
  top: 14px;
  left: -40px;
  width: 170px;
  height: 170px;
  background: rgba(215, 211, 246, 0.72);
  filter: blur(50px);
}

.hero__orb--right {
  top: -10px;
  right: -32px;
  width: 210px;
  height: 210px;
  background: rgba(66, 0, 138, 0.26);
  filter: blur(100px);
}

.chat-card {
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  background: #283044;
  padding: 30px;
  box-shadow: 0 30px 90px rgba(16, 18, 36, 0.35);
}

.chat-card__row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.chat-card__row + .chat-card__row {
  margin-top: 16px;
}

.chat-card__row--bot {
  justify-content: flex-end;
}

.chat-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #283044;
}

.chat-bubble {
  max-width: 320px;
  border-radius: 0 16px 16px 16px;
  background: rgba(255, 255, 255, 0.1);
  padding: 14px 16px;
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
}

.chat-card__row--bot .chat-bubble {
  border-radius: 16px 16px 0 16px;
  background: rgba(177, 42, 255, 0.1);
}

.chat-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  color: #eaedff;
  font-size: 11px;
  line-height: 1.4;
}

.chat-meta__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.chat-meta__dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #25d366;
}

.hero__badge {
  position: absolute;
  right: 16px;
  top: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: #5300b7;
  transform: translateY(-50%);
  box-shadow: 0 18px 40px rgba(83, 0, 183, 0.28);
}

@media (max-width: 1023px) {
  .hero__inner {
    grid-template-columns: 1fr;
  }

  .hero__copy {
    max-width: 720px;
  }

  .hero__visual {
    max-width: 720px;
  }
}

@media (max-width: 767px) {
  .hero {
    padding-top: 18px;
  }

  .hero__title {
    font-size: 34px;
    line-height: 42px;
  }

  .hero__description {
    margin-top: 14px;
    font-size: 18px;
    line-height: 26px;
  }

  .hero__button {
    width: 100%;
    min-height: 56px;
    font-size: 18px;
  }

  .chat-card {
    padding: 20px;
    border-radius: 24px;
  }

  .chat-bubble {
    max-width: 100%;
    font-size: 14px;
    line-height: 22px;
  }

  .chat-meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero__badge {
    width: 36px;
    height: 36px;
  }
}
</style>

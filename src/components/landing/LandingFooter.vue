<template>
  <footer class="landing-footer">
    <div class="landing-footer__inner">
      <div class="landing-footer__brand">
        <div class="landing-footer__logo">
          <img src="/mainlogo.png" alt="replai" class="w-[180px] h-auto object-contain" />
        </div>
        <p class="landing-footer__description">
          AI-технологии для масштабирования вашего бизнеса и автоматизации клиентского сервиса.
        </p>
      </div>

      <div class="landing-footer__columns">
        <div class="footer-col">
          <h3 class="footer-col__title">Продукт</h3>
          <a href="#" class="footer-col__link">Возможности</a>
          <a href="#" class="footer-col__link">Тарифы</a>
          <a href="#" class="footer-col__link">Кейсы</a>
          <a href="#" class="footer-col__link">Интеграции</a>
        </div>

        <div class="footer-col">
          <h3 class="footer-col__title">Компания</h3>
          <a href="#" class="footer-col__link">Конфиденциальность</a>
          <a href="#" class="footer-col__link">Условия использования</a>
          <a href="#" class="footer-col__link">API</a>
          <a href="#" class="footer-col__link">Поддержка</a>
        </div>

        <div class="footer-col">
          <h3 class="footer-col__title">Контакты</h3>
          <a href="mailto:ksulaimanov.dev@gmail.com" class="footer-col__link">ksulaimanov.dev@gmail.com</a>
          <a href="https://t.me/ksulaimanov" target="_blank" rel="noopener" class="footer-col__link">@ksulaimanov</a>

          <div class="footer-socials">
            <a
              href="https://t.me/ksulaimanov"
              target="_blank"
              rel="noopener"
              class="footer-social"
              aria-label="Telegram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 12L20 4L16 20L11 13L4 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.landing-footer {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 28px;
}

.landing-footer__inner {
  display: grid;
  gap: 32px;
  border-top: 1px solid rgba(66, 0, 138, 0.08);
  padding-top: 32px;
}

.landing-footer__brand {
  max-width: 380px;
}

.landing-footer__logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #131b2e;
  font-family: 'Sora', sans-serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
}

.landing-footer__description {
  margin-top: 16px;
  color: #4a4455;
  font-size: 16px;
  line-height: 24px;
}

.landing-footer__columns {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.footer-col {
  display: grid;
  gap: 10px;
  align-content: start;
}

.footer-col__title {
  color: #5300b7;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}

.footer-col__link {
  color: #4a4455;
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
}

.footer-col__link:hover {
  color: #42008a;
}

.footer-socials {
  display: flex;
  gap: 10px;
  margin-top: 6px;
}

.footer-social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: #ffffff;
  color: #5300b7;
  box-shadow: 0 8px 24px rgba(66, 0, 138, 0.08);
  text-decoration: none;
}

@media (min-width: 900px) {
  .landing-footer__inner {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.2fr);
    align-items: start;
  }
}

@media (max-width: 767px) {
  .landing-footer__columns {
    grid-template-columns: 1fr;
  }
}
</style>

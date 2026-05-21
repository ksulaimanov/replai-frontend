<script setup lang="ts">
const features = [
  {
    title: 'AI отвечает клиентам 24/7',
    description:
      'Ваши клиенты получают мгновенные ответы в любое время суток, даже в праздники и выходные.',
    icon: 'support',
    image: '/support.png',
    alt: 'AI поддержка',
    imageClass: 'feature-card__image--support'
  },
  {
    title: 'Telegram + WhatsApp',
    description: 'Работайте там, где удобно вашим клиентам. Единое окно для всех мессенджеров.',
    icon: 'chat',
    image: null,
    alt: '',
    imageClass: ''
  },
  {
    title: 'Аналитика и автоматизация',
    description:
      'Прозрачная отчетность по конверсиям, лидам и качеству работы AI-ассистента.',
    icon: 'analytics',
    image: '/analytics.png',
    alt: 'Аналитика',
    imageClass: 'feature-card__image--analytics'
  }
]
</script>

<template>
  <section class="features">
    <div class="features__inner">
      <div class="features__header">
        <h2 class="features__title">Все инструменты для ИИ-продаж в одной платформе</h2>
        <p class="features__subtitle">Автоматизируйте рутину и сосредоточьтесь на стратегии</p>
      </div>

      <div class="features__grid">
        <article v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-card__icon" aria-hidden="true">
            <svg v-if="feature.icon === 'support'" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 7V12L15 15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
            </svg>
            <svg v-else-if="feature.icon === 'chat'" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 11.5C21 7.35786 17.6421 4 13.5 4H10.5C6.35786 4 3 7.35786 3 11.5C3 15.6421 6.35786 19 10.5 19H14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path d="M20 19L22 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 19V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <path d="M10 19V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <path d="M16 19V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <path d="M22 19V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>

          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__description">{{ feature.description }}</p>

          <div class="feature-card__media">
            <template v-if="feature.image">
              <img :src="feature.image" :alt="feature.alt" class="feature-card__image" :class="feature.imageClass" />
            </template>
            <template v-else>
              <div class="feature-card__stack">
                <img src="/telegram.png" alt="Telegram" class="feature-card__stack-item feature-card__stack-item--telegram" />
                <img src="/whatsapp.png" alt="WhatsApp" class="feature-card__stack-item feature-card__stack-item--whatsapp" />
              </div>
            </template>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.features__inner {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.72);
  padding: 36px;
  box-shadow: 0 24px 70px rgba(66, 0, 138, 0.08);
  backdrop-filter: blur(14px);
}

.features__header {
  text-align: center;
}

.features__title {
  color: #131b2e;
  font-size: 48px;
  font-weight: 500;
  line-height: 1.15;
}

.features__subtitle {
  margin-top: 14px;
  color: #4a4455;
  font-size: 18px;
  line-height: 1.5;
}

.features__grid {
  display: grid;
  gap: 24px;
  margin-top: 32px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature-card {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  border-radius: 20px;
  background: #ffffff;
  padding: 24px;
  box-shadow: 0 18px 60px rgba(66, 0, 138, 0.08);
}

.feature-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(83, 0, 183, 0.1);
  color: #5300b7;
}

.feature-card__title {
  margin-top: 18px;
  color: #131b2e;
  font-size: 30px;
  font-weight: 700;
  line-height: 38px;
}

.feature-card__description {
  margin-top: 12px;
  color: #4a4455;
  font-size: 16px;
  line-height: 24px;
}

.feature-card__media {
  display: flex;
  flex: 1;
  align-items: flex-end;
  margin-top: 20px;
}

.feature-card__image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.feature-card__image--support {
  max-height: 180px;
}

.feature-card__image--analytics {
  max-height: 180px;
}

.feature-card__stack {
  position: relative;
  width: min(100%, 220px);
  height: 180px;
  margin: 0 auto;
}

.feature-card__stack-item {
  position: absolute;
  width: 104px;
  height: 104px;
  border-radius: 26px;
  object-fit: cover;
  box-shadow: 0 14px 40px rgba(66, 0, 138, 0.16);
}

.feature-card__stack-item--telegram {
  top: 0;
  left: 0;
}

.feature-card__stack-item--whatsapp {
  right: 0;
  bottom: 0;
}

@media (max-width: 1023px) {
  .features__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .features__inner {
    padding: 24px 18px;
    border-radius: 24px;
  }

  .features__title {
    font-size: 32px;
  }

  .features__subtitle {
    font-size: 16px;
  }

  .features__grid {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 24px;
  }

  .feature-card {
    padding: 20px;
  }

  .feature-card__title {
    font-size: 24px;
    line-height: 32px;
  }

  .feature-card__stack {
    width: 200px;
    height: 156px;
  }

  .feature-card__stack-item {
    width: 96px;
    height: 96px;
  }
}
</style>

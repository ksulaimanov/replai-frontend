<script setup lang="ts">
const steps = [
  {
    number: '1',
    title: 'Подключите каналы',
    description: 'Привяжите свои аккаунты Telegram и WhatsApp за 2 минуты.'
  },
  {
    number: '2',
    title: 'Загрузите базу знаний',
    description: 'Добавьте информацию о продуктах, ценах и частых вопросах.'
  },
  {
    number: '3',
    title: 'AI начнет отвечать',
    description: 'Ассистент мгновенно включается в работу и закрывает сделки.'
  }
]
</script>

<template>
  <section class="steps">
    <div class="steps__inner">
      <h2 class="steps__title">Как это работает</h2>

      <div class="steps__grid">
        <article v-for="step in steps" :key="step.number" class="step-card">
          <span class="step-card__number">{{ step.number }}</span>
          <h3 class="step-card__title">{{ step.title }}</h3>
          <p class="step-card__description">{{ step.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.steps {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.steps__inner {
  border-radius: 28px;
  background: #ffffff;
  padding: 40px 32px 36px;
  box-shadow: 0 24px 70px rgba(66, 0, 138, 0.08);
}

.steps__title {
  color: #131b2e;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.15;
  text-align: center;
}

.steps__grid {
  display: grid;
  gap: 24px;
  margin-top: 32px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.step-card {
  display: grid;
  justify-items: center;
  gap: 12px;
  text-align: center;
}

.step-card__number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 11px;
  background: #5300b7;
  color: #ffffff;
  font-size: 32px;
  font-weight: 600;
  line-height: 1;
}

.step-card__title {
  color: #131b2e;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.26;
}

.step-card__description {
  color: #4a4455;
  font-size: 16px;
  line-height: 24px;
}

@media (max-width: 1023px) {
  .steps__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .steps__inner {
    padding: 28px 18px;
    border-radius: 24px;
  }

  .steps__title {
    font-size: 32px;
  }

  .step-card__title {
    font-size: 22px;
  }

  .step-card__number {
    width: 48px;
    height: 48px;
    font-size: 28px;
  }
}
</style>

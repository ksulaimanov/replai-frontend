<template>
  <DashboardLayout>
    <div class="page-wrap">
      <div class="page-header">
        <h1 class="page-title">Интеграции</h1>
        <p class="page-subtitle">Подключайте каналы, настраивайте токены и управляйте связью с клиентами.</p>
      </div>

      <div class="cards-grid">
        <section class="integration-card">
          <div class="card-head">
            <div class="service-badge service-badge--telegram">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21.8 4.6 18.4 20c-.2.9-.8 1.1-1.6.7l-4.4-3.2-2.1 2c-.2.2-.5.4-.9.4l.3-4.7 8.5-7.6c.4-.3-.1-.5-.6-.2l-10.6 6.7-4.6-1.4c-1-.3-1-1 .2-1.5L20.2 3.8c.8-.3 1.5.2 1.6.8Z" fill="currentColor"/></svg>
            </div>
            <div class="card-head__content">
              <div class="service-title-row">
                <h2 class="service-title">Telegram</h2>
                <div class="status-stack">
                  <span :class="telegramConfirmationClass">{{ isTelegramConfirmed ? 'Подтвержден' : 'Не подтвержден' }}</span>
                  <span :class="telegramActiveClass">{{ isTelegramActive ? 'Активен' : 'Неактивен' }}</span>
                </div>
              </div>
            </div>
            <button type="button" :class="telegramToggleClass" @click="setTelegramActive(!isTelegramActive)" :aria-pressed="isTelegramActive">
              <span class="toggle__knob"></span>
            </button>
          </div>

          <div class="field-block">
            <label class="field-label" for="telegram-token">Бот Токен</label>
            <input
              id="telegram-token"
              v-model="telegramToken"
              @input="markTelegramTouched"
              type="text"
              :class="['text-input', 'text-input--mono', telegramTokenTouched && telegramError ? 'text-input--error' : '']"
              :placeholder="telegramDefaultToken"
              autocomplete="off"
              spellcheck="false"
            >
            <p v-if="telegramTokenTouched && telegramError" class="field-message field-message--error">{{ telegramError }}</p>
            <p v-else class="field-message">Получите это от @BotFather в Telegram.</p>
            <p v-if="telegramSuccess" class="field-message field-message--success">{{ telegramSuccess }}</p>
          </div>

          <button
            type="button"
            :class="telegramConfirmButtonClass"
            :disabled="!telegramCanSubmit"
            @click="submitTelegramToken"
          >
            {{ telegramButtonLabel }}
          </button>
        </section>

        <section class="integration-card">
          <div class="card-head">
            <div class="service-badge service-badge--whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.01.97 4.29L2 22l6-1.97C9.99 21.64 11.48 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.41 0-2.73-.35-3.88-.94l-.28-.15-2.89.94.98-2.95-.19-.3C4.5 15.13 4 13.64 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.3-12.3c-.3-.1-.99.02-1.97.38-1.45.6-2.79 1.77-3.3 3.54-.12.4-.04.83.21 1.18.25.35.65.57 1.07.57h.02c.25 0 .48.06.68.17.42.24.56.65.29 1.01-.27.36-.73.6-1.26.6-.23 0-.45-.04-.66-.13-.99-.41-1.76-1.23-2.04-2.26-.15-.55-.07-1.16.24-1.65.31-.49.84-.84 1.45-.99.61-.15 1.26-.1 1.84.14.32.14.58.38.75.68.08.14.12.3.12.46 0 .22-.05.43-.16.62-.22.38-.65.62-1.1.62-.18 0-.35-.04-.51-.11-.55-.27-.95-.84-.98-1.48" fill="currentColor"/></svg>
            </div>
            <div class="card-head__content">
              <div class="service-title-row">
                <h2 class="service-title">WhatsApp</h2>
                <span class="status-pill status-pill--inactive">Неактивен</span>
              </div>
            </div>
            <button type="button" class="toggle toggle--off" disabled aria-disabled="true">
              <span class="toggle__knob"></span>
            </button>
          </div>

          <div class="field-block">
            <label class="field-label">Номер телефона</label>
            <input v-model="whatsappPhone" type="text" class="text-input" disabled>
          </div>

          <div class="field-block">
            <label class="field-label">Идентификатор учетной записи (SID)</label>
            <input v-model="whatsappSid" type="text" class="text-input" disabled>
          </div>

          <div class="field-block">
            <label class="field-label">Токен авторизации</label>
            <input v-model="whatsappAuthToken" type="password" class="text-input" disabled>
          </div>

          <p class="field-message field-message--muted">Для интеграции с WhatsApp требуется активная учетная запись Twilio. Сейчас раздел доступен только визуально.</p>

          <button type="button" class="confirm-btn confirm-btn--disabled" disabled>Подтвердить</button>
        </section>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { connectTelegramIntegration } from '@/api/bot'

const telegramToken = ref('')
const telegramTokenTouched = ref(false)
const telegramError = ref('')
const telegramSuccess = ref('')
const isTelegramConfirmed = ref(false)
const isTelegramActive = ref(false)
const isTelegramSaving = ref(false)

const whatsappPhone = ref('+1234567890')
const whatsappSid = ref('AC...')
const whatsappAuthToken = ref('••••••••••••••••')

const telegramDefaultToken = '123456789:ABCDEF-GHIJKLMNOPQRSTUVWXYZ'
const telegramTokenPattern = /^\d{6,12}:[A-Za-z0-9_-]{20,}$/

const normalizedTelegramToken = computed(() => telegramToken.value.trim())
const telegramIsValid = computed(() => telegramTokenPattern.test(normalizedTelegramToken.value))
const telegramHasChanges = computed(() => normalizedTelegramToken.value !== telegramDefaultToken.trim())
const telegramCanSubmit = computed(() => !isTelegramSaving.value && telegramIsValid.value && telegramHasChanges.value)

const telegramConfirmationClass = computed(() => (isTelegramConfirmed.value ? 'status-pill status-pill--confirmed status-pill--confirmed-on' : 'status-pill status-pill--confirmed status-pill--confirmed-off'))
const telegramActiveClass = computed(() => (isTelegramActive.value ? 'status-pill status-pill--active' : 'status-pill status-pill--inactive'))
const telegramToggleClass = computed(() => (isTelegramActive.value ? 'toggle toggle--on' : 'toggle toggle--off'))
const telegramConfirmButtonClass = computed(() => (telegramCanSubmit.value ? 'confirm-btn confirm-btn--active' : 'confirm-btn confirm-btn--disabled'))

const markTelegramTouched = () => {
  telegramTokenTouched.value = true
  telegramError.value = ''
  telegramSuccess.value = ''
  if (isTelegramConfirmed.value) {
    isTelegramConfirmed.value = false
    isTelegramActive.value = false
  }
}

const validateTelegramToken = () => {
  if (!normalizedTelegramToken.value) return 'Введите Telegram токен'
  if (!telegramTokenPattern.test(normalizedTelegramToken.value)) return 'Некорректный Telegram токен. Проверьте формат токена BotFather.'
  return ''
}

const setTelegramActive = (nextActive: boolean) => {
  if (nextActive && !isTelegramConfirmed.value) {
    telegramError.value = 'Сначала подтвердите Telegram токен.'
    telegramSuccess.value = ''
    return
  }
  isTelegramActive.value = nextActive
}

const submitTelegramToken = async () => {
  telegramTokenTouched.value = true
  telegramSuccess.value = ''
  telegramError.value = validateTelegramToken()

  if (telegramError.value || !telegramCanSubmit.value) return

  isTelegramSaving.value = true
  try {
    const response = await connectTelegramIntegration({ token: normalizedTelegramToken.value })
    if (response?.success === false) {
      telegramError.value = response.message || 'Бекенд отклонил токен'
      isTelegramConfirmed.value = false
      isTelegramActive.value = false
      return
    }

    isTelegramConfirmed.value = true
    telegramSuccess.value = response?.message || 'Telegram успешно подтверждён'
  } catch (error) {
    console.error('Failed to connect telegram', error)
    telegramError.value = 'Не удалось подключить Telegram. Проверьте токен и попробуйте ещё раз.'
    isTelegramConfirmed.value = false
    isTelegramActive.value = false
  } finally {
    isTelegramSaving.value = false
  }
}

const telegramButtonLabel = computed(() => (isTelegramSaving.value ? 'Проверка...' : 'Подтвердить'))
</script>

<style scoped>
.page-wrap { display: flex; flex-direction: column; gap: 28px; }
.page-header { display: flex; flex-direction: column; gap: 8px; }
.page-title { font-size: 32px; line-height: 1.1; font-weight: 700; color: #42008A; }
.page-subtitle { color: #424754; font-size: 14px; line-height: 1.5; max-width: 760px; }
.cards-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.integration-card { background: rgba(139, 92, 246, 0.1); border-radius: 15px; padding: 40px 40px 32px; min-height: 376px; display: flex; flex-direction: column; }
.card-head { display: flex; align-items: flex-start; gap: 20px; }
.card-head__content { flex: 1; padding-top: 2px; }
.service-badge { width: 52px; height: 52px; border-radius: 9999px; background: #DFD1FD; display: flex; align-items: center; justify-content: center; color: #000; flex: 0 0 auto; }
.service-badge--whatsapp { color: #111827; }
.service-badge svg { width: 24px; height: 24px; }
.service-title-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 2px; }
.service-title { font-size: 20px; line-height: 1.1; font-weight: 700; color: #000; }
.status-stack { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.status-pill { display: inline-flex; align-items: center; justify-content: center; padding: 4px 12px; border-radius: 5px; font-size: 10px; line-height: 16px; white-space: nowrap; }
.status-pill--active { background: #B1FECB; color: #127336; }
.status-pill--inactive { background: #C2C6D6; color: #424754; }
.status-pill--confirmed { background: #E8E3F8; color: #42008A; }
.status-pill--confirmed-on { background: #D3F6E3; color: #127336; }
.status-pill--confirmed-off { background: #F0F0F4; color: #6B7280; }
.toggle { width: 48px; height: 24px; border-radius: 9999px; padding: 4px; display: flex; align-items: center; border: none; }
.toggle--on { background: #0058BE; justify-content: flex-end; }
.toggle--off { background: #E1E2EC; justify-content: flex-start; }
.toggle__knob { width: 16px; height: 16px; border-radius: 9999px; background: #FFFFFF; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12); }
.field-block { margin-top: 28px; }
.field-label { display: block; margin-bottom: 12px; font-size: 14px; line-height: 1.4; color: #000; }
.text-input { width: 100%; height: 40px; border: 1px solid rgba(66, 0, 138, 0.69); border-radius: 10px; padding: 0 16px; background: transparent; font-size: 14px; color: #191B23; outline: none; }
.text-input:disabled { opacity: 1; color: #6B7280; cursor: not-allowed; }
.text-input--mono { font-family: 'Liberation Mono', monospace; }
.text-input--error { border-color: #DC2626; }
.field-message { margin-top: 10px; font-size: 12px; line-height: 1.4; color: #000; }
.field-message--error { color: #B91C1C; }
.field-message--success { color: #127336; }
.field-message--muted { color: #424754; margin-top: 22px; }
.confirm-btn { width: 100%; margin-top: 24px; height: 40px; border-radius: 10px; border: 1px solid transparent; font-size: 14px; font-weight: 600; transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease; }
.confirm-btn--active { background: #42008A; color: #FFFFFF; cursor: pointer; }
.confirm-btn--active:hover { transform: translateY(-1px); }
.confirm-btn--disabled { background: #E5E7EB; color: #8B95A7; cursor: not-allowed; }
@media (max-width: 1100px) { .cards-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) {
  .page-title { font-size: 28px; }
  .integration-card { padding: 24px 18px 22px; min-height: auto; }
  .card-head { gap: 14px; }
  .service-title-row { align-items: flex-start; flex-direction: column; }
  .service-title { font-size: 18px; }
  .field-block { margin-top: 22px; }
}
</style>

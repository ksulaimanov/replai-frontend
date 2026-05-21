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
              <img src="/telegram.png" alt="Telegram" class="service-icon" />
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
              <img src="/whatsapp.png" alt="WhatsApp" class="service-icon" />
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
.card-head { display: flex; align-items: center; gap: 20px; }
.card-head__content { flex: 1; padding-top: 0; }
.service-badge { width: 52px; height: 52px; border-radius: 9999px; background: #DFD1FD; display: flex; align-items: center; justify-content: center; color: #000; flex: 0 0 auto; }
.service-badge--whatsapp { color: #111827; }
.service-badge img, .service-badge svg { width: 24px; height: 24px; object-fit: contain; }
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

/* Integration badges: replace purple backdrop with full photo icons and align with titles */
.service-badge {
  width: 96px;
  height: 96px;
  background: transparent !important;
  border-radius: 14px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}
.service-badge img.service-icon {
  width: 88px;
  height: 88px;
  object-fit: cover;
  border-radius: 14px;
  display: block;
}
.service-title-row { margin-top: 0; align-items: center; }

@media (max-width: 768px) {
  .service-badge, .service-badge img.service-icon { width: 80px; height: 80px; border-radius: 12px; }
}

</style>

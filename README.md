# replai-frontend

[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-2.x-F7D336?logo=pinia&logoColor=white)](https://pinia.vuejs.org/)

> Премиальный SPA-дашборд для управления AI-ботами, мониторинга лидов и настройки базы знаний. Дизайн-система в стиле Linear / Vercel.

---

## Особенности интерфейса

### Дизайн-система
- Шрифт **Plus Jakarta Sans** (Google Fonts) — современный, читаемый, технологичный
- Брендовая цветовая палитра `#42008A` / `#1a1523` с мягкими градиентами
- Sidebar-навигация с `cubic-bezier(0.16, 1, 0.3, 1)` — Emil Kowalski motion style (Linear/Vercel)
- Нет bounce-анимаций — только precision transitions, подходящие для B2B

### Live Lead Inbox
Входящие сообщения Telegram в реальном времени. Горячие лиды помечаются `HOT_LEAD` с пульсирующим бейджем (`noble-pulse` keyframe, scale + opacity, 2.6s). Клик на строке открывает slide-in drawer с полной историей переписки — анимация `translateX(100%)` за 300ms.

```
┌──────────────────────────────────────────────────────────────┐
│  Leads Inbox                          [HOT] · [ACTIVE]      │
├────────────────────────────────────┬─────────────────────────┤
│  +7 (912) 847-1928  · Иван М.      │  ← click → drawer      │
│  [HOT_LEAD] Хочу купить...         │  Full chat history      │
├────────────────────────────────────┤  translateX slide-in    │
│  +7 (495) 123-4567  · Анна К.      │                         │
│  [ACTIVE]  Подскажите по...        │                         │
└────────────────────────────────────┴─────────────────────────┘
```

### Null-Safety (Safe Navigation)
Бэкенд возвращает `null` для полей нового бота. Стор применяет коалесцентную нормализацию на границе входа данных:
```typescript
botConfig.name   = config.name   ?? ''
botConfig.prompt = config.prompt ?? ''
```
Исключает `TypeError: Cannot read properties of undefined (reading 'trim')` для чистой БД нового пользователя.

### Automation Dashboard
- Computed `canSave` с null-safe `.trim()` — кнопка сохранения неактивна до ввода корректных данных
- Прямой вызов `PUT /api/bot/config` без промежуточных стейт-машин

---

## Структура роутинга

```
/                    → HomeView (публичный)
/login               → LoginView
/register            → RegisterView
/verify-email        → VerifyEmailView
/dashboard           → DashboardView       ← requiresAuth
/leads               → LeadsView           ← requiresAuth
/automation          → AutomationView      ← requiresAuth
/integrations        → IntegrationsView    ← requiresAuth
/test-ai             → TestAIView          ← requiresAuth
```

Роуты с `meta: { requiresAuth: true }` защищены навигационным guard-ом — редирект на `/login` при отсутствии JWT.

---

## Локальная разработка

### Требования

- Node.js 20.x+
- npm 9+

### Установка и запуск

```bash
git clone https://github.com/ksulaimanov/replai-frontend.git
cd replai-frontend
npm install
```

Создайте `.env.local`:
```env
VITE_API_URL=http://localhost:8080
```

```bash
npm run dev          # dev-сервер на http://localhost:5173
npm run build        # production-сборка → dist/
npm run preview      # превью production-сборки
```

---

## Docker

Многоэтапная сборка: Vite-билд на `node:20-alpine` → раздача через `nginx:alpine`.

```bash
# Сборка образа
docker build \
  --build-arg VITE_API_URL=https://api.replai.app \
  -t replai-frontend:latest .

# Запуск
docker run -d -p 80:80 replai-frontend:latest
```

Nginx настроен на SPA-fallback (`try_files $uri /index.html`) — клиентский роутинг работает при прямых переходах.

Для продакшена используйте `docker-compose.yml` из корневого репозитория — `VITE_API_URL` передаётся как `build.args`.

---

## Структура проекта

```
src/
├── api/             HTTP-клиенты (Axios instances)
│   ├── http.ts      Axios + Bearer token interceptor
│   ├── auth.ts      Регистрация, логин, верификация
│   └── bot.ts       Конфиг бота, файлы, интеграции
├── stores/
│   └── auth.ts      Pinia store — JWT в localStorage
├── views/
│   ├── auth/        LoginView, RegisterView, VerifyEmailView
│   └── dashboard/   DashboardView, LeadsView, AutomationView,
│                    IntegrationsView, TestAIView
├── layouts/
│   ├── AuthLayout.vue
│   └── DashboardLayout.vue
├── components/
│   └── ToastContainer.vue
└── assets/main.css  Tailwind + Plus Jakarta Sans import
```

---

## Контакты

Email: [ksulaimanov.dev@gmail.com](mailto:ksulaimanov.dev@gmail.com) · Telegram: [@ksulaimanov](https://t.me/ksulaimanov)

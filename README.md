# replai-frontend

[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-2.x-F7D336?logo=pinia&logoColor=white)](https://pinia.vuejs.org/)

> Premium SPA dashboard for managing AI bots, monitoring leads, and configuring the Knowledge Base. Design system inspired by Linear and Vercel.

---

## Interface Highlights

### Design System
- **Plus Jakarta Sans** typeface (Google Fonts) — modern, legible, tech-forward
- Brand color palette `#42008A` / `#1a1523` with subtle gradients
- Sidebar navigation with `cubic-bezier(0.16, 1, 0.3, 1)` — Emil Kowalski motion style (Linear / Vercel)
- No bounce animations — precision transitions only, appropriate for B2B productivity dashboards

### Live Lead Inbox
Incoming Telegram messages displayed in real time. Hot leads are flagged `HOT_LEAD` with a pulsing badge (`noble-pulse` keyframe, scale + opacity, 2.6s). Clicking a row opens a slide-in drawer with full conversation history — `translateX(100%)` animation over 300ms.

```
┌──────────────────────────────────────────────────────────────┐
│  Leads Inbox                          [HOT] · [ACTIVE]      │
├────────────────────────────────────┬─────────────────────────┤
│  +7 (912) 847-1928  · Ivan M.      │  ← click → drawer      │
│  [HOT_LEAD] I want to buy...       │  Full chat history      │
├────────────────────────────────────┤  translateX slide-in    │
│  +7 (495) 123-4567  · Anna K.      │                         │
│  [ACTIVE]  Could you advise...     │                         │
└────────────────────────────────────┴─────────────────────────┘
```

### Defensive UI States & Zero-State Handlers
Defensive UI states and zero-state handlers for uninitialized databases: the backend returns `null` for fields of a newly created bot. The store applies coalescent normalization at the data-entry boundary:
```typescript
botConfig.name   = config.name   ?? ''
botConfig.prompt = config.prompt ?? ''
```
This eliminates `TypeError: Cannot read properties of undefined (reading 'trim')` for a clean database belonging to a new user.

### Automation Dashboard
- Computed `canSave` with null-safe `.trim()` — the save button remains disabled until valid data is entered
- Direct `PUT /api/bot/config` call without intermediate state machines

---

## Routing Structure

```
/                    → HomeView (public)
/login               → LoginView
/register            → RegisterView
/verify-email        → VerifyEmailView
/dashboard           → DashboardView       ← requiresAuth
/leads               → LeadsView           ← requiresAuth
/automation          → AutomationView      ← requiresAuth
/integrations        → IntegrationsView    ← requiresAuth
/test-ai             → TestAIView          ← requiresAuth
```

Routes with `meta: { requiresAuth: true }` are protected by a navigation guard — redirects to `/login` when no JWT is present.

---

## Local Development

### Prerequisites

- Node.js 20.x+
- npm 9+

### Install & Run

```bash
git clone https://github.com/ksulaimanov/replai-frontend.git
cd replai-frontend
npm install
```

Create `.env.local`:
```env
VITE_API_URL=http://localhost:8080
```

```bash
npm run dev          # dev server at http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview production build
```

---

## Docker

Multi-stage build: Vite build on `node:20-alpine` → served via `nginx:alpine`.

```bash
# Build image
docker build \
  --build-arg VITE_API_URL=https://api.replai.app \
  -t replai-frontend:latest .

# Run
docker run -d -p 80:80 replai-frontend:latest
```

Nginx is configured with SPA fallback (`try_files $uri /index.html`) — client-side routing works correctly on direct URL access.

For production use the `docker-compose.yml` from the root repository — `VITE_API_URL` is passed as `build.args`.

---

## Project Structure

```
src/
├── api/             HTTP clients (Axios instances)
│   ├── http.ts      Axios + Bearer token interceptor
│   ├── auth.ts      Registration, login, email verification
│   └── bot.ts       Bot config, files, integrations
├── stores/
│   └── auth.ts      Pinia store — JWT in localStorage
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

## Contact

Email: [ksulaimanov.dev@gmail.com](mailto:ksulaimanov.dev@gmail.com) · Telegram: [@ksulaimanov](https://t.me/ksulaimanov)

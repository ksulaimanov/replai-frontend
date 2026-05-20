# API контракт: аутентификация и подтверждение email (коротко)

Этот файл — минимально необходимый контракт между frontend (replai-frontend) и backend (Spring). Можно переслать бекендеру как техническое задание.

Формат: JSON, Content-Type: application/json
Токен: JWT в поле `token` в ответах
Фронтенд сохраняет токен в `localStorage.setItem('token', token)` и сохраняет email для верификации в `sessionStorage` под ключом `verificationEmail`.

---

## 1. Конвенции
- Все ответы в JSON.
- Поле токена: `token` (строка, JWT) если токен выдан.
- Ошибки возвращаются в формате:

```json
{
  "error": "ERROR_CODE",
  "message": "Читабельное сообщение"
}
```

Распространённые ERROR_CODE: `INVALID_CREDENTIALS`, `EMAIL_NOT_VERIFIED`, `INVALID_OR_EXPIRED_CODE`, `EMAIL_ALREADY_EXISTS`, `USER_NOT_FOUND`, `TOO_MANY_REQUESTS`, `VALIDATION_ERROR`.

- Код верификации: 6 цифр (строка или число), срок жизни: рекомендовано 10 минут.
- Повторная отправка: cooldown 60 секунд, лимит ~5 в час.

---

## 2. Эндпоинты

### A) POST /api/auth/register
- Описание: регистрация пользователя + отправка кода подтверждения на email.
- Request (application/json):

```json
{
  "companyName": "Acme Ink.",
  "email": "user@example.com",
  "password": "secret123!"
}
```

- Response: 201 Created

```json
{
  "token": "",
  "email": "user@example.com",
  "companyName": "Acme Ink."
}
```

- Важное поведение: токен не выдается до подтверждения email.

---

### B) POST /api/auth/login
- Описание: аутентификация.
- Request:

```json
{ "email": "user@example.com", "password": "secret123!" }
```

- Response (успех): 200 OK

```json
{ "token": "<JWT>", "email": "user@example.com", "companyName": "Acme" }
```

- Response (email не подтвержден): 403 Forbidden

```json
{ "error": "EMAIL_NOT_VERIFIED", "message": "Email is not verified" }
```

- Ошибки:
  - 401 Unauthorized — `INVALID_CREDENTIALS`.

---

### C) POST /api/auth/verify-email
- Описание: подтверждение email по коду; если код валидный — пометить `enabled=true` и выдать JWT.
- Request:

```json
{ "email": "user@example.com", "code": "123456" }
```

- Response (успех): 200 OK

```json
{ "token": "<JWT>", "email": "user@example.com", "companyName": "Acme" }
```

- Ошибки:
  - 400 Bad Request — `INVALID_OR_EXPIRED_CODE`.

---

### D) POST /api/auth/resend-code
- Описание: повторная отправка кода подтверждения на email.
- Request:

```json
{ "email": "user@example.com" }
```

- Response (успех): 200 OK

```json
{ "success": true, "email": "user@example.com" }
```

- Ошибки:
  - 404 Not Found — `USER_NOT_FOUND`.
  - 429 Too Many Requests — cooldown/лимиты (опционально).

---

## 3. Авторизация и заголовки
- Для защищённых эндпоинтов использовать заголовок: `Authorization: Bearer <token>`.
- Токен — JWT; полезные поля: `sub` (userId), `email`, `roles` (если применимо), `exp`.
- На фронте токен сохраняется в `localStorage`.
- В проде — обязательный HTTPS и корректный CORS (разрешить origin фронтенда, методы POST/GET/OPTIONS и заголовки `Content-Type`, `Authorization`).

---

## 4. Советы реализации (Spring)
- DTO примеры (кратко):

```java
public class RegisterRequest { String companyName; @Email String email; @Size(min=8) String password; }
public class LoginRequest { String email; String password; }
public class VerifyEmailRequest { String email; String code; }
public class ResendVerificationRequest { String email; }
```

- User entity: поля `id`, `email (unique)`, `passwordHash`, `companyName`, `emailVerified (boolean)`, `verificationCodeHash`, `verificationCodeExpiry`, `verificationAttempts`, timestamps.
- Храните хеш кода (не в явном виде) или используйте одноразовые токены — чтобы утечка БД не раскрывала коды.
- Код: TTL ~10 минут; попытки ввода кода — max 5, затем invalidate.
- Resend cooldown: 60s + limit (например 5/час).
- Логи: не логируйте пароли и коды в чистом виде.
- Для rate-limit используйте встроенные механизмы или proxy (NGINX) / Redis токен-бакет.

---

## 5. Примеры curl (для быстрой проверки API)

Регистрация:
```bash
curl -X POST https://api.example.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"companyName":"Acme","email":"user@example.com","password":"secret123"}'
```

Логин (успех):
```bash
curl -X POST https://api.example.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret123"}'
```

Подтверждение кода:
```bash
curl -X POST https://api.example.com/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","code":"123456"}'
```

Resend:
```bash
curl -X POST https://api.example.com/api/auth/resend-code \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

---

## 6. Что во фронтенде зависит от контракта
- `src/api/auth.ts` — ожидает `token`, `email`, `companyName` в ответах.
- `src/views/auth/RegisterView.vue` — после успешного `register` переходит на `/verify-email` и кладет email в `sessionStorage.verificationEmail`.
- `src/views/auth/VerifyEmailView.vue` — вызывает `/verify-email` и `/resend-code`; на успешный ответ сохраняет `token` в `localStorage` и редиректит на `/dashboard`.
- `src/views/auth/LoginView.vue` — если при логине приходит `token`, делает `localStorage.setItem('token', token)` и переходит на `/dashboard`; если приходит `EMAIL_NOT_VERIFIED`, редиректит на `/verify-email`.
- `src/router/index.ts` — guard проверяет наличие `localStorage.token` или токена в auth store для доступа к `/dashboard`.

---

## 7. Вопросы для синхронизации с бекендом (сделать выбор)
1. Выдавать ли `token` сразу на `/register` (если сразу подтверждён) или только после `/verify-email`? (Рекомендация: выдавать токен только после верификации.)
2. Формат ответа при непотверждённом email: 403 + `EMAIL_NOT_VERIFIED` (рекомендуется) или 200 + message? (Рекомендация: 403 — явный контракт.)
3. Тип `id` — UUID или Long? (Уточнить у команды; фронт поддерживает оба, но лучше согласовать.)

---

Если нужно — могу сгенерировать OpenAPI (YAML) по этому контракту или короткий skeleton контроллера для Spring Boot с DTO и заглушками методов (Register/Login/Verify/Resend). Напишите, что предпочитаете.

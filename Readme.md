# HireHub API

HireHub is a LinkedIn‑style backend API built with **Node.js, Express, Prisma, and PostgreSQL** using a **modular architecture**. Each module is standalone and contains its own routes, controllers, services, and repositories.

---

## ✨ Features (Current & Planned)

### ✅ Current

- Modular architecture (`modules/*`)
- PostgreSQL + Prisma
- User module (CRUD, public profile view)
- Auth module (register/login with JWT)

### 🚧 Planned (LinkedIn‑style)

- Profiles & resume
- Connections / follow system
- Posts, likes, comments
- Jobs module
- Messaging & notifications
- Company pages
- Search
- Saved jobs

---

## 🧱 Tech Stack

- **Node.js + Express**
- **PostgreSQL**
- **Prisma**
- **JWT Auth**
- **bcrypt**

---

## 📁 Project Structure

```
modules/
  user/
    user.routes.js
    user.controller.js
    user.service.js
    user.repository.js
    user.validation.js
  auth/
    auth.routes.js
    auth.controller.js
    auth.service.js
    auth.validation.js
middlewares/
db/
prisma/
generated/
index.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```
DATABASE_URL="postgresql://user:pass@localhost:5432/hirehub"
JWT_SECRET="your_secret"
PORT=3000
```

---

## ▶️ Install & Run

```bash
npm install
node index.js
```

---

## ✅ API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### User

- `GET /api/users`
- `GET /api/users/:id`
- `GET /api/users/:id/public`
- `PATCH /api/users/:id`
- `PATCH /api/users/:id/activate`
- `PATCH /api/users/:id/deactivate`

---

## 🔐 Example Requests

### Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mike@example.com",
    "name": "Mike Smith",
    "password": "Password123!"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mike@example.com",
    "password": "Password123!"
  }'
```

---

## 🧩 Modular Architecture (How it works)

Each module is **standalone** and contains:

- **routes** → map HTTP routes
- **controller** → request/response logic
- **service** → business logic
- **repository** → database access
- **validation** → input checks

This keeps the codebase scalable and easy to extend.

---

## ✅ Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

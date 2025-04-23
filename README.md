# 🎶 JaMoveo (Band App)

JaMoveo is a modern full-stack web application designed to empower music bands and rehearsal groups with real-time coordination and performance flow. Built with React (TS) and NestJS, the platform allows users to log in by role (admin, singer, player), join live rehearsals, and follow synchronized song lyrics and chords.

Fully responsive, accessible, and powered by WebSockets, JaMoveo brings a studio-quality experience to any device — from mobile to desktop.

---

## 📚 Table of Contents

- 🚀 Features
- 🛠 Tech Stack
- 🔐 Authentication & Authorization
- 🧪 Live Rehearsal Flow
- 📦 API Overview (Example)
- 🧰 Getting Started + .env variables
- 🌐 Deployment Links
- 🧩 Folder Structure
- 🧠 Roadmap & Future Enhancements
- 🤝 Contributing
- 📄 License

---

## 🚀 Features

- 🔐 JWT Authentication with Role-Based Access (Admin, Player, Singer)
- 🎼 Real-Time Song Broadcasting via WebSocket (select + quit song)
- 👓 Role-aware UI:
  - Admins: search and select songs
  - Players: see lyrics + chords
  - Singers: see lyrics only
- 💬 Dynamic Live Song Page with auto-scroll + RTL/LTR detection
- 📱 Fully responsive for desktop and mobile with modern Material UI design
- 🌍 Internationalization & RTL-ready (Hebrew/English)
- 🎥 PWA-compatible (installable app experience)
- 🎛️ Modular, testable code with strict schema validation
- 📑 Clean architecture with reusable components and custom hooks

---

## 🛠 Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | React + TypeScript + Sass + Material UI          |
| Backend     | NestJS + TypeORM + PostgreSQL                    |
| Auth        | JWT + Role Guards + Decorators                   |
| Realtime    | WebSocket (Socket.IO) with Gateway Architecture  |
| Deployment  | Vercel (frontend), Render (backend)              |
| Dev Tools   | ESLint, Zod, React Hook Form, React Router       |

---

## 🔐 Authentication & Authorization

- Role-based access control (RBAC) system using JWT tokens
- Backend endpoints protected using NestJS Guards + Roles decorators
- Frontend persists session via AuthContext (state-based, not localStorage)
- Form validation via Zod schemas with live hints and error feedback
- Register & login flows for both users and admins with shared components

---

## 🧪 Live Rehearsal Flow (Real-Time UX)

- Admin selects a song → broadcast to all connected users (via socket)
- Users dynamically transition to the LivePage with the song rendered
- Singers see lyrics only; players see lyrics + chords
- Auto-scroll toggle allows hands-free scrolling
- Admin has exclusive "Quit" button → resets all sessions

---

## 📦 API Overview

Example: Register a user

POST /auth/register

Request:

```json
{
  "username": "ori",
  "password": "StrongPass123!",
  "instrument": "drums",
  "role": "player"
}

Response:

{
  "user": {
    "id": "c83f...",
    "username": "ori",
    "instrument": "drums",
    "role": "player"
  },
  "token": "eyJhbGci..."
}
```

Other endpoints:
	•	POST /auth/login
	•	GET /songs
	•	POST /socket/select-song
	•	POST /socket/quit

---

## 📦 API Overview
🧰 Getting Started (Local Dev)
	1.	Clone the repo:

git clone https://github.com/your-username/band-app.git
cd band-app

	2.	Install dependencies:

Frontend:

cd frontend
npm install
npm run start

Backend:

cd backend
npm install
npm run start:dev

	3.	Environment variables:

### .env Backend Example - 

PORT=3000
NODE_ENV=development
JWT_SECRET=supersecretkey123!
JWT_EXPIRES_IN=1d
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/jamoveo_db
CORS_ORIGINS=http://localhost:3001,https://jamoveo-two.vercel.app
SOCKET_NAMESPACE=/socket

### .env Frontend Example: 
REACT_APP_API_BASE_URL=http://localhost:3000

🌐 Deployment Links
	•	Frontend (Vercel): https://jamoveo-two.vercel.app
	•	Backend (Render): https://jamoveo-backend-6fk6.onrender.com

Test user & admin flows directly — no extra setup required.


🧩 Folder Structure

band-app/
├── frontend/                # React app (pages, components, assets, contexts)
│   ├── pages/
│   ├── components/
│   ├── schemas/
│   ├── services/
│   └── assets/
├── backend/                 # NestJS app (modules, DTOs, WebSocket Gateway)
│   ├── auth/
│   ├── user/
│   ├── song/
│   ├── sockets/
│   └── main.ts
└── README.md

🧠 Roadmap & Future Enhancements
	•	✅ Admin + User Register/Login flows
	•	✅ Real-time socket connection for live lyrics
	•	✅ Role-based UI rendering
	•	⏳ Admin Dashboard UX polish (search, filters)
	•	⏳ Add loading states / fallback screens
	•	⏳ Song metadata editing support
	•	🧠 Future AI: recommend song key or tempo based on instrument
	•	🌎 Full i18n integration
	•	💬 Real-time messaging between band members (future)

## 🤝 Contributing

Contributions welcome! Please fork the repo and submit a pull request.

If you’re testing UX or socket behavior, clone the frontend in two tabs or mobile + desktop for full experience.

## 📄 License

MIT © 2025 Ori Kanner
Built for the a band challenge 🎸🎹🎤

Let me know if you want:
- A matching about.md or /landing route for presentation
- Deployment + scaling notes
- A "Demo Admin Credentials" box or DB seed example

Happy to help polish this to portfolio level!
# 🎶 JaMoveo

JaMoveo is a modern web application for coordinating musical rehearsals, built for bands and musicians.  
Players and singers can join live rehearsal sessions, follow song lyrics or chords, and enjoy a connected jam experience — all from their phone.

---

## 🚀 Tech Stack

- 🔷 Frontend: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Sass](https://sass-lang.com/) + [Material UI](https://mui.com/)
- 🟨 Backend: [NestJS](https://nestjs.com/)
- 🔐 Auth: JWT-based role authentication (Admin, Singer, Player)
- 🌐 Realtime: WebSocket (planned)
- ☁️ Deployment: Vercel (frontend), Render (backend)
- 📦 Monorepo: frontend + backend organized in one repo

---

## 🧱 Monorepo Structure

band_app/
├── frontend/       # React app (CRA + TypeScript + Sass + MUI)
├── backend/        # NestJS app (auth, sessions, API)
├── README.md       # You are here
├── .gitignore
└── package.json

🌐 Deployment
✅ Frontend: Vercel
•	Root directory: frontend
•	Build command: npm run build
•	Output directory: build
✅ Backend: Render
•	Root directory: backend
•	Start command: npm run start:prod
•	Build command: npm install && npm run build

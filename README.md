# Premium Developer Portfolio

A modern full-stack developer portfolio built with React, Vite, Tailwind CSS, Framer Motion, Express, MongoDB, and JWT authentication.

## Features
- Dark mode by default
- Glassmorphism UI with gradient accents
- Smooth animations and hover effects
- Responsive design for mobile, tablet, desktop
- Contact form connected to backend API
- Admin dashboard for managing projects and messages
- Cloudinary file upload support
- SEO-friendly metadata and lazy loading

## Tech Stack
- Frontend: React + Vite
- Styling: Tailwind CSS
- Animations: Framer Motion
- Icons: Lucide React
- Backend: Node.js + Express
- Database: MongoDB

## Setup
1. Copy `.env.example` to `.env` in the root, `server/.env`, and `client/.env`.
2. Configure `MONGO_URI`, `JWT_SECRET`, and optional `CLOUDINARY_URL` in `server/.env`, and set `VITE_API_URL` in `client/.env`.
3. Install dependencies:
   ```bash
   npm run install:all
   ```
4. Start both frontend and backend:
   ```bash
   npm run dev
   ```
5. Open the app at `http://localhost:5173`.

## Backend
- API base: `http://localhost:5000/api`
- Admin login route: `POST /api/auth/login`
- Contact route: `POST /api/contact`
- Project management routes: `GET /api/projects`, `POST /api/projects`, `PUT /api/projects/:id`, `DELETE /api/projects/:id`
- Message management routes: `GET /api/messages`, `DELETE /api/messages/:id`

## Deployment
- Build frontend with `npm run build --prefix client`
- Serve `client/dist` with a static server or CDN
- Deploy backend to a Node-compatible host with `server/index.js`
- Set environment variables on deployment

## Seed data
From `server`:
```bash
npm run seed
```

## Folder structure
- `client/`: React frontend
- `server/`: Express backend

## Notes
- Use the `Admin Dashboard` route under `/admin` after login.
- Use the contact form to store messages in MongoDB.

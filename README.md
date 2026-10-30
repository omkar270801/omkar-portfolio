# Premium Developer Portfolio

A modern full-stack developer portfolio built with React, Vite, Tailwind CSS, Framer Motion, Express, MongoDB, and JWT authentication.

## Features
- Dark mode by default
- Glassmorphism UI with gradient accents
- Smooth animations and hover effects
- Responsive design for mobile, tablet, desktop
- Contact form connected to backend API
- Admin dashboard for managing portfolio content, projects, experience, achievements, and messages
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
1. Copy `.env.example` to `.env` in the repository root.
2. Set `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`. Cloudinary settings are needed for production image uploads.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start both frontend and backend:
   ```bash
   npm run dev
   ```
5. Open the app at `http://localhost:5174`.

> Optional: if you want a custom local host name, add this to your Windows hosts file (`C:\Windows\System32\drivers\etc\hosts`):
>
> ```text
> 127.0.0.1 omkarchandorkar-portfolio.local
> ```
>
> Then you can open:
>
> ```text
> http://omkarchandorkar-portfolio.local:5174
> ```

## Backend
- Local API base: `http://localhost:5001/api`
- Admin login route: `POST /api/auth/login`
- Contact route: `POST /api/contact`
- Project management routes: `GET /api/projects`, `POST /api/projects`, `PUT /api/projects/:id`, `DELETE /api/projects/:id`
- Message management routes: `GET /api/messages`, `DELETE /api/messages/:id`

## Deployment
### Deploy frontend and backend together to Vercel
1. Push this repository to GitHub and import it into Vercel. Keep the project root set to the repository root.
2. Keep the Vercel project root set to the repository root (`./`). The root package installs the frontend build and backend runtime dependencies; it is intentionally not an npm workspace so Vercel builds one project. `vercel.json` disables framework auto-detection, builds the Vite frontend from `client/`, and routes `/api/*` requests through the Express serverless function in `api/[...path].js`.
3. Add these environment variables in **Vercel → Project → Settings → Environment Variables** for Production (and Preview if needed):
   - `MONGO_URI`: a MongoDB Atlas connection string. Allow Vercel to connect to the Atlas cluster in its Network Access settings.
   - `JWT_SECRET`: a long, unique, randomly generated secret.
   - `ADMIN_EMAIL`: the admin account email.
   - `ADMIN_PASSWORD`: a strong, unique admin password.
   - `CLOUDINARY_URL`: required for admin image uploads in production.
   - `CLIENT_ORIGIN`: optional for the production site origin, for example `https://your-site.vercel.app`.
4. Deploy. The frontend calls the API at `/api` on the same Vercel domain, so no `VITE_API_URL` is needed for production.
5. On the first API request, the server connects to MongoDB and creates the admin account if it does not exist. Sign in at `/login`.
6. Confirm the deployment is responding at `/api/health`.

Never commit real environment values. If an example password was ever used as a real credential, change it before deployment.

## Seed data
From `server`:
```bash
npm run seed
```

Make sure `server/.env` contains `ADMIN_EMAIL` and `ADMIN_PASSWORD` before running seed. The login route uses those credentials to create or update the admin user.

## Folder structure
- `client/`: React frontend
- `server/`: Express backend

## Notes
- Use the `Admin Dashboard` route under `/admin` after login to edit projects, technical skills, career timeline, achievements, and messages.
- Use the contact form to store messages in MongoDB.

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
### Deploy frontend and API as two Vercel projects
Create two Vercel projects from the same GitHub repository. Set each project's **Root Directory** to its subfolder:

1. **Frontend project:** set Root Directory to `client`, Framework Preset to Vite, Build Command to `npm run build`, and Output Directory to `dist`. Add `VITE_API_URL` as an environment variable with the API project's URL ending in `/api` (for example, `https://your-api.vercel.app/api`).
2. **API project:** set Root Directory to `server` and Framework Preset to Express (or Auto-detect). Leave Build Command and Output Directory unset. Vercel detects the exported Express app in `index.js`; do not set `dist` as its output directory.
3. Add these environment variables to the **API project** in **Vercel → Settings → Environment Variables** for Production (and Preview if needed):
   - `MONGO_URI`: a MongoDB Atlas connection string. Allow Vercel to connect to the Atlas cluster in its Network Access settings.
   - `JWT_SECRET`: a long, unique, randomly generated secret.
   - `ADMIN_EMAIL`: the admin account email.
   - `ADMIN_PASSWORD`: a strong, unique admin password.
   - `CLOUDINARY_URL`: required for admin image uploads in production.
   - `CLIENT_ORIGIN`: optional; set this to the frontend project's origin.
4. Deploy the API, set `VITE_API_URL` on the frontend project to the API deployment URL plus `/api`, then redeploy the frontend so Vite includes that URL in the build.
5. On the first API request, the server connects to MongoDB and creates the admin account if it does not exist. Sign in at the frontend project's `/login`.
6. Confirm the API is responding at `/api/health` on the API project's domain.

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

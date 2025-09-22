## Patang Omniverse — Unified Client + Server

This repository contains both the frontend (Vite + React + Tailwind) and backend (Express + TypeScript) in one project. The backend mounts Vite in middleware mode in development, so a single command runs everything on one port. In production, the backend serves the static client build.

### Structure

- `client/` — Frontend (Vite + React)
- `server/` — Backend (Express API + dev integration with Vite)
- `shared/` — Shared schema/types
- `vite.config.ts` — Vite config (root=`client`, build output=`dist/public`)
- `package.json` — Root scripts to develop and run production

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm (or yarn/pnpm)

### Environment variables

Set these before starting:

- `DATABASE_URL` — PostgreSQL connection string
- `ANTHROPIC_API_KEY` — Anthropic API key (optional if not using AI features)
- `SESSION_SECRET` — Optional; server auto-generates if absent
- `PORT` — Optional; defaults to 3000

Windows PowerShell example:

```powershell
$env:DATABASE_URL="postgresql://user:password@localhost:5432/dbname"; $env:ANTHROPIC_API_KEY="your-anthropic-key"; npm run dev
```

### Development

Install deps and start both parts with one command (split mode by default):

```bash
npm install
npm run dev
```

This starts:
- Backend API on http://localhost:3000
- Frontend Vite dev server on http://localhost:5173 (auto-proxies `/api` → `http://localhost:3000` using `client/vite.proxy.json`)

Open:

- http://localhost:5173

Alternative (single-process mode using Vite middleware inside Express):

```bash
npm run dev:single
```

Open:

- http://localhost:3000

### Production

Build the client and the server bundle, then start the server:

```bash
npm run build
npm run start
```

Open:

- http://localhost:3000 (or the `PORT` you set)

### Scripts

- `dev` — Run backend and frontend together (split mode) with proxying
- `dev:single` — Single-process mode (Express + Vite middleware on one port)
- `build` — Build client to `dist/public` and bundle server to `dist/index.js`
- `start` — Start the production server from `dist/index.js`

### Troubleshooting

- Port in use: set a different port via `PORT` (PowerShell: `$env:PORT="3001"; npm run dev`).
- Stop stuck Node processes on Windows: `taskkill /f /im node.exe`.
- If browserslist is out of date, run: `npx update-browserslist-db@latest`.



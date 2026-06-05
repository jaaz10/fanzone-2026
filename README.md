# FanZone 2026

A demo web app for finding and registering for World Cup 2026 viewing parties. Built to match the FanZone 2026 scrum board.

## Features

- **Homepage** — Browse upcoming viewing parties
- **Filter by city** — Find events near you
- **Login & Sign Up** — User authentication with JWT
- **Event registration** — Register for a viewing party
- **My Registrations** — Edit or cancel your registrations
- **Contact organizer** — Messages saved to the database

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** SQLite
- **Hosting:** GitHub Pages (frontend) + Render (backend API)

## Run Locally

Install backend dependencies and start the server (serves both API and frontend):

```bash
cd server
npm install
npm start
```

Open http://localhost:3000

## Deploy Backend (Render)

**Fastest way — use the Blueprint:**

1. Log in at [render.com](https://render.com) (GitHub login works)
2. Open: https://dashboard.render.com/blueprint/new?repo=https://github.com/jaaz10/fanzone-2026
3. Click **Apply** — Render reads `render.yaml` and sets everything up
4. Wait ~2–3 min for the deploy to finish
5. Copy your service URL (should be `https://fanzone-2026-api.onrender.com`)
6. Test: `https://fanzone-2026-api.onrender.com/api/health` should return `{"ok":true}`

If your Render URL is different, update line 16 in `js/config.js` and push to GitHub.

## Deploy Frontend (GitHub Pages)

Settings → Pages → Deploy from branch `main` → `/ (root)`

Live site: https://jaaz10.github.io/fanzone-2026/

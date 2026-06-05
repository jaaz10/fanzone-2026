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

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your `fanzone-2026` repo
4. Set **Root Directory** to `server`
5. Build: `npm install` · Start: `npm start`
6. Add env var `JWT_SECRET` (any random string)
7. After deploy, update the API URL in `js/config.js` if your Render URL differs

## Deploy Frontend (GitHub Pages)

Settings → Pages → Deploy from branch `main` → `/ (root)`

Live site: https://jaaz10.github.io/fanzone-2026/

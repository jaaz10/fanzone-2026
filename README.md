# FanZone 2026

**Course project** — A full-stack web app for finding and registering for World Cup 2026 viewing parties.

**Live demo**
- Frontend: https://jaaz10.github.io/fanzone-2026/
- Backend API: https://fanzone-2026-api.onrender.com/api/health

## Project overview

Users can browse viewing parties, filter by city, create an account, register for events, manage registrations, and contact organizers. The frontend is hosted on GitHub Pages; the backend API and database run on Render.

## Features (scrum board)

| Sprint | Deliverable |
|--------|-------------|
| Sprint 1 | Homepage, server setup, database design, GitHub repo |
| Sprint 2 | Auth, event list, city filter, registration form, contact form |
| Sprint 3 | Edit/cancel registration, bug fixes, deployment |

## Tech stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** JSON file store (`server/data/`)
- **Auth:** JWT + bcrypt
- **Hosting:** GitHub Pages + Render

## Run locally

```bash
cd server
npm install
npm start
```

Open http://localhost:3000

## Project structure

```
fanzone-2026/
├── index.html, login.html, signup.html, ...   # Frontend pages
├── js/                                        # API client & auth
├── server/                                    # Express backend
│   ├── routes/                                # Auth, parties, registrations, contact
│   └── store.js                               # Database layer
├── QA-CHECKLIST.md                            # Pre-demo testing checklist
└── render.yaml                                # Render deployment config
```

## QA

See [QA-CHECKLIST.md](QA-CHECKLIST.md) for the full pre-demo test plan (37 test cases).



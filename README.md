# FanZone 2026

A simple demo web app for finding and registering for World Cup 2026 viewing parties. Built to match the FanZone 2026 scrum board.

## Features

- **Homepage** — Browse upcoming viewing parties
- **Filter by city** — Find events near you
- **Login & Sign Up** — User accounts (stored in browser localStorage)
- **Event registration** — Register for a viewing party
- **My Registrations** — Edit or cancel your registrations
- **Contact organizer** — Send a message to event organizers

## Run Locally

Open `index.html` in your browser, or use a simple server:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `fanzone-2026`)
2. Push this project:

```bash
git init
git add .
git commit -m "FanZone 2026 demo app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fanzone-2026.git
git push -u origin main
```

3. On GitHub, go to **Settings → Pages**
4. Under **Source**, select **Deploy from a branch**
5. Choose branch `main` and folder `/ (root)`
6. Click **Save**

Your site will be live at `https://YOUR_USERNAME.github.io/fanzone-2026/`

## Demo Notes

This is a frontend-only demo. User accounts and registrations are saved in your browser's localStorage — no real backend or database.

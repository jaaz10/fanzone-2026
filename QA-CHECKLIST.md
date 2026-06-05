# FanZone 2026 — QA Checklist

Checklist before your final demo. Test on the **live site**:

- **Frontend:** https://jaaz10.github.io/fanzone-2026/
- **Backend:** https://fanzone-2026-api.onrender.com/api/health

**Tester:** _______________  
**Date:** _______________  
**Result:** ___ / 37 passed

---

## Pre-demo setup

| # | Test | Steps | Expected result | Pass? |
|---|------|-------|-----------------|-------|
| 1 | API is awake | Open `/api/health` in browser | `{"ok":true,"service":"fanzone-2026-api"}` | ☐ |
| 2 | Frontend loads | Open GitHub Pages URL | Homepage loads, no broken layout | ☐ |
| 3 | Events load | Wait on homepage 30–60 sec if needed | Viewing parties appear (not error message) | ☐ |
| 4 | Fresh browser | Use incognito/private window | Clean test, no old login data | ☐ |

> **Note:** Render free tier sleeps after ~15 min. Wake the API first so the demo doesn't stall.

---

## Homepage & events

| # | Test | Steps | Expected result | Pass? |
|---|------|-------|-----------------|-------|
| 5 | Display viewing parties | Load homepage | 6 events show with title, city, venue, date | ☐ |
| 6 | Filter by city | Select **Los Angeles** | Only LA events show | ☐ |
| 7 | Filter all cities | Select **All Cities** | All events show again | ☐ |
| 8 | Empty filter | Select a city with no events (if any) | "No viewing parties found" message | ☐ |
| 9 | Register button | Click **Register** on an event (logged out) | Redirects to login page | ☐ |

---

## User authentication

| # | Test | Steps | Expected result | Pass? |
|---|------|-------|-----------------|-------|
| 10 | Sign up | Create account with new email | Account created, redirected to homepage | ☐ |
| 11 | Nav updates | After login | Shows "Hi, [name]", Login/Sign Up hidden | ☐ |
| 12 | Logout | Click **Logout** | Returns to homepage, logged out state | ☐ |
| 13 | Login | Log in with same account | Success, nav shows user name | ☐ |
| 14 | Bad password | Wrong password on login | Error: "Invalid email or password" | ☐ |
| 15 | Duplicate signup | Sign up with same email again | Error: account already exists | ☐ |

---

## Event registration

| # | Test | Steps | Expected result | Pass? |
|---|------|-------|-----------------|-------|
| 16 | Open registration form | Logged in → click **Register** on event | Event details + form show | ☐ |
| 17 | Submit registration | Fill guests, phone, notes → Submit | Success message, redirect to My Registrations | ☐ |
| 18 | Registration appears | Check My Registrations | Event listed with correct details | ☐ |
| 19 | Duplicate registration | Try registering for same event again | Error: already registered | ☐ |
| 20 | Required fields | Submit with empty phone | Form blocks submission | ☐ |

---

## Edit / cancel registration

| # | Test | Steps | Expected result | Pass? |
|---|------|-------|-----------------|-------|
| 21 | Edit registration | Click **Edit** → change guests/phone/notes | "Registration updated" message | ☐ |
| 22 | Changes saved | Refresh page | Updated info still shows | ☐ |
| 23 | Invalid guests | Edit with 0 or 5 guests | Error message | ☐ |
| 24 | Cancel registration | Click **Cancel** → confirm | Registration removed from list | ☐ |
| 25 | Empty state | Cancel all registrations | "You haven't registered…" + Browse Events button | ☐ |

---

## Contact organizer

| # | Test | Steps | Expected result | Pass? |
|---|------|-------|-----------------|-------|
| 26 | Contact form loads | Go to Contact page | Form shows with event dropdown | ☐ |
| 27 | Auto-fill (logged in) | Visit while logged in | Name and email pre-filled | ☐ |
| 28 | Send message | Fill form → Send | Success: "Message sent to organizers" | ☐ |
| 29 | Required fields | Submit empty message | Form blocks submission | ☐ |
| 30 | General inquiry | Leave event as "General inquiry" → send | Message sends successfully | ☐ |

---

## Navigation & UI

| # | Test | Steps | Expected result | Pass? |
|---|------|-------|-----------------|-------|
| 31 | Logo link | Click **FanZone 2026** logo | Returns to homepage | ☐ |
| 32 | All nav links | Click Events, My Registrations, Contact | Each page loads correctly | ☐ |
| 33 | Mobile layout | Resize browser or use phone | Layout readable, no overlap | ☐ |
| 34 | Auth-gated pages | Visit My Registrations while logged out | Redirects to login | ☐ |

---

## Backend & data persistence

| # | Test | Steps | Expected result | Pass? |
|---|------|-------|-----------------|-------|
| 35 | Data persists | Register → log out → log back in | Registration still there | ☐ |
| 36 | API health after actions | Hit `/api/health` after testing | Still returns `ok: true` | ☐ |
| 37 | Cross-session | Close browser → reopen → log in | Account and data still work | ☐ |

---

## Demo-day checklist (5 min before presenting)

- ☐ Open API health URL — wake up Render
- ☐ Open GitHub Pages site — confirm events load
- ☐ Log in with a **demo account** you created earlier
- ☐ Have one registration already saved (for edit/cancel demo)
- ☐ Use incognito as backup if something breaks
- ☐ Know your demo flow: **Home → Filter → Sign up → Register → My Registrations → Contact**

---

## Known limitations (fine to mention in presentation)

- Render free tier has cold starts (~30–60 sec after sleep)
- Demo database resets if Render redeploys (JSON file on ephemeral disk)
- No real email sending for contact form (saved to DB only)
- Passwords are demo-grade, not production security

---

## Issues found

| # | Test | Issue | Severity (Low/Med/High) |
|---|------|-------|-------------------------|
| | | | |
| | | | |
| | | | |

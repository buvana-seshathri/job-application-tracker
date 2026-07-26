# 🎯 Job Tracker

A gamified job application tracker that replaces the "job search Excel sheet" with a
small full-stack app that tracks applications, networking reachout, and celebrates
progress along the way.

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS + Recharts
- **Backend:** Node.js + Express
- **Database:** SQLite (a single file, no server setup needed)

## Features

- **Dashboard**: stat cards (total, active pipeline, offers, response rate, etc.),
  a category breakdown pie chart, a status bar chart, a 4-week activity heatmap,
  and achievement badges.
- **Applications**: add, filter (by company/role/category/status), and advance
  applications through stages: Submitted → Callback → Interviewing → Offer (or Rejected).
- **Networking**: log LinkedIn reachouts and track your response rate.
- **Gamification**: sound effects, a confetti celebration modal on stage advances,
  and daily/streak achievement badges.

## Project Structure

```
job-tracker/
├── backend/
│   ├── db.js              # creates the SQLite tables on startup
│   ├── applications.js    # CRUD routes for job applications
│   ├── reachouts.js       # CRUD routes for LinkedIn reachouts
│   ├── server.js          # Express app entry point
│   └── tracker.db         # auto-created SQLite database (gitignored)
│
└── frontend/
    └── src/
        ├── main.jsx
        ├── App.jsx                 # top-level state + tab routing
        ├── index.css
        ├── utils/
        │   └── sounds.js           # Web Audio API sound effects
        └── components/
            ├── Tabs.jsx
            ├── Dashboard.jsx
            ├── StatCards.jsx
            ├── CategoryPieChart.jsx
            ├── StatusBarChart.jsx
            ├── ActivityHeatmap.jsx
            ├── Badges.jsx
            ├── ApplicationsPage.jsx
            ├── AddForm.jsx
            ├── FilterBar.jsx
            ├── ApplicationList.jsx
            ├── ApplicationCard.jsx
            ├── StatusProgress.jsx
            ├── ReachoutsPage.jsx
            ├── ReachoutForm.jsx
            ├── ReachoutList.jsx
            ├── ReachoutChart.jsx
            ├── Toast.jsx
            └── CelebrationModal.jsx
```

## Running Locally

**Backend:**
```bash
cd backend
npm install
npm start
```
Runs on `http://localhost:3001`.

**Frontend** (in a separate terminal):
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173` (Vite's default).

Both need to be running at the same time - the frontend talks to the backend
over `fetch()` calls to `http://localhost:3001/api/...`.

## Database

Two tables, created automatically the first time the backend starts:

**applications**: id, company, role, category, status, referral, applied_date,
status_updated_at, notes

**linkedin_reachouts**: id, person_name, company, got_response, reached_out_date

No migrations needed at this scale, `tracker.db` is just a local file. Delete it
and restart the backend if you want a clean slate.

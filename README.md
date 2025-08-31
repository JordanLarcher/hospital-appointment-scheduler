# Hospital Scheduler

## Overview

The **Hospital Scheduler** A full-stack app for hospital bookings using Node.js, Express.js, React (Vite), PostgreSQL, Redis, and Kafka. Features: JWT auth, symptom-based recommendations, event-driven notifications, and CI/CD with GitHub Actions.
## Setup
1. Clone: `git clone <url>`
2. Install: `npm install` & `cd client && npm install`
3. Setup DB/Redis/Kafka: `docker-compose up`
4. Configure `.env` (DB, JWT, Kafka, etc.)
5. Run scripts: `psql -f scripts/init.sql` & `seed.sql`
6. Start backend: `node server.js`
7. Start consumer: `node src/utils/kafkaConsumer.js`
8. Start frontend: `cd client && npm run dev`
9. Tests: `npm test` (unit) & `npx playwright test` (UI)
10. CI/CD: Push to GitHub; pipeline tests/builds/deploys to Render.

## Features
- Secure auth with custom JWT and refresh tokens.
- Appointment booking with conflict resolution.
- Kafka for asynchronous notifications; Redis for caching.
- CI/CD pipeline: Lints, tests, builds, deploys automatically.
- Responsive UI with Tailwind; robust tests with Playwright/Cucumber.


## Client Project Structure
```
hospital-scheduler/
  ├── client/  
  │   ├── src/
  │   │   ├── assets/              # For static assets
  │   │   ├── components/          # React components
  │   │   ├── App.jsx              # Main application component
  │   │   ├── main.jsx             # Entry point for React
  │   │   └── index.css            # Global styles
  │   ├── index.html                # Main HTML file
  │   ├── package.json              # Client dependencies and scripts
  │   ├── vite.config.js            # Vite configuration file
  │   └── tailwind.config.js        # Tailwind CSS configuration
  ├── src/                         # Backend files (unchanged)
  ├── features/                    # Cucumber features (unchanged)
  ├── pages/                       # Playwright Page Object Model (unchanged)
  ├── scripts/                     # Database scripts (unchanged)
  ├── server.js                    # Backend entry point (unchanged)
  ├── package.json                 # Root dependencies and scripts
  └── .env                         # Environment variables
```


## Server Project Structure

```

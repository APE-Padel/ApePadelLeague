# APE Padel League — Monorepo

> **Monorepo containing frontend and backend for the APE Padel League web platform (API + web UI).**

---

## Table of contents

1. [Project overview](#project-overview)
2. [Monorepo structure](#monorepo-structure)
3. [Quick start](#quick-start)
4. [API Documentation](#api-documentation)
5. [Functional requirements](#functional-requirements)
6. [Technical requirements](#technical-requirements)
7. [API surface / endpoints (suggested)](#api-surface--endpoints-suggested)
8. [Database schemas](#database-schemas)
9. [Deployment](#deployment)

---

## Project overview

APE Padel League web platform is a monorepo that contains two main projects:

* `backend/` — Node.js + Express API that exposes endpoints to manage the league data (matches, teams, players, seasons, users, results).
* `frontend/` — Web client (frontend framework to be decided) to show: landing page, match calendar/results, standings table, and an admin interface for entering results.

---

## Monorepo structure

```
/ (root)
├─ README.md                
├─ backend/
│  ├─ package.json
│  ├─ controllers/
│  ├─ data/
│  ├─ .gitignore
│  ├─ server.js
│  ├─ routes.js
│  └─ middleware.js
└─ frontend/
```

---

## Quick start (developer)

**Prerequisites**: Node.js v24.12.0 pnpm/yarn/npm

1. Clone the repo
2. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

3. Create `.env` files for `backend/` and `frontend/` following .env.example
4. Run backend in dev:

```bash
cd backend
npm run dev
```

5. Run frontend in dev:

```bash
cd frontend
npm run dev
```

6. Access the applications:
   - Backend API: http://localhost:3000
   - Frontend: http://localhost:3001 (or next available port)
   - API Documentation (Swagger): http://localhost:3000/api-docs

---

## API Documentation

The backend API includes interactive Swagger documentation powered by `swagger-ui-express` and `swagger-jsdoc`.

**Access Swagger UI**: http://localhost:3000/api-docs

The documentation provides:
- Complete API endpoint reference
- Request/response schemas
- Interactive "Try it out" functionality
- Example payloads

### Available Endpoints

**Seasons**
- `POST /seasons` - Create a new season

**Teams**
- `GET /teams` - Get all teams
- `POST /teams` - Create a new team

**Matches**
- `GET /seasons/active/matches` - Get matches for the active season
- `POST /matches` - Create a new match

---

## Functional requirements

The application must provide the following user-facing features:

* **Homepage / Landing page**

  * Overview of APE Padel League: short description, contact and links to other pages.

* **Calendar / Matches page**

  * Show a calendar or list of scheduled matches by date.
  * Allow filtering by season, team, date range.
  * Display match details: teams/players, time, score (when available), match status (scheduled / live / finished).

* **Standings / Classification page**

  * Show table with teams (or pairings) ranked with standard metrics.  

* **Admin page**

  * Authentication-protected admin UI to enter match results.

* **Public API**

  * Provide read endpoints for public consumption (e.g., `/matches`, `/standings`, `/teams`, `/players`) and protected endpoints for admin operations (POST/PUT results).

---

## Technical requirements

* Backend implemented with **Node.js + Express** (RESTful API).
* Use a **NoSQL** database??? MongoDB???
* Authentication using **JWT**???
* Environment-based configuration and secrets management (use `.env` and recommend secret stores for production).

---

## API surface / endpoints (suggested)

> These are example REST endpoints — adapt as needed and keep an OpenAPI spec.

### Public / read endpoints

* `GET /api/health` — health check

### Admin / protected endpoints

* `POST /api/auth/login` — obtain JWT

---

## Database schemas

### Users

```json
{
  "_id": "ObjectId"
}
```

### Players

```json
{
  "_id": "ObjectId"
}
```

### Teams

```json
{
  "_id": "ObjectId"
}
```

### Seasons

```json
{
  "_id": "ObjectId"
}
```

### Matches

```json
{
  "_id": "ObjectId"
}
```

---

## Deployment

---

## Contact

For questions about the repo structure or architecture, contact the project maintainers.

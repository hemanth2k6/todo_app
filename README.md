# Full-Stack Todo App (React + Express + PostgreSQL)

Production-ready Todo app with JWT authentication and user-specific todos.

## Project Structure

```text
full/
  src/                         # Frontend (React + React Router + Axios)
    components/
    context/
    hooks/
    pages/
    services/
    constants/
  backend/                     # Backend (Express + PostgreSQL + JWT)
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
    sql/
      schema.sql
    .env.example
  .env.example
```

## Setup

1. Install root/frontend dependencies:
   - `npm install`
2. Install backend dependencies:
   - `cd backend && npm install`
3. Create env files:
   - `cp .env.example .env`
   - `cp backend/.env.example backend/.env`
4. Create PostgreSQL database (example name: `todo_app`).
5. Run schema:
   - `psql -U postgres -d todo_app -f backend/sql/schema.sql`

## Run

- Frontend only: `npm run dev`
- Backend only: `npm run dev:backend`
- Both together: `npm run dev:fullstack`

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# todo_app
# todo_app
# todo_app

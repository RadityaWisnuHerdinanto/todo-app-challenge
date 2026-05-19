# CLAUDE.md

## Project Overview

This project is a coding challenge submission for Turboly.

The application is a full-stack task management web app where users can:
- Register/login/logout
- Create tasks
- Set due dates and priorities
- View all tasks
- Mark tasks as completed
- Sort tasks by due date, description, and priority
- Receive alerts for tasks due today

The project must be:
- Production-ready
- Maintainable
- Secure
- Responsive/adaptive across mobile, tablet, and desktop

---

# Tech Stack

## Frontend
- Vue 3
- Vite
- Tailwind CSS
- Vue Router
- Axios
- Pinia

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt

## Database
- PostgreSQL

---

# Architecture

## Frontend Structure

src/
├── api/
├── assets/
├── components/
├── layouts/
├── pages/
├── router/
├── stores/
├── utils/
└── App.vue

## Backend Structure

server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
├── prisma/
├── .env
└── server.js

---

# Database Design

## users
- id
- name
- email
- password_hash
- created_at

## tasks
- id
- user_id
- title
- description
- due_date
- priority
- completed
- created_at
- updated_at

---

# Priority Enum

Allowed values:
- LOW
- MEDIUM
- HIGH

---

# Authentication

Use JWT authentication.

Requirements:
- Passwords must be hashed using bcrypt
- Protected routes require valid JWT token
- Store token securely on frontend
- Implement logout by removing token

---

# API Standards

Use REST API conventions.

## Auth Routes
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

## Task Routes
GET /api/tasks
POST /api/tasks
PATCH /api/tasks/:id
DELETE /api/tasks/:id

---

# Task Features

Users must be able to:
- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- Sort tasks by:
  - due date
  - description
  - priority

---

# Due Today Alert

The dashboard should display a visible alert/banner for tasks due today.

No browser notification required.

Example:
"You have 3 tasks due today."

---

# Adaptive UI Requirements

The UI should adapt differently for:
- Mobile
- Tablet
- Desktop

Avoid only relying on responsive scaling.

Examples:
- Mobile → bottom navigation
- Tablet → compact sidebar
- Desktop → full sidebar + multi-column layout

---

# Coding Standards

- Use clean and maintainable code
- Use descriptive naming
- Avoid duplicated logic
- Use reusable components
- Validate all inputs
- Handle errors properly
- Use environment variables
- Never hardcode secrets

---

# Git Commit Guidelines

Make commits frequently.

Examples:
- feat: setup express server
- feat: implement jwt authentication
- feat: add task sorting
- fix: resolve mobile navbar overflow
- refactor: clean task service logic

---

# UI/UX Direction

Design goals:
- Minimal
- Modern
- Clean spacing
- Easy to use
- Fast interactions

Suggested palette:
- Neutral backgrounds
- Simple accent color
- Clear task priority indicators

---

# README Requirements

README must include:
- Project overview
- Tech stack
- Installation steps
- Environment setup
- Database migration steps
- Screenshots
- Features list

---

# Important Notes

Focus on:
- Stability
- Clean architecture
- User experience
- Code readability

Avoid:
- Overengineering
- Unnecessary features
- Complex microservices
- Premature optimization

This challenge prioritizes execution quality and maintainability over feature quantity.

# Development Workflow

Develop the application incrementally.

DO NOT generate the entire application in one step.

Build features progressively in realistic development stages.

Suggested order:
1. Project setup
2. Database setup
3. Authentication
4. Task CRUD
5. Sorting
6. Due today alerts
7. Adaptive UI improvements
8. Validation and error handling
9. README improvements
10. Final cleanup

Each completed feature should:
- Maintain clean architecture
- Be commit-ready
- Avoid placeholder code
- Keep the app functional

---

# Git Workflow

Simulate realistic professional development workflow.

Prefer multiple small commits instead of one massive implementation.

Example commit messages:
- chore: initialize backend project
- feat: add JWT authentication
- feat: implement task creation API
- feat: add task sorting
- fix: resolve mobile layout overflow
- refactor: simplify auth middleware

---

# README Workflow

Continuously maintain README.md throughout development.

README should evolve together with the project.

Include:
- Setup instructions
- Environment variables
- Database migration steps
- Scripts
- Feature list
- Screenshots
- Architecture overview

Avoid generating placeholder README content.
# Todo App Challenge

A full-stack task management application with Node.js Express backend and Vue 3 frontend.

## Project Structure

```
.
├── server/          # Backend (Express + Prisma + PostgreSQL)
└── (frontend files) # Frontend (Vue 3 + Vite + Tailwind)
```

## Frontend Setup

### Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Router** - Official router for Vue.js
- **Pinia** - Lightweight state management
- **Axios** - HTTP client

### Installation

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:5000
```

### Development

Start frontend dev server:

```bash
npm run dev
```

Server runs on `http://localhost:5173`

### Build

```bash
npm run build
npm run preview
```

## Frontend Folder Structure

```
src/
├── api/                     # API endpoints
│   ├── axios.js            # Axios with interceptors
│   ├── auth.js             # Auth endpoints
│   └── tasks.js            # Task endpoints
├── assets/                 # Static assets
├── components/             # Reusable components
├── layouts/                # Responsive layouts
│   ├── MobileLayout.vue    # Mobile (< 768px)
│   ├── TabletLayout.vue    # Tablet (768px-1023px)
│   └── DesktopLayout.vue   # Desktop (≥ 1024px)
├── pages/                  # Page components
├── router/                 # Vue Router config
├── stores/                 # Pinia stores
│   ├── authStore.js        # Auth state
│   └── taskStore.js        # Task state
├── utils/                  # Utilities
├── App.vue                 # Root component
└── main.js                 # Entry point
```

## Backend Setup

See [server/README.md](./server/README.md) for backend setup instructions.

## Features

### Responsive Design
- Mobile: Bottom navigation (< 768px)
- Tablet: Compact sidebar (768px - 1023px)
- Desktop: Full sidebar (≥ 1024px)

### Authentication
- User registration and login
- JWT token management
- Protected routes

### Task Management
- Create, read, update, delete tasks
- Sort by due date, priority, creation date
- Mark tasks complete
- View tasks due today
- Priority levels (LOW, MEDIUM, HIGH)

## Important Notes

- Backend must be running on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`
- JWT tokens stored in localStorage
- User redirected to login on unauthorized (401) response

## Development Workflow

1. Start backend: `npm run dev` (in server/)
2. Start frontend: `npm run dev` (in root)
3. Access app at `http://localhost:5173`
4. Backend API docs: [server/src/AUTH.md](./server/src/AUTH.md) and [server/src/TASKS.md](./server/src/TASKS.md)
# TaskHub - Task Management App

A production-ready, full-stack task management web application. Built with Vue 3 (frontend) and Node.js Express (backend).

## Features

✅ **User Authentication** - Secure registration, login, logout with JWT  
✅ **Task Management** - Create, edit, complete, delete tasks  
✅ **Smart Sorting** - Sort by due date, priority, creation date (ascending/descending)  
✅ **Task Filtering** - View all, completed, or pending tasks  
✅ **Due Today Alerts** - Visual banner showing tasks due today  
✅ **Responsive Design** - Mobile (bottom nav), tablet (compact sidebar), desktop (full sidebar)  
✅ **Real-time Feedback** - Toast notifications for all operations  
✅ **Professional UX** - SweetAlert2 confirmations, form validation, error handling

## Tech Stack

### Frontend
- Vue 3 (latest)
- Vite (lightning-fast build)
- Tailwind CSS (utility-first styling)
- Vue Router (client-side routing)
- Pinia (state management)
- Axios (HTTP client)
- SweetAlert2 (beautiful dialogs)
- vue-toastification (toast notifications)

### Backend
- Node.js with Express.js
- Prisma ORM (database abstraction)
- PostgreSQL (relational database)
- JWT (authentication)
- bcrypt (password hashing)

## Quick Start

### Prerequisites

- Node.js (v16+)
- PostgreSQL running locally
- `.env` file configured (copy from `.env.example`)

### 1. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Setup database
npx prisma db push

# Start dev server (runs on http://localhost:5000)
npm run dev
```

### 2. Frontend Setup

```bash
# From project root
npm install

# Create environment file
cp .env.example .env.local

# Start dev server (runs on http://localhost:5173)
npm run dev
```

### 3. Access the Application

Open browser: `http://localhost:5173`

**Test Account:**
- Email: `test@example.com`
- Password: `password123`

## Project Structure

```
todo-app-challenge/
├── server/                      # Backend
│   ├── src/
│   │   ├── config/             # Database config
│   │   ├── controllers/        # Route handlers
│   │   ├── middleware/         # Auth, error handling
│   │   ├── models/             # Prisma models
│   │   ├── routes/             # API endpoints
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Validators
│   │   └── app.js              # Express app
│   ├── prisma/                 # Database schema
│   └── package.json
│
└── src/                        # Frontend
    ├── api/                    # HTTP requests
    │   ├── axios.js           # Axios config + interceptors
    │   ├── auth.js            # Auth endpoints
    │   └── tasks.js           # Task endpoints
    ├── components/            # Reusable Vue components
    │   ├── TaskForm.vue       # Create/edit form
    │   ├── TaskItem.vue       # Single task card
    │   └── TaskList.vue       # Task list container
    ├── layouts/               # Responsive layouts
    │   ├── MobileLayout.vue   # <768px
    │   ├── TabletLayout.vue   # 768-1023px
    │   └── DesktopLayout.vue  # ≥1024px
    ├── pages/                 # Page components
    │   ├── Login.vue          # Login page
    │   ├── Register.vue       # Registration page
    │   ├── Dashboard.vue      # Main dashboard
    │   └── Tasks.vue          # All tasks view
    ├── router/                # Vue Router config
    ├── stores/                # Pinia stores
    │   ├── authStore.js       # Auth state
    │   └── taskStore.js       # Task state
    ├── App.vue                # Root component
    └── main.js                # Entry point
```

## Environment Variables

### Frontend (`.env.local`)

```env
VITE_API_URL=http://localhost:5000
```

### Backend (server/`.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/taskhub
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Task Endpoints

- `GET /api/tasks` - Get all tasks (query params: `sort`, `order`)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion
- `GET /api/tasks/due/today` - Get tasks due today

See detailed docs: [server/src/AUTH.md](./server/src/AUTH.md) and [server/src/TASKS.md](./server/src/TASKS.md)

## Screenshots

### Desktop View
- Full sidebar navigation with branding
- Complete task dashboard with stats
- Professional layout with header

### Tablet View
- Compact sidebar (200-250px width)
- Space-efficient navigation
- Responsive content area

### Mobile View
- Bottom navigation bar
- Optimized for small screens
- Touch-friendly interface

## Validation & Error Handling

### Frontend Validation
- ✅ Title required (not empty)
- ✅ Due date required
- ✅ Due date cannot be in past
- ✅ Priority enum (LOW, MEDIUM, HIGH)
- ✅ Email format validation
- ✅ Password length (min 6 chars)
- ✅ Password confirmation match

### Backend Validation
- ✅ JWT token verification
- ✅ User input sanitization
- ✅ Priority enum validation
- ✅ Due date format validation
- ✅ Ownership verification (users can only access own tasks)

### Error Handling
- ✅ Global error handler (frontend & backend)
- ✅ 401 redirects to login automatically
- ✅ User-friendly error messages
- ✅ Network timeout handling
- ✅ Validation error feedback with toasts

## Running Tests/Validation

```bash
# Frontend development
npm run dev

# Frontend build
npm run build

# Backend development
cd server
npm run dev

# Database migrations
npx prisma migrate dev

# View database (Prisma Studio)
npx prisma studio
```

## Production Deployment

### Frontend Build

```bash
npm run build
# Output: dist/
```

### Environment for Production

Update `.env` with production URL and credentials:

```env
VITE_API_URL=https://your-api-domain.com
```

## Key Features Explained

### Responsive Layouts
- **Mobile (<768px)**: Bottom navigation with hamburger menu
- **Tablet (768-1023px)**: Compact sidebar (200px)
- **Desktop (≥1024px)**: Full sidebar (280px) with branding

### Authentication Flow
1. Register new account
2. JWT token generated and stored in localStorage
3. Token automatically attached to all API requests
4. 401 response clears token and redirects to login

### Task Sorting
- Sort by newest (created_at), due date, priority, or title
- Toggle ascending/descending order
- Persisted in URL state

### Real-time Feedback
- Toast notifications for create/update/delete
- SweetAlert2 for destructive operations
- Form validation with error messages
- Loading states on async operations

## Security Notes

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens stored securely in localStorage
- All API requests require authentication
- User can only access own tasks (verified server-side)
- Input validation on both frontend and backend

## Troubleshooting

### Connection Issues
- Ensure backend is running: `npm run dev` in `server/` folder
- Check VITE_API_URL matches backend port
- Verify PostgreSQL is running

### Database Issues
- Run `npx prisma db push` to sync schema
- Check DATABASE_URL in `.env`
- Review Prisma Studio: `npx prisma studio`

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist/ .next/ .vite/`

## Code Quality

- Clean, maintainable code structure
- Reusable components (no duplication)
- Consistent naming conventions
- Comprehensive error handling
- Production-ready validation

## Future Enhancements (In Progress)

- [ ] AI Chatbot integration (Gemini API)
- [ ] Dark mode toggle
- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Email notifications
- [ ] Team collaboration

## License

Turboly Coding Challenge Submission
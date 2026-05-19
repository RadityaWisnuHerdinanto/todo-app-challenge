# Backend Setup

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

## Installation

```bash
cd server
npm install
```

## Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and configuration:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/todo_app?schema=public"
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:5173
```

## Database Setup

### Prerequisites

Ensure PostgreSQL is running and accessible at `localhost:5432`.

### Initialize Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Reset database (creates tables from schema)
npx prisma migrate reset
```

The schema includes:
- **User** model - User accounts with email-based authentication
- **Task** model - Tasks with priority levels (LOW, MEDIUM, HIGH)
- **Timestamps** - `created_at` and `updated_at` on all models
- **Relations** - One-to-many relationship (User → Tasks)
- **Cascade Delete** - Deleting a user removes all their tasks

See [prisma/SCHEMA.md](prisma/SCHEMA.md) for detailed schema documentation.

## Development

### Start Development Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Prisma Studio (Database Browser)

```bash
npm run prisma:studio
```

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files (database, etc.)
│   ├── controllers/      # Route controllers (coming soon)
│   ├── middleware/       # Express middleware (CORS, error handling, logging)
│   ├── models/           # Data models (coming soon)
│   ├── routes/           # Route definitions (coming soon)
│   ├── services/         # Business logic (coming soon)
│   ├── utils/            # Utility functions (validators)
│   └── app.js            # Express app configuration
├── prisma/
│   ├── schema.prisma     # Database schema definition
│   └── SCHEMA.md         # Schema documentation
├── .env                  # Environment variables
├── .env.example          # Example environment variables
├── package.json
└── server.js             # Entry point
```

## Available Endpoints

- `GET /api/health` - Health check endpoint

## Scripts

- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database browser)

## Notes

- Server uses ES modules (type: "module" in package.json)
- Middleware setup includes CORS, JSON parsing, request logging, and error handling
- Database schema is defined in prisma/schema.prisma
- Authentication and task features will be added in next steps

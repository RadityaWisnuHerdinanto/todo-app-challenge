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

### Create PostgreSQL Database

```bash
createdb todo_app
```

### Run Prisma Migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

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
│   ├── config/          # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/           # Data models
│   ├── routes/           # Route definitions
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   └── app.js            # Express app configuration
├── prisma/
│   └── schema.prisma     # Database schema
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

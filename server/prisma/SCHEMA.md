# Database Schema Documentation

## Overview

The application uses a two-model schema with proper relations and constraints:
- **User**: Stores user account information
- **Task**: Stores user tasks with priority levels

## Models

### User Model

Stores user account information and authentication details.

```prisma
model User {
  id        Int     @id @default(autoincrement())
  name      String
  email     String  @unique
  password_hash String
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  // Relations
  tasks Task[]
}
```

**Fields:**
- `id` - Auto-incrementing primary key
- `name` - User's full name
- `email` - Unique email for authentication
- `password_hash` - Bcrypt hashed password (never store plain text)
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp
- `tasks` - Relation to user's tasks

**Indexes:**
- Unique constraint on `email` for login lookups

### Task Model

Stores individual tasks created by users.

```prisma
model Task {
  id        Int     @id @default(autoincrement())
  user_id   Int
  title     String
  description String?
  due_date  DateTime?
  priority  Priority @default(MEDIUM)
  completed Boolean  @default(false)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  // Relations
  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@index([user_id])
}
```

**Fields:**
- `id` - Auto-incrementing primary key
- `user_id` - Foreign key to User
- `title` - Task name/title
- `description` - Optional detailed description
- `due_date` - Optional due date for the task
- `priority` - Task priority level (LOW, MEDIUM, HIGH)
- `completed` - Boolean flag for task completion status
- `created_at` - Task creation timestamp
- `updated_at` - Last update timestamp
- `user` - Relation to the task owner

**Indexes:**
- Foreign key index on `user_id` for efficient lookups
- Cascade delete: when a user is deleted, all their tasks are deleted

### Priority Enum

Task priority levels for categorization and sorting.

```prisma
enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

## Relationships

### One-to-Many (User → Task)

- One user can have many tasks
- One task belongs to exactly one user
- Cascading delete: deleting a user deletes all their tasks
- Foreign key: `Task.user_id` references `User.id`

## Constraints & Features

✓ **Data Integrity**
- Email uniqueness ensures no duplicate accounts
- Foreign key constraints maintain referential integrity
- Cascade delete prevents orphaned tasks

✓ **Timestamps**
- `created_at` - Automatically set on creation
- `updated_at` - Automatically updated on any change

✓ **Defaults**
- Task priority defaults to MEDIUM
- Task completion defaults to false
- Task description is optional

✓ **Scalability**
- Indexed foreign keys for efficient filtering
- Query optimization with proper indexes
- Clean separation of concerns

## Usage Examples

### Create a User
```javascript
const user = await prisma.user.create({
  data: {
    name: "John Doe",
    email: "john@example.com",
    password_hash: "hashed_password_here"
  }
});
```

### Create a Task
```javascript
const task = await prisma.task.create({
  data: {
    user_id: 1,
    title: "Complete project",
    description: "Finish the todo app",
    due_date: new Date("2026-05-31"),
    priority: "HIGH"
  }
});
```

### Get User with Tasks
```javascript
const userWithTasks = await prisma.user.findUnique({
  where: { id: 1 },
  include: { tasks: true }
});
```

### Get Tasks for a User with Sorting
```javascript
const tasks = await prisma.task.findMany({
  where: { user_id: 1 },
  orderBy: { due_date: "asc" }
});
```

## Migration Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# Open Prisma Studio (browser database browser)
npm run prisma:studio

# Check migration status
npx prisma migrate status

# Reset database (development only)
npx prisma migrate reset
```

## Best Practices

1. **Always use transactions for related operations** - Use `prisma.$transaction()` for multiple related updates
2. **Validate inputs** - Validate email, required fields, and data types before database operations
3. **Use proper error handling** - Catch Prisma errors and return appropriate HTTP status codes
4. **Implement soft deletes if needed** - Consider adding a `deleted_at` field for audit trails
5. **Use proper indexes** - The schema already includes necessary indexes for performance

## Notes for Development

- The database automatically tracks `created_at` and `updated_at` timestamps
- Cascade delete is enabled to prevent orphaned tasks
- Email must be unique across the system
- Password should never be stored in plain text (always hash with bcrypt)

# Task API Documentation

## Overview

All task endpoints are **protected** with JWT authentication. You must include a valid JWT token in the Authorization header for all requests.

```
Authorization: Bearer <your_jwt_token>
```

## Base URL

```
http://localhost:5000/api/tasks
```

## Endpoints

### Get All Tasks

**Endpoint:** `GET /api/tasks`

**Query Parameters:**
- `sort` (optional) - Sort by: `due_date`, `priority`, `created_at`, or `title` (default: `created_at`)

**Example:**
```bash
curl -H "Authorization: Bearer <token>" \
     http://localhost:5000/api/tasks?sort=priority
```

**Response (200):**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": {
    "count": 3,
    "tasks": [
      {
        "id": 1,
        "user_id": 1,
        "title": "Complete project",
        "description": "Finish the todo app",
        "due_date": "2026-05-31T00:00:00.000Z",
        "priority": "HIGH",
        "completed": false,
        "created_at": "2026-05-19T12:00:00.000Z",
        "updated_at": "2026-05-19T12:00:00.000Z"
      }
    ]
  }
}
```

### Get Tasks Due Today

**Endpoint:** `GET /api/tasks/due/today`

**Response (200):**
```json
{
  "success": true,
  "message": "Tasks due today retrieved successfully",
  "data": {
    "count": 2,
    "tasks": [...]
  }
}
```

### Get Single Task

**Endpoint:** `GET /api/tasks/:id`

**Example:**
```bash
curl -H "Authorization: Bearer <token>" \
     http://localhost:5000/api/tasks/1
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": {
    "task": {
      "id": 1,
      "user_id": 1,
      "title": "Complete project",
      "description": "Finish the todo app",
      "due_date": "2026-05-31T00:00:00.000Z",
      "priority": "HIGH",
      "completed": false,
      "created_at": "2026-05-19T12:00:00.000Z",
      "updated_at": "2026-05-19T12:00:00.000Z"
    }
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

### Create Task

**Endpoint:** `POST /api/tasks`

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "due_date": "2026-05-25T18:00:00Z",
  "priority": "MEDIUM"
}
```

**Fields:**
- `title` (required) - Task title/name
- `description` (optional) - Detailed description
- `due_date` (optional) - Due date in ISO 8601 format
- `priority` (optional) - LOW, MEDIUM, HIGH (default: MEDIUM)

**Example:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "priority": "HIGH",
    "due_date": "2026-05-25T18:00:00Z"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "id": 5,
      "user_id": 1,
      "title": "Buy groceries",
      "description": null,
      "due_date": "2026-05-25T18:00:00.000Z",
      "priority": "HIGH",
      "completed": false,
      "created_at": "2026-05-19T12:30:00.000Z",
      "updated_at": "2026-05-19T12:30:00.000Z"
    }
  }
}
```

### Update Task

**Endpoint:** `PATCH /api/tasks/:id`

**Request Body:** (any combination of fields)
```json
{
  "title": "Updated title",
  "description": "New description",
  "due_date": "2026-05-30T18:00:00Z",
  "priority": "LOW",
  "completed": true
}
```

**Example:**
```bash
curl -X PATCH http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true,
    "priority": "LOW"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "task": {
      "id": 1,
      "user_id": 1,
      "title": "Complete project",
      "description": "Finish the todo app",
      "due_date": "2026-05-31T00:00:00.000Z",
      "priority": "LOW",
      "completed": true,
      "created_at": "2026-05-19T12:00:00.000Z",
      "updated_at": "2026-05-19T12:35:00.000Z"
    }
  }
}
```

### Toggle Task Completion

**Endpoint:** `PATCH /api/tasks/:id/toggle`

Toggles the `completed` status of a task (true → false, false → true).

**Example:**
```bash
curl -X PATCH http://localhost:5000/api/tasks/1/toggle \
  -H "Authorization: Bearer <token>"
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task marked as completed",
  "data": {
    "task": {
      "id": 1,
      "user_id": 1,
      "title": "Complete project",
      "description": "Finish the todo app",
      "due_date": "2026-05-31T00:00:00.000Z",
      "priority": "HIGH",
      "completed": true,
      "created_at": "2026-05-19T12:00:00.000Z",
      "updated_at": "2026-05-19T12:40:00.000Z"
    }
  }
}
```

### Delete Task

**Endpoint:** `DELETE /api/tasks/:id`

**Example:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer <token>"
```

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "task": {
      "id": 1,
      "user_id": 1,
      "title": "Complete project",
      "description": "Finish the todo app",
      "due_date": "2026-05-31T00:00:00.000Z",
      "priority": "HIGH",
      "completed": false,
      "created_at": "2026-05-19T12:00:00.000Z",
      "updated_at": "2026-05-19T12:00:00.000Z"
    }
  }
}
```

## Error Responses

### Missing Authentication (401)
```json
{
  "success": false,
  "message": "No token provided or invalid format"
}
```

### Invalid/Expired Token (401)
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### Unauthorized Access (403)
```json
{
  "success": false,
  "message": "Unauthorized to access this task"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Task not found"
}
```

### Invalid Input (400)
```json
{
  "success": false,
  "message": "Title is required"
}
```

```json
{
  "success": false,
  "message": "Invalid priority. Must be LOW, MEDIUM, or HIGH"
}
```

```json
{
  "success": false,
  "message": "Invalid due_date format"
}
```

## Sorting Options

Use the `?sort=` query parameter to sort tasks:

- `created_at` - Sort by creation date (default)
- `due_date` - Sort by due date
- `priority` - Sort by priority (LOW, MEDIUM, HIGH)
- `title` - Sort by title alphabetically

**Example:**
```bash
# Sort by priority
curl -H "Authorization: Bearer <token>" \
     http://localhost:5000/api/tasks?sort=priority

# Sort by due date
curl -H "Authorization: Bearer <token>" \
     http://localhost:5000/api/tasks?sort=due_date

# Sort by title
curl -H "Authorization: Bearer <token>" \
     http://localhost:5000/api/tasks?sort=title
```

## Protected Routes

All task endpoints require JWT authentication:

1. Add token to Authorization header: `Authorization: Bearer <token>`
2. Token expires in 7 days (configurable via JWT_EXPIRY)
3. If token is invalid/expired, you'll get a 401 response
4. Re-login to get a new token

## Priority Levels

- `LOW` - Low priority task
- `MEDIUM` - Medium priority task (default)
- `HIGH` - High priority task

## Date Format

Due dates should be provided in **ISO 8601 format**:
- With time: `2026-05-25T18:00:00Z`
- Date only: `2026-05-25`

## Example Workflow

```bash
# 1. Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
# Response contains: token, user

# 2. Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <token_from_step_1>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My first task",
    "priority": "HIGH"
  }'

# 3. Get all tasks
curl -H "Authorization: Bearer <token_from_step_1>" \
     http://localhost:5000/api/tasks

# 4. Update task
curl -X PATCH http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer <token_from_step_1>" \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# 5. Delete task
curl -X DELETE http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer <token_from_step_1>"
```

## Implementation Details

### Service Layer (`taskService.js`)
- `getTasksForUser()` - Retrieve all user tasks
- `getTaskById()` - Get single task with ownership verification
- `createTask()` - Create new task
- `updateTask()` - Update existing task
- `deleteTask()` - Delete task
- `getTasksDueToday()` - Get tasks due today
- `toggleTaskCompletion()` - Toggle completion status

### Controller Layer (`taskController.js`)
- `getAllTasks()` - Handle GET /api/tasks
- `getTask()` - Handle GET /api/tasks/:id
- `createNewTask()` - Handle POST /api/tasks
- `updateExistingTask()` - Handle PATCH /api/tasks/:id
- `deleteExistingTask()` - Handle DELETE /api/tasks/:id
- `getDueTodayTasks()` - Handle GET /api/tasks/due/today
- `toggleTask()` - Handle PATCH /api/tasks/:id/toggle

### Middleware Protection
- All routes protected by `protect` middleware
- Middleware verifies JWT token and extracts user info
- `req.user.userId` available in all handlers

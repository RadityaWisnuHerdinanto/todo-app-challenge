# Authentication Documentation

## Overview

The authentication system uses JWT (JSON Web Token) and bcrypt for secure user authentication. All passwords are hashed using bcrypt before storage.

## Features

✓ User registration with validation
✓ User login with credentials
✓ JWT token generation and verification
✓ Secure password hashing with bcrypt
✓ Protected routes middleware
✓ Comprehensive error handling

## API Endpoints

### Register User

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-05-19T12:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

**Validation Rules:**
- Name: required
- Email: required, valid format, unique
- Password: required, minimum 6 characters
- Confirm Password: required, must match password

### Login User

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-05-19T12:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Logout User

**Endpoint:** `POST /api/auth/logout`

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Note:** Logout on frontend is handled by removing the token from local storage. This endpoint is provided for server-side cleanup if needed.

## Protected Routes

### Using Token with Protected Routes

All protected routes require the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

**Example:**
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:5000/api/tasks
```

### Middleware: `protect`

The `protect` middleware verifies the JWT token and attaches user information to `req.user`:

```javascript
import { protect } from "../middleware/protect.js";

router.get("/tasks", protect, getTasks);
```

**Token Payload:**
```javascript
{
  userId: 1,
  email: "john@example.com",
  iat: 1234567890,
  exp: 1241247890
}
```

## Security Features

### Password Hashing

Passwords are hashed using bcrypt with salt rounds of 10:

```javascript
import { hashPassword } from "../services/authService.js";

const hashedPassword = await hashPassword(userPassword);
```

### JWT Token Generation

Tokens are generated with:
- **Secret Key:** from `process.env.JWT_SECRET`
- **Expiry:** from `process.env.JWT_EXPIRY` (default: 7 days)
- **Payload:** userId and email

```javascript
import { generateToken } from "../services/authService.js";

const token = generateToken(userId, email);
```

### Token Verification

Tokens are verified before accessing protected routes:

```javascript
import { verifyToken } from "../services/authService.js";

const decoded = verifyToken(token);
if (!decoded) {
  // Token is invalid or expired
}
```

## Error Handling

### Common Error Responses

**Missing Token (401):**
```json
{
  "success": false,
  "message": "No token provided or invalid format"
}
```

**Invalid/Expired Token (401):**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**Invalid Email Format (400):**
```json
{
  "success": false,
  "message": "Invalid email format"
}
```

**Password Too Short (400):**
```json
{
  "success": false,
  "message": "Password must be at least 6 characters"
}
```

**Email Already Registered (409):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

## Implementation Details

### Service Layer (`authService.js`)

- `hashPassword(password)` - Hash password with bcrypt
- `comparePassword(password, hash)` - Verify password
- `generateToken(userId, email)` - Create JWT token
- `verifyToken(token)` - Verify and decode token
- `registerUser(name, email, password)` - Register new user
- `loginUser(email, password)` - Authenticate user

### Controller Layer (`authController.js`)

- `register(req, res)` - Handle registration request
- `login(req, res)` - Handle login request

### Middleware (`protect.js`)

- `protect(req, res, next)` - Verify token and protect routes

### Routes (`authRoutes.js`)

- `POST /register` - Register endpoint
- `POST /login` - Login endpoint
- `POST /logout` - Logout endpoint

## Environment Variables

Required environment variables in `.env`:

```env
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
```

## Testing with curl

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login user
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Access protected route (example)
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Best Practices

1. **Store token securely** - Save JWT in secure storage on frontend (httpOnly cookie recommended)
2. **Include in every request** - Add token to Authorization header for protected routes
3. **Handle token expiry** - Implement token refresh or re-login when expired
4. **Validate input** - All endpoints validate request data before processing
5. **Use HTTPS** - Always use HTTPS in production to protect tokens in transit
6. **Change JWT_SECRET** - Update JWT_SECRET in production environment

## Next Steps

- Implement task CRUD endpoints
- Add task filtering and sorting
- Implement "due today" alerts
- Add frontend authentication UI

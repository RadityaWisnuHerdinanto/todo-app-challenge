# TaskHub AI Chatbot

AI-powered chatbot integration using Google's Gemini API to help users manage tasks and improve productivity.

## Features

- **Interactive Chat** - Ask questions about tasks and productivity
- **Smart Suggestions** - Get AI-generated productivity recommendations based on your tasks
- **Context Awareness** - Chatbot understands your task context and provides relevant responses
- **Real-time Response** - Instant AI-powered responses

## Model

**Gemini 2.5 Flash** - Fast, efficient model optimized for real-time interactions

## API Endpoints

### Send Message to Chatbot

**POST** `/api/chat/message`

Sends a message to the AI chatbot and receives a response.

**Authentication:** Required (JWT Bearer token)

**Request Body:**
```json
{
  "message": "What should I do first today?",
  "taskContext": {
    "totalTasks": 5,
    "completedTasks": 2,
    "pendingTasks": 3,
    "upcomingTasks": []
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Based on your tasks, I recommend starting with the high-priority items...",
  "userId": "user-id",
  "timestamp": "2024-05-21T10:30:00Z"
}
```

**Error Response:**
```json
{
  "error": "Failed to process chat message",
  "details": "Error message details"
}
```

---

### Get AI Suggestions

**POST** `/api/chat/suggestions`

Gets productivity suggestions based on your current tasks.

**Authentication:** Required (JWT Bearer token)

**Request Body:**
```json
{
  "tasks": [
    {
      "id": "task-1",
      "title": "Complete project",
      "priority": "HIGH",
      "due_date": "2024-05-25"
    },
    {
      "id": "task-2",
      "title": "Review code",
      "priority": "MEDIUM",
      "due_date": "2024-05-23"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "suggestions": "1. Prioritize high-priority tasks that are due soon\n2. Break down large tasks into smaller subtasks\n3. Schedule review sessions to maintain quality",
  "userId": "user-id",
  "timestamp": "2024-05-21T10:35:00Z"
}
```

**Error Response:**
```json
{
  "error": "Failed to generate suggestions",
  "details": "Error message details"
}
```

---

## Environment Setup

Add the following to your `.env` file:

```env
# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: https://aistudio.google.com/app/apikeys

---

## Frontend Usage

### Chatbot Component

The chatbot appears as a floating widget in the bottom-right corner of the app.

```vue
<Chatbot />
```

**Features:**
- Always available on protected routes
- Shows unread message count
- Minimizable
- Auto-scrolls to latest messages
- Shows loading state while waiting for response

### Chat Store (Pinia)

Access chat functionality from any component:

```javascript
import { useChatStore } from '@/stores/chatStore.js';

const chatStore = useChatStore();

// Send message
await chatStore.sendMessage('Help me prioritize my tasks', taskContext);

// Get suggestions
const suggestions = await chatStore.getSuggestions(tasks);

// Access state
const messages = chatStore.messages; // Array of messages
const loading = chatStore.loading;   // Boolean
const error = chatStore.error;       // String or null
```

---

## How It Works

1. **User sends message** → Frontend Chatbot component
2. **Message sent to backend** → `/api/chat/message` endpoint
3. **Backend processes** → Creates Gemini API request with task context
4. **Gemini responds** → Returns AI-generated message
5. **Response sent to frontend** → Chat store updates message history
6. **UI updates** → Message appears in chat widget

---

## Task Context

When sending messages, the chatbot receives context about the user's tasks:

```javascript
{
  totalTasks: 5,           // Total number of tasks
  completedTasks: 2,       // Number of completed tasks
  pendingTasks: 3,         // Number of pending tasks
  upcomingTasks: [         // Next 3 upcoming tasks
    { title, priority, due_date }
  ]
}
```

This allows the chatbot to provide personalized, context-aware responses.

---

## Error Handling

The chatbot includes comprehensive error handling:

- **Network errors** → User sees friendly error message
- **API errors** → Logged and reported to user
- **Empty message** → Prevented at UI level
- **Timeout** → 10-second timeout on requests

---

## Security

- ✅ All chat endpoints require JWT authentication
- ✅ User can only access their own chat context
- ✅ API key stored securely in environment variables
- ✅ No chat history stored (stateless design)
- ✅ Rate limiting recommended for production

---

## Future Enhancements

- [ ] Chat history persistence
- [ ] Conversation threads
- [ ] Task creation from chat
- [ ] Multi-language support
- [ ] Chat feedback/ratings
- [ ] Admin chat analytics

# API Services Documentation

This directory contains all API service modules for interacting with the backend API at `http://localhost:3003`.

## Structure

- `types.ts` - TypeScript types and interfaces for all API entities
- `index.ts` - Central export point for all API services
- Individual API service files for each domain

## Available API Services

### Core Services
- **usersApi** - User authentication and management
- **tweetsApi** (v1 & v2) - Tweet operations
- **tasksApi** - Task management
- **tagsApi** - Tag operations
- **topicsApi** - Topic management with sections
- **linksApi** - Link management
- **memoryMapsApi** - Memory map operations
- **wordsApi** - Word dictionary with pagination
- **pinnedItemsApi** - Pinned items management
- **myResumeApi** - Resume management
- **relatedNodesApi** - Related node operations
- **thinkTankApi** - Think tank items
- **chatGPTApi** - ChatGPT conversations
- **activitiesApi** - Activity tracking
- **comparableObjectsApi** - Comparable objects
- **consolidatedReportingApi** - Consolidated reporting
- **interviewMgmtApi** (v1 & v2) - Interview management (categories, questions, answers)

## Usage Examples

### Basic Usage

```typescript
import { tweetsV2Api, tasksApi, tagsApi } from '@/services/api';

// Get all tweets
const tweets = await tweetsV2Api.getAll();

// Create a new task
const newTask = await tasksApi.create({
  title: 'Complete project',
  description: 'Finish the Vue frontend',
  status: 'pending'
});

// Get tag by ID
const tag = await tagsApi.getById('tag-123');
```

### User Authentication

```typescript
import { usersApi } from '@/services/api';

// Login
const response = await usersApi.login({
  username: 'user@example.com',
  password: 'password123'
});
// Token is automatically stored via auth interceptor

// Register
await usersApi.register({
  username: 'newuser',
  password: 'password123',
  email: 'newuser@example.com'
});

// Get current user
const currentUser = await usersApi.getMe();
```

### Interview Management

```typescript
import { interviewMgmtV2Api } from '@/services/api';

// Get all categories
const categories = await interviewMgmtV2Api.getAllCategories();

// Create a question
const question = await interviewMgmtV2Api.createQuestion({
  question: 'What is React?',
  categoryId: 'cat-123',
  tags: ['react', 'frontend']
});

// Get questions by category
const questions = await interviewMgmtV2Api.getQuestionsByCategoryId('cat-123');
```

### Error Handling

All API calls use axios and will throw errors on failure. Handle them with try/catch:

```typescript
import { tasksApi } from '@/services/api';

try {
  const task = await tasksApi.create({ title: 'New Task' });
  console.log('Task created:', task);
} catch (error: any) {
  if (error.response) {
    console.error('API Error:', error.response.data);
    console.error('Status:', error.response.status);
  } else {
    console.error('Network Error:', error.message);
  }
}
```

### TypeScript Types

All API services are fully typed. Import types from the API services:

```typescript
import type { Task, Tag, Topic, InterviewQuestion } from '@/services/api';

const task: Task = {
  title: 'My Task',
  description: 'Task description',
  status: 'pending'
};
```

## API Base URL

The API base URL is configured in `apiClient.ts` and defaults to `http://localhost:3003`. 
You can override it by setting the `VITE_API_BASE_URL` environment variable.

## Authentication

The API client automatically includes the authentication token in requests via interceptors. 
The token is retrieved from the `useAuth` store.

## Response Format

Most endpoints return data directly, but some may return wrapped responses:

```typescript
// Direct response
const tasks = await tasksApi.getAll(); // Task[]

// Paginated response
const words = await wordsApi.getAll(1, 10); // PaginatedResponse<Word>
```

## Backend API Documentation

For complete API documentation, visit:
- Swagger UI: http://localhost:3003/api-docs
- Redoc: http://localhost:3003/redoc
- OpenAPI JSON: http://localhost:3003/api-docs-json


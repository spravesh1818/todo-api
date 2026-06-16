# Todo API

A REST API for managing todos with JWT authentication, MongoDB persistence, and Redis caching.

## Prerequisites

- Node.js 18+
- MongoDB
- Redis

Optional Docker setup for dependencies:

```bash
docker run -d --name mongo -p 27017:27017 mongo
docker run -d --name redis -p 6379:6379 redis
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/todo-api
JWT_SECRET=your-secret-key-here
REDIS_HOST=localhost
REDIS_PORT=6379
```

3. Start the server:

```bash
npm start
```

The server runs at `http://localhost:3000` (or your configured `PORT`).

## Authentication

All `/todos` routes require a valid JWT in the `Authorization` header.

1. Register a user
2. Log in to receive an `access_token`
3. Include the token on every todo request: `Authorization: Bearer <access_token>`

Todos are scoped per user — each user only sees and manages their own todos.

## API Endpoints

### Public

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health message |
| GET | `/health` | Health check |
| POST | `/auth/register` | Create a new user |
| POST | `/auth/login` | Log in and receive a JWT |

### Protected (require JWT)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/todos` | List your todos |
| POST | `/todos` | Create a todo |
| GET | `/todos/:id` | Get a todo by ID |
| PATCH | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

## Examples

### Register

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

Response:

```json
{ "access_token": "<jwt>" }
```

### Create a todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt>" \
  -d '{"title":"Buy groceries"}'
```

### List todos

```bash
curl http://localhost:3000/todos \
  -H "Authorization: Bearer <jwt>"
```

### Get a todo

```bash
curl http://localhost:3000/todos/<todo-id> \
  -H "Authorization: Bearer <jwt>"
```

### Update a todo

```bash
curl -X PATCH http://localhost:3000/todos/<todo-id> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt>" \
  -d '{"completed":true}'
```

### Delete a todo

```bash
curl -X DELETE http://localhost:3000/todos/<todo-id> \
  -H "Authorization: Bearer <jwt>"
```

## Notes

- JWT tokens expire after 1 hour.
- Todo list responses are cached in Redis for 5 minutes per user; the cache is invalidated on create, update, or delete.
- Existing todos created before user scoping was added will not appear for any user.

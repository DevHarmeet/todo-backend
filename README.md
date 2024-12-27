# Todo List Backend API

A RESTful API built with Express.js and TypeScript, using Prisma ORM with MySQL. This backend supports a Todo List application with task management features.

# Prerequisites

- Node.js (v14 or higher)
- MySQL
- npm/yarn
- Prisma
- Nodemon

## Getting Started

1. **Clone and Install**

```
git clone https://github.com/your-repo/todo-backend.git
cd todo-backend
npm install
```

2. **Database Setup**

- Create a MySQL database named todo_db.
- Copy `.env.example` to `.env` and update the database URL:

```
DATABASE_URL="mysql://root:<password>@localhost:3306/todo_db"
```

3. **Prisma Setup**

- Generate Prisma client

```
npx prisma generate
```

- Run Migrations

```
npx prisma migrate dev --name init
```

4. **Run the Server**

```
npx nodemon
```

## API Endpoints

### Tasks

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| GET    | /tasks     | Get all tasks |
| POST   | /tasks     | Create a task |
| PUT    | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Database Schema

```
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  color     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Testing

The API includes comprehensive test coverage using Jest and Supertest.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test --watchAll
```

### Test Coverage

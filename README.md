# Taska - Task Management

A RESTful API built with Node.js, Express, and MongoDB that demonstrates the Repository Design Pattern for clean architecture and maintainable code.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Design Pattern Benefits](#design-pattern-benefits)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- ✅ Complete CRUD operations for task management
- ✅ Repository Design Pattern implementation
- ✅ Clean separation of concerns (Model, Repository, Service, Controller)
- ✅ MongoDB integration with Mongoose
- ✅ Input validation and error handling
- ✅ Task filtering by status and priority
- ✅ Task statistics dashboard
- ✅ RESTful API design
- ✅ Environment configuration
- ✅ Scalable architecture

## 🛠 Tech Stack

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Environment**: dotenv
- **Development**: Nodemon

## 🏗 Architecture

This project implements the **Repository Design Pattern** with a layered architecture:

```
┌─────────────────┐
│   Routes Layer  │  ← HTTP Endpoints
└────────┬────────┘
         │
┌────────▼────────┐
│ Controller Layer│  ← Request/Response Handling
└────────┬────────┘
         │
┌────────▼────────┐
│  Service Layer  │  ← Business Logic
└────────┬────────┘
         │
┌────────▼────────┐
│Repository Layer │  ← Data Access Logic
└────────┬────────┘
         │
┌────────▼────────┐
│   Model Layer   │  ← Data Structure
└────────┬────────┘
         │
┌────────▼────────┐
│    Database     │  ← MongoDB
└─────────────────┘
```

### Layer Responsibilities

- **Routes**: Define API endpoints and map to controller methods
- **Controllers**: Handle HTTP requests, validate input, send responses
- **Services**: Contain business logic and orchestrate repository calls
- **Repositories**: Abstract data access operations (CRUD)
- **Models**: Define data schema and validation rules

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (v4.4 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Shamsuddeen/taska.git
cd taska
```

2. **Install dependencies**

```bash
npm install
```

## ⚙️ Configuration

1. **Create a `.env` file in the root directory**

```bash
touch .env
```

2. **Add the following environment variables**

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/taska

# Optional: MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taska?retryWrites=true&w=majority
```

## 🎯 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in your .env file).

You should see:

```
✅ Connected to MongoDB
🚀 Server is running on port 3000
```

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### 1. Create a Task

**POST** `/tasks`

**Request Body:**

```json
{
  "title": "Build authentication system",
  "description": "Implement JWT-based authentication",
  "status": "pending",
  "priority": "high",
  "dueDate": "2025-11-01"
}
```

#### 2. Get All Tasks

**GET** `/tasks`

**Query Parameters:**
- `status` (optional): Filter by status (pending, in-progress, completed)
- `priority` (optional): Filter by priority (low, medium, high)

**Example:**

```bash
GET /tasks?status=pending&priority=high
```

#### 3. Get Task by ID

**GET** `/tasks/:id`

#### 4. Update Task

**PUT** `/tasks/:id`

**Request Body:**

```json
{
  "status": "in-progress",
  "priority": "high"
}
```

#### 5. Delete Task

**DELETE** `/tasks/:id`

#### 6. Get Task Statistics

**GET** `/tasks/stats`

#### 7. Health Check

**GET** `/health`

**Response:** `200 OK`

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input or validation error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 📁 Project Structure

```
task-manager-api/
│
├── src/
│   ├── models/
│   │   └── task.model.js          # Mongoose schema & model
│   │
│   ├── repositories/
│   │   └── task.repository.js     # Data access layer (CRUD)
│   │
│   ├── services/
│   │   └── task.service.js        # Business logic layer
│   │
│   ├── controllers/
│   │   └── task.controller.js     # HTTP request handlers
│   │
│   ├── routes/
│   │   └── task.routes.js         # API route definitions
│   │
│   └── app.js                      # Express app configuration
│
├── .env                            # Environment variables
├── .gitignore                      # Git ignore file
├── server.js                       # Application entry point
├── package.json                    # Project dependencies
└── README.md                       # Project documentation
```

## 🧪 Testing

### Using cURL

**Create a task:**

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Write documentation",
    "description": "Complete API documentation",
    "status": "pending",
    "priority": "medium",
    "dueDate": "2025-10-30"
  }'
```

**Get all tasks:**

```bash
curl http://localhost:3000/api/tasks
```

**Get task by ID:**

```bash
curl http://localhost:3000/api/tasks/{taskId}
```

**Update task:**

```bash
curl -X PUT http://localhost:3000/api/tasks/{taskId} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

**Delete task:**

```bash
curl -X DELETE http://localhost:3000/api/tasks/{taskId}
```

### Using Postman

1. Import the API endpoints into Postman
2. Set base URL: `http://localhost:3000/api`
3. Create requests for each endpoint
4. Test CRUD operations

## 🎯 Design Pattern Benefits

### Why Repository Pattern?

1. **Separation of Concerns**
   - Data access logic isolated from business logic
   - Easy to maintain and modify

2. **Testability**
   - Mock repositories for unit testing
   - Test business logic independently

3. **Flexibility**
   - Switch databases without changing business logic
   - Example: MongoDB → PostgreSQL

4. **DRY Principle**
   - Eliminate duplicate database queries
   - Reusable repository methods

5. **Team Collaboration**
   - Clear boundaries between layers
   - Multiple developers can work simultaneously

### Real-World Example: Switching Databases

**Current (MongoDB):**
```javascript
// task.repository.js
async create(taskData) {
  return await Task.create(taskData);
}
```

**Future (PostgreSQL):**
```javascript
// task.repository.postgres.js
async create(taskData) {
  return await pool.query('INSERT INTO tasks...');
}
```

**No changes needed in:**
- Service layer
- Controller layer
- Routes

## 🔐 Security Considerations

For production deployment, consider implementing:

- Authentication (JWT, OAuth)
- Rate limiting
- Input sanitization
- CORS configuration
- Helmet.js for security headers
- Environment-specific configurations
- Database connection pooling
- Error logging (Winston, Morgan)

## 👨‍💻 Author

**Shamsuddeen Omacy**
- GitHub: [@Shamsuddeen](https://github.com/Shamsuddeen)
- LinkedIn: [Shamsuddeen Umar](https://linkedin.com/in/shamsuddeen-umar)
- Twitter (X): [omacys_](https://x.com/omacys_)

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the robust database
- Community contributors

## 📞 Support

For support,  conact [omacys_](https://x.com/omacys_) on Twitter

---

**Happy Coding!** 🚀
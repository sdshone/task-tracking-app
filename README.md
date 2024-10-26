# Task Tracking and Management Application
This project is a backend system for a task tracking and management application, designed to facilitate collaboration and organization within teams and projects. The application allows users to create, assign, and track tasks, as well as collaborate with team members through comments and attachments.


## Features

1. User Authentication & Authorization: Users can register, log in, and manage their profiles securely.
2. Task Management: Users can create, view, update, and delete tasks with attributes such as title, description, and due date. Additional features include task filtering, sorting, and searching.
3. Team/Project Collaboration: Users can create or join teams/projects and assign tasks within them.
4. Comments and Attachments: Users can collaborate by adding comments and attachments to tasks.

## Technology Stack

- Backend: Node.js, Express.js
- Database: MongoDB (in-memory MongoDB used for testing)
- Testing: Jest & Supertest

## Installation
- Clone the repository:

```bash
git clone https://github.com/sdshone/task-tracking-app
cd task-tracker
```

- Install dependencies:

```bash
npm install
```

- Environment Configuration:

Create a .env file in the root directory with the following variables:

```plaintext
MONGO_URI=<your-mongo-uri>
PORT=5000
```
- Run the server:

```bash
node server.js
```

## API Endpoints

### Authentication
- Register a User
```
POST /api/auth/register
```

- Login a User
```
POST /api/auth/login
```

- User Profile
```
GET /api/auth/profile
```

### Task Management
- Create a Task
```
POST /api/tasks
```
- Get All Tasks
```
GET /api/tasks
```
- Update a Task
```
PUT /api/tasks/:taskId
```

- Delete a Task
```
DELETE /api/tasks/:taskId
```

## Testing

To run the tests, use:

```bash
npm test
```
The tests are configured with an in-memory MongoDB instance using mongodb-memory-server to prevent actual database interactions during testing.

### Testing Features
- Authentication and registration flows.
- CRUD operations for tasks.
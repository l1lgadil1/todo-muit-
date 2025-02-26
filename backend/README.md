# Todo Application Backend

A Spring Boot backend for a Todo application with Pomodoro Timer functionality.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Task API](#task-api)
  - [Pomodoro API](#pomodoro-api)
- [Database](#database)
- [Project Structure](#project-structure)

## Features

- Complete task management (CRUD operations)
- Task status tracking (Todo, In Progress, Completed)
- Pomodoro session management
- Task-Pomodoro relationship
- Date range filtering for pomodoro sessions
- H2 in-memory database with persistence

## Technology Stack

- Java 17
- Spring Boot 3.2.3
- Spring Data JPA
- Hibernate
- H2 Database
- Lombok
- MapStruct
- Maven

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-list/backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

### Running the Application

1. Start the application:
   ```bash
   mvn spring-boot:run
   ```

2. The application will be available at:
   - API: http://localhost:8080/api
   - H2 Console: http://localhost:8080/api/h2-console

   H2 Console credentials:
   - JDBC URL: `jdbc:h2:file:./data/todo-db`
   - Username: `sa`
   - Password: `password`

## API Documentation

### Task API

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/tasks` | Get all tasks | - | Array of Task objects |
| GET | `/api/tasks/{id}` | Get task by ID | - | Task object |
| GET | `/api/tasks/status/{status}` | Get tasks by status | - | Array of Task objects |
| POST | `/api/tasks` | Create new task | Task object | Created Task object |
| PUT | `/api/tasks/{id}` | Update task | Task object | Updated Task object |
| PATCH | `/api/tasks/{id}/status` | Update task status | - | Updated Task object |
| DELETE | `/api/tasks/{id}` | Delete task | - | No content |

#### Task Object Structure

```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the Todo app",
  "status": "IN_PROGRESS",
  "createdAt": "2023-06-15T10:30:00",
  "updatedAt": "2023-06-15T14:45:00",
  "completedAt": null,
  "estimatedPomodoros": 4,
  "completedPomodoros": 2
}
```

### Pomodoro API

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/pomodoros/tasks/{taskId}/start` | Start new pomodoro session | - | Pomodoro Session object |
| POST | `/api/pomodoros/{sessionId}/complete` | Complete pomodoro session | - | Pomodoro Session object |
| GET | `/api/pomodoros/tasks/{taskId}` | Get sessions by task | - | Array of Pomodoro Session objects |
| GET | `/api/pomodoros/tasks/{taskId}/range` | Get sessions by date range | - | Array of Pomodoro Session objects |
| GET | `/api/pomodoros/{sessionId}` | Get session by ID | - | Pomodoro Session object |
| DELETE | `/api/pomodoros/{sessionId}` | Delete session | - | No content |

#### Pomodoro Session Object Structure

```json
{
  "id": 1,
  "taskId": 1,
  "startTime": "2023-06-15T10:30:00",
  "endTime": "2023-06-15T10:55:00",
  "durationMinutes": 25,
  "type": "WORK",
  "completed": true
}
```

## Database

The application uses an H2 database with file persistence. The database file is stored in the `./data/todo-db` location.

### Database Schema

#### Tasks Table
- `id` (Long, PK)
- `title` (String, Not Null)
- `description` (String)
- `status` (Enum: TODO, IN_PROGRESS, COMPLETED)
- `created_at` (DateTime)
- `updated_at` (DateTime)
- `completed_at` (DateTime)
- `estimated_pomodoros` (Integer)
- `completed_pomodoros` (Integer)

#### Pomodoro Sessions Table
- `id` (Long, PK)
- `task_id` (Long, FK to Tasks)
- `start_time` (DateTime)
- `end_time` (DateTime)
- `duration_minutes` (Integer)
- `type` (Enum: WORK, SHORT_BREAK, LONG_BREAK)
- `completed` (Boolean)

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── todoapp/
│   │   │           ├── TodoApplication.java
│   │   │           ├── controller/
│   │   │           │   ├── TaskController.java
│   │   │           │   └── PomodoroController.java
│   │   │           ├── dto/
│   │   │           │   ├── TaskDTO.java
│   │   │           │   └── PomodoroSessionDTO.java
│   │   │           ├── model/
│   │   │           │   ├── Task.java
│   │   │           │   ├── TaskStatus.java
│   │   │           │   ├── PomodoroSession.java
│   │   │           │   └── PomodoroType.java
│   │   │           ├── repository/
│   │   │           │   ├── TaskRepository.java
│   │   │           │   └── PomodoroSessionRepository.java
│   │   │           └── service/
│   │   │               ├── TaskService.java
│   │   │               ├── PomodoroService.java
│   │   │               └── impl/
│   │   │                   ├── TaskServiceImpl.java
│   │   │                   └── PomodoroServiceImpl.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
``` 
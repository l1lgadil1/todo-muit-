# 📝 Modern Todo List Application

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.0.5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.2.3-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Java-17-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java" />
</div>

<div align="center">
  <p>A feature-rich, modern Todo List application built with React, TypeScript, and Spring Boot.</p>
  <p>Современное приложение для управления задачами, созданное с использованием React, TypeScript и Spring Boot.</p>
</div>

## ✨ Features

- 📋 **Task Management**: Create, update, complete, and delete tasks
- 🔍 **Task Filtering**: Filter tasks by completion status and search by name
- 🔄 **Drag and Drop**: Reorder tasks with intuitive drag and drop functionality
- 🌓 **Theme Switching**: Toggle between light and dark themes
- 🌐 **Internationalization**: Support for English and Russian languages
- ⏱️ **Pomodoro Timer**: Built-in Pomodoro technique timer for productivity
- 💾 **Persistent Storage**: Tasks are saved to both localStorage and database
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔄 **Full-Stack Application**: Frontend with React, backend with Spring Boot
- 📚 **API Documentation**: Swagger UI for easy API exploration

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Java 17 or higher
- Maven

### Installation

#### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-list.git
   cd todo-list
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the application:
   ```bash
   ./mvnw clean install
   ```

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

4. The backend API will be available at `http://localhost:8080/api`
5. Access the Swagger UI at `http://localhost:8080/api/swagger-ui.html`
6. Access the H2 Database Console at `http://localhost:8080/api/h2-console`

## 🏗️ Project Structure

### Frontend

The frontend follows the Feature-Sliced Design (FSD) architecture:

```
src/
├── app/          # Application initialization and configuration
├── features/     # Business features (task management, pomodoro, etc.)
├── entities/     # Business entities (task, user, etc.)
├── widgets/      # Composite components for pages
├── shared/       # Shared utilities, types, and UI components
│   ├── i18n/     # Internationalization (English and Russian)
│   └── ...
└── assets/       # Static assets (images, fonts, etc.)
```

### Backend

The backend follows a standard Spring Boot architecture:

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── todoapp/
│   │   │           ├── config/       # Application configuration
│   │   │           ├── controller/   # REST API endpoints
│   │   │           ├── dto/          # Data Transfer Objects
│   │   │           ├── model/        # Domain entities
│   │   │           ├── repository/   # Data access layer
│   │   │           ├── service/      # Business logic
│   │   │           └── TodoApplication.java
│   │   └── resources/
│   │       └── application.properties # Application configuration
│   └── test/                         # Unit and integration tests
└── pom.xml                           # Maven dependencies
```

## 🧰 Tech Stack

### Frontend
- **Framework**: React, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Architecture**: Feature-Sliced Design (FSD)
- **Internationalization**: Custom i18n implementation with English and Russian support

### Backend
- **Framework**: Spring Boot 3.2.3
- **Language**: Java 17
- **Database**: H2 (embedded)
- **API Documentation**: SpringDoc OpenAPI (Swagger)
- **Data Access**: Spring Data JPA
- **Validation**: Spring Validation
- **Utilities**: Lombok, MapStruct

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run preview` - Preview the production build locally

### Backend
- `./mvnw clean install` - Build the application
- `./mvnw spring-boot:run` - Run the application
- `./mvnw test` - Run tests

## 🌐 API Endpoints

The backend provides the following REST API endpoints:

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get a task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

### Pomodoro
- `GET /api/pomodoro` - Get pomodoro settings
- `POST /api/pomodoro` - Update pomodoro settings
- `POST /api/pomodoro/start` - Start a pomodoro session
- `POST /api/pomodoro/stop` - Stop a pomodoro session

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [H2 Database](https://www.h2database.com/)
- [SpringDoc OpenAPI](https://springdoc.org/)

#  task-manager
## Description du projet
This project consists of developing a full-stack web application for project and task management with an authentication system.

## Tech Stack

### Backend
- Spring Boot 3.2.0
- Java 17
- Gradle 8.5
- Spring Security
- JWT Authentication

### Frontend
- Vue.js
- Vite
- Axios

### Database
- MySQL

##  Fonctionnalités principales

User authentication (login with email and password)

Securing routes using a JWT token system

Creation and management of projects

Viewing the list of user projects

Displaying project details

Adding tasks to a project

Marking tasks as completed

Automatic calculation of project progress


## Clone the Repository


git clone https://github.com/YAGOUBIOumaymaa/task-manager.git

cd task-manager



##  Database Configuration
### Create a MySQL database:

CREATE DATABASE task_manager;
### Update database credentials in:

src/main/resources/application.properties

## Run Backend

./gradlew bootRun

### Backend will run on:

http://localhost:8080

## Frontend Setup

cd frontend
npm install
npm run dev


### Frontend will run on:

http://localhost:5173

## Authentication

Email: test@example.com

Password: password123


## Project Progress


For each project, the application calculates:

Total number of tasks(on backend)

Number of completed tasks

Progress percentage

Progress percentage
   





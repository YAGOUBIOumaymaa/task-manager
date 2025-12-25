#  task-manager

This project consists of developing a full-stack web application for project and task management with an authentication system.

## Demo

https://drive.google.com/drive/folders/1tMezDRaI1R6hUkrZwXKtbhWsQDkTVMnn?usp=drive_link

## Technologies Used

### Backend
- Spring Boot 3.2.0
- Java 17
- Gradle 8.5
- Spring Security
- JWT Authentication

### Frontend
- React
- Vite
- Axios
- Tailwind CSS

### Database
- MySQL

##  Features

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

cd task-manager-frontend

npm install

npm run dev


### Frontend will run on:

http://localhost:5173

## Authentication

Email: test@example.com

Password: password123


## Project Progress


For each project, the application calculates:

Total number of tasks

Number of completed tasks

Progress percentage

##Task Manager Endpoints
##AUTHENTICATION

POST ➜ /api/auth/login ➜ User login

##PROJECTS

GET ➜ /projects ➜ List projects

POST ➜ /projects ➜ Create a project

GET ➜ /projects/{id} ➜ Project details

DELETE ➜ /projects/{id} ➜ Delete a project

GET ➜ /projects/{projectId}/progress ➜ Project progress

##TASKS

GET ➜ /projects/{projectId}/tasks ➜ List tasks

POST ➜ /projects/{projectId}/tasks ➜ Create a task

GET ➜ /projects/{projectId}/tasks/{taskId} ➜ Task details

PUT ➜ /projects/{projectId}/tasks/{taskId} ➜ Update a task

DELETE ➜ /projects/{projectId}/tasks/{taskId} ➜ Delete a task




   





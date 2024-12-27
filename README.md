
# Project Manager API

## Description

This is a backend API for managing user authentication, project management, and contact form submissions. The project is built using Node.js (Express) and uses MySQL as the database. The API includes endpoints for user sign-up and login with JWT authentication, managing projects (creating, viewing, filtering), and submitting queries through a contact form.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Deployment](#deployment-optional)
- [Technologies](#technologies)

## Installation

### Prerequisites

- Node.js
- MySQL

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/Supriya9002/Project-Manager-API
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following variables:
    ```env
    DB_URL= your_database
    JWT_SECRET=your-jwt-secret
    Port=3000
    ```

4. Set up the MySQL database and tables as described in the database setup section.

## Environment Variables

- `DB_URL`: The host of your database (e.g., `localhost`).
- `JWT_SECRET`: A secret key for signing JWT tokens.
- `Port`: The port to run the application on (default is 3000).

## Running the Application

To start the application, run:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

### User Authentication

1. **POST** `/api/users/signup`
   - Create a new user account.
   - **Request Body**: 
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Response**: 
     ```json
     {
       "status": true,
       "message": "SignUp Successful",
       "data": {
         "name": "John Doe",
         "email": "john@example.com",
         "_id": "user-id"
       }
     }
     ```

2. **POST** `/api/users/login`
   - Authenticate a user and return a JWT token.
   - **Request Body**: 
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Response**: 
     ```json
     {
       "status": true,
       "message": "Token Created",
       "data": "jwt-token-here"
     }
     ```

3. **GET** `/api/users/logOut`
   - Log out the user by removing the session token.
   - **Response**: 
     ```json
     {
       "status": true,
       "message": "Account Logout Successful"
     }
     ```

4. **GET** `/api/users/AllLogOut`
   - Log out all sessions for a user.
   - **Response**: 
     ```json
     {
       "status": true,
       "message": "All Account Logout Successful"
     }
     ```

### Project Management

1. **POST** `/api/project/createProject`
   - Add a new project.
   - **Request Body**: 
     ```json
     {
       "userID": "user-id",
       "name": "Project Title",
       "description": "Detailed project description.",
       "startDate": "2024-01-01",
       "endDate": "2024-12-31"
     }
     ```
   - **Response**: 
     ```json
     {
       "status": true,
       "message": "Project Added",
       "data": {
         "_id": "project-id",
         "userID": "user-id",
         "name": "Project Title",
         "description": "Detailed project description.",
         "startDate": "2024-01-01",
         "endDate": "2024-12-31"
       }
     }
     ```

2. **GET** `/api/project/getAllProject`
   - Fetch all projects with optional filters by start and end date.
   - **Query Parameters**:
     - `startDate`: Filter projects by start date.
     - `endDate`: Filter projects by end date.
   - **Response**: 
     ```json
     {
       "status": true,
       "message": "Get all Projects",
       "data": [
         {
           "_id": "project-id",
           "userID": "user-id",
           "name": "Project Title",
           "description": "Detailed project description.",
           "startDate": "2024-01-01",
           "endDate": "2024-12-31"
         }
       ]
     }
     ```
   
3. **GET** `/api/project/getProjectByID/{ProjectID}`
   - Fetch a specific project by its ID.
   - **Response**: 
     ```json
     {
       "status": true,
       "message": "Get Project Successful",
       "data": {
         "_id": "project-id",
         "userID": "user-id",
         "name": "Project Title",
         "description": "Detailed project description.",
         "startDate": "2024-01-01",
         "endDate": "2024-12-31"
       }
     }
     ```

### Contact Form

1. **POST** `/api/query/storeQuery`
   - Store a query submitted by the user.
   - **Request Body**:
     ```json
     {
       "name": "Jane Doe",
       "email": "jane@example.com",
       "message": "I need more information."
     }
     ```
   - **Response**: 
     ```json
     {
       "status": true,
       "message": "Query Submitted Successfully",
       "data": {
         "name": "Jane Doe",
         "email": "jane@example.com",
         "message": "I need more information."
       }
     }
     ```

## Testing with Postman

You can test all the API endpoints using Postman by importing the provided Postman collection. [Postman](https://cloudy-desert-66836.postman.co/workspace/Supriya-Haldar~3aa99702-245f-47d7-9b5d-5844a41c4096/collection/30849931-44aff414-0eb6-4a52-bbde-2a3061ba756d?action=share&creator=30849931)

### Swagger Documentation

You can also access the API documentation in Swagger UI by navigating to:

```
http://localhost:3000/api-docs
```

This will provide you with a comprehensive view of all the available endpoints, their request formats, and response examples.

## Deployment

You can deploy this application on platforms like [Render](https://project-manager-api-3.onrender.com) for a live demo.

## Technologies

- **Backend Framework**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT
- **API Documentation**: Swagger
- **Miscellaneous**: bcrypt, dotenv, mongoose


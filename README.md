
# Project Manager API

## Description

This is a backend API for managing user authentication, project management, and contact form submissions. The project is built using Node.js (Express) and uses MySQL as the database. The API includes endpoints for user sign-up and login with JWT authentication, managing projects (creating, viewing, filtering), and submitting queries through a contact form.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Deployment (Optional)](#deployment-optional)
- [Technologies](#technologies)
- [License](#license)

## Installation

### Prerequisites

- Node.js
- MySQL

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/Supriya9002/projectmanagerapi.git 
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
       "message": "User created successfully"
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
       "token": "jwt-token-here"
     }
     ```

3. **GET** `/api/users/logOut`
   - Log out the user by removing the session token.

4. **GET** `/api/users/AllLogOut`
   - Log out all sessions for a user.

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
       "message": "Project created successfully"
     }
     ```

2. **GET** `/api/project/getAllProject`
   - Fetch all projects with optional filters by start and end date.
   - **Query Parameters**:
     - `startDate`: Filter projects by start date.
     - `endDate`: Filter projects by end date.

3. **GET** `/api/project/getProjectByID/{ProjectID}`
   - Fetch a specific project by its ID.

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
       "message": "Query submitted successfully"
     }
     ```

## Testing with Postman

You can test all the API endpoints using Postman by importing the provided Postman collection. [Postman](https://cloudy-desert-66836.postman.co/workspace/Supriya-Haldar~3aa99702-245f-47d7-9b5d-5844a41c4096/collection/30849931-dc8d373c-ee11-4de6-97b8-1088a898d5aa?action=share&creator=30849931)

### Swagger Documentation

You can also access the API documentation in Swagger UI by navigating to:

```
http://localhost:3000/api-docs
```

This will provide you with a comprehensive view of all the available endpoints, their request formats, and response examples.

## Deployment

You can deploy this application on platforms like [Render](https://render.com) for a live demo.


## Technologies

- **Backend Framework**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT
- **API Documentation**: Swagger
- **Miscellaneous**: bcrypt, dotenv, mongoose

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

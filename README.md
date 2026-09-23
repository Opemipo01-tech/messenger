# Messaging App

A full-stack messaging application built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

The app allows users to create accounts, log in, find other users, customize their profiles, and send messages to other users.

## Features

* User registration and login
* JWT-based authentication
* Protected API routes
* Search for users
* One-to-one messaging
* User profiles
* Edit profile information
* Responsive interface
* Password hashing with bcrypt
* PostgreSQL database with Prisma ORM

## Tech Stack

### Frontend

* React
* Vite
* React Router
* CSS

### Backend

* Node.js
* Express.js
* Passport.js
* JWT
* Prisma
* PostgreSQL
* bcrypt

## Project Structure

```text
messaging-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   └── ...
│
└── backend/
    ├── controllers/
    ├── routes/
    ├── middleware/
    ├── prisma/
    └── ...
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd messaging-app
```

### 2. Install dependencies

Install dependencies in both the frontend and backend:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the backend and add your database connection string and JWT secret.

For the frontend, create a `.env` file containing your backend API URL:

```env
VITE_BACKEND_API_URL=http://localhost:3000/api
```

### 4. Set up the database

Run your Prisma migrations:

```bash
npx prisma migrate dev
```

### 5. Start the backend

```bash
npm run dev
```

### 6. Start the frontend

In the frontend directory:

```bash
npm run dev
```

Open the local development URL provided by Vite in your browser.

## How It Works

Users first create an account or log in. After authentication, the application stores a JWT which is used to access protected backend endpoints.

From the main page, users can:

* Search for other registered users
* Select a user to open a conversation
* Send messages
* View previous messages
* Open their profile
* Update their profile information

## API Endpoints

### Authentication

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Register a new user  |
| POST   | `/api/auth/login`    | Log in               |
| GET    | `/api/auth/me`       | Get the current user |

### Users

| Method | Endpoint                  | Description                   |
| ------ | ------------------------- | ----------------------------- |
| GET    | `/api/users`              | Get users                     |
| GET    | `/api/users?search=query` | Search users                  |
| GET    | `/api/users/:id`          | Get a user's profile          |
| PATCH  | `/api/users/profile`      | Update current user's profile |

### Messages

| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| POST   | `/api/messages`         | Send a message     |
| GET    | `/api/messages/:userId` | Get a conversation |

## What I Learned

This project helped me practice:

* Building a full-stack React and Node.js application
* JWT authentication and protected routes
* Passport.js authentication strategies
* REST API design
* Prisma relationships
* PostgreSQL
* Form validation
* React state and effects
* Connecting a React frontend to an Express backend
* Handling API errors on the frontend
* Building responsive UI


## License

This project was created for learning purposes as part of The Odin Project.

# Secure Money Transfer Web Application

This is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React, and Node.js). It allows users to securely sign up, log in, and transfer money to other registered users. The application features real-time balance updates, secure transactions, and a responsive user interface.

---

## Features

- **Secure Authentication**: JWT-based authentication with tokens stored in local storage.
- **Money Transfers**: Users can transfer money securely using MongoDB sessions for ACID compliance.
- **Real-Time Balance Updates**: The dashboard displays the user’s current balance, which updates in real-time.
- **Schema Validation**: Zod is used for robust schema validation on both the frontend and backend.
- **Middleware**: Custom middleware for JWT authentication.
- **CORS**: Enabled for secure cross-origin communication.
- **Search Functionality**: Users can search for other users by username.
- **Error Handling**: Robust error handling for invalid transactions and inputs.
- **Testing**: APIs tested using Postman.

---

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with sessions for secure transactions)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Middleware**: Custom authentication middleware
- **CORS**: Enabled for cross-origin access
- **Testing**: Postman

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
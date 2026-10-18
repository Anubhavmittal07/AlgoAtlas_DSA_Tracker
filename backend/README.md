# ⚡ AlgoAtlas Backend API

Secure Authentication and User Management REST API for the **AlgoAtlas / Sorting Visualizer** application. Built using **Node.js**, **Express.js**, **MongoDB (Mongoose)**, and **JWT** stored in secure HTTP-only cookies.

---

## 📌 Features

- **User Authentication**: Secure Sign-Up and Log-In workflows with input validation.
- **Password Security**: Strong hashing with `bcryptjs` using automatic salt generation.
- **HTTP-Only Cookies**: JWT tokens are transmitted via `httpOnly`, `sameSite: 'lax'` cookies to prevent client-side XSS attacks.
- **Database-Backed Session Verification (`/api/auth/me`)**: Validates active cookie sessions and fetches live user profile details directly from MongoDB without requiring client-side `localStorage`.
- **Protected Middleware (`authMiddleware`)**: Reusable middleware to guard authenticated routes and attach the current database user to `req.user`.
- **CORS Configured**: Pre-configured for seamless frontend integration with credentials support.
- **Centralized Error Handling**: Standardized error responses across all routes.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime environment |
| **Express.js (v5)** | Web framework for routing and middleware |
| **MongoDB & Mongoose (v9)** | NoSQL database & Object Data Modeling (ODM) |
| **JSONWebToken (JWT)** | Stateless authentication token generation & verification |
| **bcryptjs** | Password salting and hashing |
| **cookie-parser** | Parsing signed and unsigned HTTP cookies |
| **cors** | Cross-Origin Resource Sharing handling |
| **dotenv** | Environment variable management |
| **nodemon** | Auto-reloading development server |

---

## 📁 Directory Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/              # Future controller handlers
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js    # JWT verification & MongoDB user lookup
│   ├── models/
│   │   └── user.model.js         # Mongoose User schema & validations
│   ├── routers/
│   │   ├── auth.router.js        # Auth routes (/signup, /login, /me, /logout)
│   │   └── user.routes.js        # User management routes
│   ├── utils/
│   │   ├── generateToken.js      # JWT signing utility
│   │   └── sendToken.js          # HTTP-only cookie dispatch utility
│   └── app.js                    # Express application setup & middleware
├── .env                          # Secret environment variables (git-ignored)
├── package.json                  # Dependencies & scripts
├── README.md                     # Backend documentation
└── server.js                     # Application entry point & server listener
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the `backend/` directory:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database_name>
JWT_SECRET=your_super_secret_random_jwt_key_here
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

### Variables Explanation

| Variable | Description | Example / Default |
|---|---|---|
| `PORT` | Port number on which the Express server listens | `8000` |
| `MONGODB_URI` | MongoDB Atlas or local MongoDB connection string | `mongodb://localhost:27017/dsa` |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens | Long random hex string |
| `JWT_EXPIRES_IN` | Token validity duration | `1d` |
| `NODE_ENV` | Application environment (`development` or `production`) | `development` |

---

## 🚀 Getting Started

### 1. Navigate to the backend folder
```bash
cd frontent/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file based on the template above.

### 4. Start the server

#### Development Mode (Auto-restart on change):
```bash
npx nodemon server.js
```

#### Production Mode:
```bash
node server.js
```

Once started successfully, the console will output:
```text
Database Connected
server started as 8000
```

---

## 📡 API Reference

Base URL: `http://localhost:8000/api/auth`

> **Note:** For all requests involving cookies (`/me`, `/logout`, or frontend `fetch` calls), make sure `credentials: 'include'` is set on the client side.

---

### 1. User Sign Up
Registers a new user, hashes the password, stores in MongoDB, issues an HTTP-only JWT cookie, and returns the created user object.

- **URL:** `POST /api/auth/signup`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Ankit Modi",
    "email": "ankit@example.com",
    "password": "Password@123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "660c1f2e8b23a1a45f091234",
      "name": "Ankit Modi",
      "email": "ankit@example.com"
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request` – Missing fields or User already exists.
  - `500 Internal Server Error` – Database or validation error.

---

### 2. User Log In
Authenticates credentials, sets an HTTP-only session cookie (`token`), and returns user information.

- **URL:** `POST /api/auth/login`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "ankit@example.com",
    "password": "Password@123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "login successfully",
    "user": {
      "_id": "660c1f2e8b23a1a45f091234",
      "name": "Ankit Modi",
      "email": "ankit@example.com"
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request` – Missing email or password.
  - `401 Unauthorized` – Invalid email or incorrect password.

---

### 3. Get Current User (`/me`)
Protected endpoint. Reads the JWT from the `token` cookie, queries MongoDB, and returns the logged-in user profile. Used by frontend `AuthContext` on page load/refresh.

- **URL:** `GET /api/auth/me`
- **Credentials:** Cookie required (`token=<jwt>`)
- **Response (200 OK):**
  ```json
  {
    "user": {
      "_id": "660c1f2e8b23a1a45f091234",
      "name": "Ankit Modi",
      "email": "ankit@example.com",
      "createdAt": "2026-10-18T14:00:00.000Z",
      "updatedAt": "2026-10-18T14:00:00.000Z"
    }
  }
  ```
- **Error Responses:**
  - `401 Unauthorized` – No token provided, invalid token, or user no longer exists.

---

### 4. User Log Out
Clears the authentication cookie from the client's browser.

- **URL:** `GET /api/auth/logout`
- **Response (200 OK):**
  ```json
  {
    "message": "Logout successful"
  }
  ```

---

## 🔒 Security Practices Implemented

1. **HTTP-Only Cookies**: Prevents client scripts (`document.cookie`) from accessing the JWT, defending against Cross-Site Scripting (XSS).
2. **Password Salting & Hashing**: Passwords are never stored in plain text. Salting ensures duplicate passwords hash differently.
3. **Database Projection**: Password field has `{ select: false }` in Mongoose schema to prevent accidental password leaks in queries.
4. **CORS Whitelist**: Configured in `app.js` to only accept requests originating from the trusted frontend client (`http://localhost:5173`) with `credentials: true`.
5. **Cookie Expiration**: Cookie lifespan is synced with JWT expiration (`1 day`).

---

## 👨‍💻 Author & License

- **Project:** AlgoAtlas / Sorting Visualizer
- **License:** ISC

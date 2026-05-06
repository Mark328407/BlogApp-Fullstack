# S87 Blog Application - Backend API

A RESTful backend API for a Blog Application built with Node.js, Express.js, and MongoDB. Supports user authentication with JWT and full CRUD operations for blog posts.

---

## App Description

This backend API powers a Blog Application where:
- Anyone can **view** all posts or a single post
- Registered users can **create**, **edit**, and **delete** their own posts
- Admins can **delete any post**
- Passwords are securely **hashed** using bcryptjs
- Authentication is handled via **JWT tokens**

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs



## Setup

### 1. Install dependencies
```bash
cd server
npm install
```

### 2. Create your `.env` file
```bash
cp .env.example .env
```

Fill in the values:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/s87_blog
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
```

### 3. Run the server
```bash
# Development
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`

---

## Test Credentials

> Register users via the API. To promote a user to **admin**, update their role directly in MongoDB after registering.

| Role  | Email             | Password  |
|-------|-------------------|-----------|
| Admin | admin@blog.com    | admin123  |
| User  | user@blog.com     | user1234  |

To set admin role in MongoDB shell:
```js
db.users.updateOne({ email: "admin@blog.com" }, { $set: { role: "admin" } })
```

---

## API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint           | Access  | Description                             |
|--------|--------------------|---------|-----------------------------------------|
| POST   | /api/auth/register | Public  | Register with username, email, password |
| POST   | /api/auth/login    | Public  | Login and receive JWT token             |
| GET    | /api/auth/me       | Private | Get current logged-in user              |

### Post Routes — `/api/posts`

| Method | Endpoint         | Access                | Description        |
|--------|------------------|-----------------------|--------------------|
| GET    | /api/posts       | Public                | Get all blog posts |
| GET    | /api/posts/:id   | Public                | Get a single post  |
| POST   | /api/posts       | Private               | Create a new post  |
| PUT    | /api/posts/:id   | Private (owner)       | Update own post    |
| DELETE | /api/posts/:id   | Private (owner/admin) | Delete a post      |

---

## Request & Response Examples

### Register
**POST** `/api/auth/register`
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123"
}
```
**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "<jwt_token>",
  "user": { "_id": "...", "username": "johndoe", "email": "john@example.com", "role": "user" }
}
```

### Login
**POST** `/api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "<jwt_token>",
  "user": { ... }
}
```

### Get Current User
**GET** `/api/auth/me`
Headers: `Authorization: Bearer <jwt_token>`
```json
{
  "success": true,
  "user": { "_id": "...", "username": "johndoe", "email": "john@example.com", "role": "user" }
}
```

### Create Post
**POST** `/api/posts` — Headers: `Authorization: Bearer <jwt_token>`
```json
{ "title": "My First Post", "content": "This is the content of my blog post." }
```
**Response (201):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "post": { "_id": "...", "title": "My First Post", "content": "...", "author": { "username": "johndoe", "email": "john@example.com" } }
}
```

### Update Post
**PUT** `/api/posts/:id` — Headers: `Authorization: Bearer <jwt_token>`
```json
{ "title": "Updated Title", "content": "Updated content goes here." }
```
**Response (200):**
```json
{ "success": true, "message": "Post updated successfully", "post": { ... } }
```

### Delete Post
**DELETE** `/api/posts/:id` — Headers: `Authorization: Bearer <jwt_token>`
```json
{ "success": true, "message": "Post deleted successfully" }
```

---

## Error Handling

All errors return a consistent format:
```json
{ "success": false, "message": "Descriptive error message" }
```

| Status | Meaning                          |
|--------|----------------------------------|
| 400    | Missing or invalid input         |
| 401    | Unauthorized (bad/missing token) |
| 403    | Forbidden (not owner or admin)   |
| 404    | Post or route not found          |
| 409    | Email or username already exists |
| 500    | Internal server error            |

# Blog App — VueJS Frontend

A VueJS 3 frontend for the S87 Blog API. Covers both S88 deliverables:
-  VueJS app with CRUD (Create, Read, Update, Delete posts)
- VueJS app with Authentication (Register, Login, JWT-protected routes)

---

## Tech Stack

- **Framework:** Vue 3 (Composition API + `<script setup>`)
- **State Management:** Pinia
- **Routing:** Vue Router 4
- **HTTP Client:** Axios
- **Build Tool:** Vite

---

## Project Structure

```
src/
├── services/
│   └── api.js          # Axios instance + auth/posts API calls
├── stores/
│   ├── auth.js         # Pinia store: login, register, logout, fetchMe
│   └── posts.js        # Pinia store: CRUD operations
├── router/
│   └── index.js        # Routes + navigation guards
├── views/
│   ├── HomeView.vue
│   ├── LoginView.vue       ← Authentication
│   ├── RegisterView.vue    ← Authentication
│   ├── PostsView.vue       ← Read + Delete
│   ├── PostDetailView.vue  ← Read
│   ├── CreatePostView.vue  ← Create
│   └── EditPostView.vue    ← Update
└── App.vue             # Navbar + global styles
```

---

## Setup

### 1. Make sure the S87 backend is running
```bash
cd server
npm run dev
# Runs on http://localhost:4000
```

### 2. Install and run the frontend
```bash
cd s88-vue
npm install
npm run dev
# Runs on http://localhost:3000
```

> The Vite dev server proxies `/api` requests to `http://localhost:4000`, so no CORS issues.

---

## Features

### Authentication
| Feature | Route | Access |
|---|---|---|
| Register | `/register` | Guest only |
| Login | `/login` | Guest only |
| Auto-fetch user on refresh | — | JWT from localStorage |
| Logout | Navbar button | Logged in |

### CRUD — Posts
| Operation | Route | Access |
|---|---|---|
| List all posts | `/posts` | Public |
| View single post | `/posts/:id` | Public |
| Create post | `/posts/create` | Private (logged in) |
| Edit own post | `/posts/:id/edit` | Private (owner) |
| Delete post | `/posts` or `/posts/:id` | Private (owner or admin) |

---

## Key Implementation Notes

- **JWT stored in `localStorage`** and attached to every request via an Axios interceptor
- **Navigation guards** redirect unauthenticated users away from protected routes
- **`canEdit` logic** checks if the logged-in user is the post owner OR an admin
- **Pinia stores** handle all API calls and loading/error state centrally

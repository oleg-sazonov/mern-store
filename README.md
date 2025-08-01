# MERN Store

A full-stack product management app built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates a modern, production-ready architecture with reusable backend and frontend components.

---

## 🚀 Features

-   **Backend (Express.js + MongoDB)**

    -   Modular Express app structure
    -   Secure MongoDB connection with optimized pooling
    -   Environment-based configuration (.env)
    -   Rate limiting, CORS, Helmet security
    -   RESTful API for product CRUD
    -   Centralized error handling and graceful shutdown
    -   Static file serving for production

-   **Frontend (React + Vite + Chakra UI)**
    -   Modern React with hooks and Zustand state management
    -   Responsive UI with Chakra UI
    -   Optimistic UI updates for product actions
    -   Form validation with Yup
    -   Dark/light mode support
    -   Toast notifications and modals

---

## 📦 Project Structure

```
mern-store/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── frontend/
|   ├── package.json
|   ├── vite.config.js
|   ├── src/
|   └── public/
├── .env
├── package.json
├── server-js-reusability-guide.md
└── README.md
```

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mern-store.git
cd mern-store
```

---

### 2. Install dependencies

```bash
npm install
cd frontend
npm install
cd ..
```

---

### 3. Configure environment variables

-   Copy .env.example to .env and update with your MongoDB URI and other settings:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/products
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

---

### 4. Start the backend server

```bash
npm run dev
```

---

### 5. Start the frontend development server

```bash
cd frontend
npm run dev
```

Backend: http://localhost:5000
Frontend: http://localhost:5173

---

## 🧩 Reusability

-   See server-js-reusability-guide.md for instructions on reusing the backend entry point in other projects.
-   Modular backend and frontend code can be adapted for e-commerce, blog, task management, and more.

---

## 📝 API Endpoints

-   GET /api/products - List all products
-   POST /api/products - Create a new product
-   PATCH /api/products/:id - Update a product
-   DELETE /api/products/:id - Delete a product
-   GET /health - Health check

---

## 🛡️ Security

-   Helmet for HTTP headers
-   Rate limiting for API and general requests
-   CORS configuration for allowed origins
-   Centralized error handling

---

## 📚 Documentation

-   server-js-reusability-guide.md: How to reuse the backend entry point in other projects

---

## 🏗️ Build & Deployment

-   Production build: npm run build
-   Static files served from frontend/dist in production
-   Environment-based configuration for easy deployment

---

## 👨‍💻 Author

-   Oleg Sazonov

---

## 📄 License

-   This project is licensed under the ISC License.

---

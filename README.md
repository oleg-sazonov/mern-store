# MERN Store

A full-stack product management app built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates a modern, production-ready architecture with reusable backend and frontend components.

---

## 🚀 Features

-   **Backend (Express.js + MongoDB)**

    -   Modular Express app structure
    -   Secure MongoDB connection with optimized pooling
    -   Environment-based configuration (.env)
    -   RESTful API for product CRUD
    -   Centralized error handling and graceful shutdown

-   **Frontend (React + Vite + Chakra UI)**
    -   Modern React with hooks and Zustand state management
    -   Responsive UI with Chakra UI
    -   Optimistic UI updates for product actions
    -   Form validation with Yup
    -   Dark/light mode support
    -   Toast notifications and modals

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

## 📝 API Endpoints

-   GET /api/products - List all products
-   POST /api/products - Create a new product
-   PATCH /api/products/:id - Update a product
-   DELETE /api/products/:id - Delete a product
-   GET /health - Health check

---

## 👨‍💻 Author

-   Oleg Sazonov

---

## 📄 License

-   This project is licensed under the ISC License.

---

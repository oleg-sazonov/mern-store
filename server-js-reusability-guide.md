
# Server.js Reusability Guide

## 📄 Overview

Your `server.js` file is designed for maximum reusability across different Express.js projects. It's an ultra-clean entry point that delegates all the heavy lifting to the bootstrap function.

## 🔧 Current Implementation

```javascript
// backend/server.js
import { bootstrap } from "./app.js";

// Bootstrap and start the application
const server = await bootstrap();

// Export for testing or external use
export default server.app;
```

## 🚀 How to Reuse in New Projects

### Step 1: Copy server.js (No Changes Needed)
Your server.js is 100% reusable - copy it exactly as-is to any new project:

```bash
# Copy to your new project
cp backend/server.js new-project/backend/server.js
```

### Step 2: Required Dependencies

Add these dependencies to your new project's `package.json`:

```json
{
  "type": "module",
  "dependencies": {
    "express": "^5.1.0",
    "dotenv": "^17.2.0",
    "cors": "^2.8.5",
    "helmet": "^8.1.0",
    "express-rate-limit": "^8.0.1",
    "compression": "^1.8.1",
    "morgan": "^1.10.1",
    "mongoose": "^8.16.4",
    "express-validator": "^7.2.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
```

### Step 3: Required Directory Structure

```
your-new-project/
├── backend/
│   ├── server.js              # ✅ Copy unchanged
│   ├── app.js                 # ✅ Copy and modify bootstrap function
│   ├── config/                # ✅ Copy entire folder
│   │   ├── cors.js
│   │   ├── db.js
│   │   └── security.js
│   ├── utils/                 # ✅ Copy entire folder
│   │   ├── validation.js
│   │   ├── processHandlers.js
│   │   └── serverStartup.js
│   ├── middleware/            # ✅ Copy entire folder
│   │   ├── errorHandler.js
│   │   └── staticFiles.js
│   ├── routes/                # 🔄 Replace with your routes
│   │   └── index.js
│   ├── models/                # 🔄 Replace with your models
│   └── controllers/           # 🔄 Replace with your controllers
├── .env                       # ✅ Copy and modify
└── package.json               # ✅ Update dependencies
```

### Step 4: Environment Variables

Create a `.env` file with these variables:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database-name
RATE_LIMIT_REQUESTS=100
API_RATE_LIMIT_REQUESTS=50
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Step 5: Package.json Scripts

```json
{
  "scripts": {
    "dev": "nodemon backend/server.js",
    "start": "node backend/server.js",
    "build": "npm install"
  }
}
```

## 🔄 Customization for Different Projects

### E-commerce Project

```javascript
import productRoutes from "./product.route.js";
import orderRoutes from "./order.route.js";
import userRoutes from "./user.route.js";

export const setupRoutes = (app, { generalLimiter, apiLimiter }) => {
    app.use(generalLimiter);
    app.get("/health", (req, res) => res.status(200).json({ status: "OK", service: "E-commerce API" }));
    app.use("/api/products", apiLimiter, productRoutes);
    app.use("/api/orders", apiLimiter, orderRoutes);
    app.use("/api/users", apiLimiter, userRoutes);
};
```

### Blog Project

```javascript
import postRoutes from "./post.route.js";
import commentRoutes from "./comment.route.js";

export const setupRoutes = (app, { generalLimiter, apiLimiter }) => {
    app.use(generalLimiter);
    app.get("/health", (req, res) => res.status(200).json({ status: "OK", service: "Blog API" }));
    app.use("/api/posts", apiLimiter, postRoutes);
    app.use("/api/comments", apiLimiter, commentRoutes);
};
```

### Task Management Project

```javascript
import taskRoutes from "./task.route.js";
import projectRoutes from "./project.route.js";

export const setupRoutes = (app, { generalLimiter, apiLimiter }) => {
    app.use(generalLimiter);
    app.get("/health", (req, res) => res.status(200).json({ status: "OK", service: "Task Manager" }));
    app.use("/api/tasks", apiLimiter, taskRoutes);
    app.use("/api/projects", apiLimiter, projectRoutes);
};
```

## ⚡ Quick Setup Commands

```bash
# 1. Copy your MERN Store template
cp -r mern-store new-project
cd new-project

# 2. Install dependencies
npm install

# 3. Update environment variables
# Edit .env file with your database URL

# 4. Customize routes and models
# Replace backend/models/ with your schemas
# Replace backend/controllers/ with your logic
# Update backend/routes/ with your endpoints

# 5. Start development
npm run dev
```

## ✅ Benefits of This Approach

- **Ultra-Clean Entry Point**: Only 6 lines of code, no business logic.
- **Universal Compatibility**: Works with any Express project.
- **Production Ready**: Proper error handling and testing support.
- **Easy Testing**:

```javascript
import request from 'supertest';
import app from '../backend/server.js';

describe('API Tests', () => {
    test('Health check', async () => {
        const response = await request(app).get('/health').expect(200);
        expect(response.body.status).toBe('OK');
    });
});
```

## 🎯 Migration Checklist

- [ ] Copy `server.js` (no changes needed)  
- [ ] Copy infrastructure files (`app.js`, `config/`, `utils/`, `middleware/`)  
- [ ] Install dependencies  
- [ ] Create `.env` file  
- [ ] Update routes in `index.js`  
- [ ] Create your models and controllers  
- [ ] Test with `npm run dev`  

## 🚀 Success!

Your `server.js` is now ready to power any Express.js application.  
Time to get your new project up and running: **~15 minutes ⚡**

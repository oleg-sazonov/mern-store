import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const __dirname = path.resolve();

console.log("🚀 Starting MERN Store Server...");
console.log(`📍 Environment: ${NODE_ENV}`);

// Validate required environment variables
const requiredEnvVars = ["MONGODB_URI"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error(
        "❌ Missing required environment variables:",
        missingEnvVars.join(", ")
    );
    console.error("💡 Please check your .env file");
    process.exit(1);
}

// Security middleware - Apply helmet first
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https:"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'"],
                fontSrc: ["'self'", "https:"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'"],
                frameSrc: ["'none'"],
            },
        },
        crossOriginEmbedderPolicy: false, // Allow for development
    })
);

// Compression middleware
app.use(compression());

// Logging
if (NODE_ENV === "production") {
    app.use(morgan("combined"));
} else {
    app.use(morgan("dev"));
}

// Rate limiting - more permissive in development
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: NODE_ENV === "production" ? 100 : 1000, // Limit each IP to 100 requests per windowMs in production
    message: {
        error: "Too many requests from this IP, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => NODE_ENV === "development", // Skip in development
});

// API rate limiting (more restrictive)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: NODE_ENV === "production" ? 50 : 500,
    message: {
        error: "Too many API requests from this IP, please try again later.",
    },
    skip: () => NODE_ENV === "development", // Skip in development
});

app.use(limiter);

// Environment-aware CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // In development, allow all origins
        if (NODE_ENV === "development") {
            return callback(null, true);
        }

        // Production CORS
        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
            process.env.FRONTEND_URL,
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    maxAge: 86400,
};

app.use(cors(corsOptions));
console.log("🌐 CORS configured");

// Body parsing with size limits
app.use(
    express.json({
        limit: "10mb",
        verify: (req, res, buf) => {
            // Store raw body for verification if needed
            req.rawBody = buf;
        },
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "10mb",
    })
);

// app.use(express.json()); // Middleware to parse JSON bodies

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: NODE_ENV,
    });
});

// API product routes with additional rate limiting
app.use("/api/products", apiLimiter, productRoutes);
console.log("📋 API routes configured");

// Handle 404 for API routes using a middleware function instead of route pattern
app.use((req, res, next) => {
    // Check if the request path starts with /api/ but wasn't handled by previous routes
    if (req.path.startsWith("/api/")) {
        console.log(`🔍 API 404: ${req.method} ${req.originalUrl}`);
        return res.status(404).json({
            success: false,
            error: "API Not Found",
            message: `API endpoint '${req.originalUrl}' not found`,
            path: req.originalUrl,
            method: req.method,
            availableEndpoints: [
                "GET /api/products - Get all products",
                "POST /api/products - Create new product",
                "PATCH /api/products/:id - Update product",
                "DELETE /api/products/:id - Delete product",
                "GET /health - Health check",
            ],
        });
    }

    // Continue to next middleware for non-API routes
    next();
});

// Serve static files in production
if (NODE_ENV === "production") {
    // Security headers for static files
    app.use(
        express.static(path.join(__dirname, "frontend/dist"), {
            maxAge: "1y", // Cache static assets for 1 year
            setHeaders: (res, path) => {
                if (path.endsWith(".html")) {
                    res.setHeader("Cache-Control", "no-cache");
                }
            },
        })
    );

    // Handle client-side routing
    app.get("*", (req, res) => {
        try {
            res.sendFile(
                path.resolve(__dirname, "frontend", "dist", "index.html"),
                (err) => {
                    if (err) {
                        console.error("Error serving index.html:", err);
                        res.status(500).json({
                            error: "Internal Server Error",
                            message: "Unable to serve the application",
                        });
                    }
                }
            );
        } catch (error) {
            console.error("Unexpected error serving index.html:", error);
            res.status(500).json({
                error: "Internal Server Error",
                message: "Unable to serve the application",
            });
        }
    });
}

// Global error handler
app.use((err, req, res, next) => {
    console.error("Global error handler:", err.stack);

    // Don't expose error details in production
    const message =
        NODE_ENV === "production" ? "Something went wrong!" : err.message;

    res.status(err.status || 500).json({
        error: NODE_ENV === "production" ? "Internal Server Error" : err.name,
        message: message,
        ...(NODE_ENV === "development" && { stack: err.stack }),
    });
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Start server
const startServer = async () => {
    try {
        // Connect to database first
        await connectDB();

        // Start the server
        app.listen(PORT, () => {
            console.log("\n" + "=".repeat(50));
            console.log("🎉 MERN Store Server Started Successfully!");
            console.log("=".repeat(50));
            console.log(`🚀 Server running on port: ${PORT}`);
            console.log(`📊 Environment: ${NODE_ENV}`);
            console.log(`🔗 Health check: http://localhost:${PORT}/health`);

            if (NODE_ENV === "development") {
                console.log(`🌐 Local server: http://localhost:${PORT}`);
                console.log(`📱 Frontend dev: http://localhost:5173`);
                console.log(`🔍 API base: http://localhost:${PORT}/api`);
            }

            console.log("=".repeat(50) + "\n");
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();

export default app;

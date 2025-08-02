import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import compression from "compression";
import morgan from "morgan";
import {
    notFoundHandler,
    globalErrorHandler,
} from "./middleware/errorHandler.js";
import { setupRoutes } from "./routes/index.js";
import { validateEnvironment } from "./utils/validation.js";
import { setupProcessHandlers } from "./utils/processHandlers.js";
import { startServer } from "./utils/serverStartup.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createServerConfig = () => {
    const PORT = process.env.PORT || 5000;
    const NODE_ENV = process.env.NODE_ENV || "development";
    const projectRoot = path.resolve(__dirname, "..");

    return { PORT, NODE_ENV, __dirname: projectRoot };
};

export const createApp = () => {
    const app = express();
    const { NODE_ENV, __dirname } = createServerConfig();

    // Validate environment first
    validateEnvironment();

    console.log("🚀 Starting MERN Store Server...");
    console.log(`📍 Environment: ${NODE_ENV}`);

    // Basic middleware
    setupBasicMiddleware(app, NODE_ENV);

    // Routes
    setupRoutes(app);

    // Error handling
    setupErrorHandling(app, NODE_ENV, __dirname);

    return app;
};

const setupBasicMiddleware = (app, NODE_ENV) => {
    // Compression
    app.use(compression());

    // Logging
    if (NODE_ENV === "production") {
        app.use(morgan("combined"));
    } else {
        app.use(morgan("dev"));
    }

    // Body parsing
    app.use(
        express.json({
            limit: "10mb",
            verify: (req, res, buf) => {
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
};

const setupErrorHandling = (app, NODE_ENV, __dirname) => {
    // 404 handler for API routes
    app.use(notFoundHandler);

    // Global error handler
    app.use(globalErrorHandler);
};

export const bootstrap = async () => {
    try {
        // Setup process handlers first
        setupProcessHandlers();

        // Get server configuration
        const { PORT, NODE_ENV, __dirname } = createServerConfig();

        // Create Express app with all middleware and routes
        const app = createApp();

        if (process.env.NODE_ENV === "production") {
            app.use(express.static(path.join(__dirname, "/frontend/dist")));
            app.get("*", (req, res) => {
                res.sendFile(
                    path.resolve(__dirname, "frontend", "dist", "index.html")
                );
            });
        }

        // Serve static files in production
        // if (NODE_ENV === "production") {
        //     const frontendDistPath = path.join(__dirname, "frontend", "dist");

        //     console.log(`📦 Serving static files from: ${frontendDistPath}`);
        //     app.use(express.static(frontendDistPath));

        //     // Catch-all handler for SPA routing
        //     app.get("*", (req, res) => {
        //         console.log(`📄 Serving React app for: ${req.path}`);
        //         res.sendFile(path.join(frontendDistPath, "index.html"));
        //     });
        // }

        // Start the server
        const server = await startServer(app, PORT, NODE_ENV);

        return { app, server, PORT, NODE_ENV };
    } catch (error) {
        console.error("💥 Failed to bootstrap application:", error.message);
        process.exit(1);
    }
};

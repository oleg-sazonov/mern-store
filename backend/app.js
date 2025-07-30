import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";

import { createCorsConfig } from "./config/cors.js";
import { setupSecurity } from "./config/security.js";
import {
    notFoundHandler,
    globalErrorHandler,
} from "./middleware/errorHandler.js";
import { setupStaticFiles } from "./middleware/staticFiles.js";
import { setupRoutes } from "./routes/index.js";
import { validateEnvironment } from "./utils/validation.js";
import { setupProcessHandlers } from "./utils/processHandlers.js";
import { startServer } from "./utils/serverStartup.js";

dotenv.config();

export const createServerConfig = () => {
    const PORT = process.env.PORT || 5000;
    const NODE_ENV = process.env.NODE_ENV || "development";
    const __dirname = path.resolve();

    return { PORT, NODE_ENV, __dirname };
};

export const createApp = () => {
    const app = express();
    const { NODE_ENV, __dirname } = createServerConfig();

    // Validate environment first
    validateEnvironment();

    console.log("🚀 Starting MERN Store Server...");
    console.log(`📍 Environment: ${NODE_ENV}`);

    // Security middleware
    const { generalLimiter, apiLimiter } = setupSecurity(app, NODE_ENV);

    // Basic middleware
    setupBasicMiddleware(app, NODE_ENV);

    // Routes
    setupRoutes(app, { generalLimiter, apiLimiter });

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

    // CORS
    app.use(cors(createCorsConfig(NODE_ENV)));
    console.log("🌐 CORS configured");

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

    // Static files
    setupStaticFiles(app, NODE_ENV, __dirname);

    // Global error handler
    app.use(globalErrorHandler);
};

export const bootstrap = async () => {
    try {
        // Setup process handlers first
        setupProcessHandlers();

        // Get server configuration
        const { PORT, NODE_ENV } = createServerConfig();

        // Create Express app with all middleware and routes
        const app = createApp();

        // Start the server
        const server = await startServer(app, PORT, NODE_ENV);

        return { app, server, PORT, NODE_ENV };
    } catch (error) {
        console.error("💥 Failed to bootstrap application:", error.message);
        process.exit(1);
    }
};

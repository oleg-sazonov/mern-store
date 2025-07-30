import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const createSecurityConfig = (NODE_ENV) => ({
    helmet: {
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
    },

    rateLimits: {
        general: {
            windowMs: 15 * 60 * 1000,
            max: NODE_ENV === "production" ? 100 : 1000,
            message: {
                error: "Too many requests from this IP, please try again later.",
            },
            standardHeaders: true,
            legacyHeaders: false,
            skip: () => NODE_ENV === "development",
        },
        api: {
            windowMs: 15 * 60 * 1000,
            max: NODE_ENV === "production" ? 50 : 500,
            message: {
                error: "Too many API requests from this IP, please try again later.",
            },
            skip: () => NODE_ENV === "development",
        },
    },
});

export const setupSecurity = (app, NODE_ENV) => {
    const config = createSecurityConfig(NODE_ENV);

    if (NODE_ENV === "production") {
        app.use(helmet(config.helmet));
    }

    return {
        generalLimiter: rateLimit(config.rateLimits.general),
        apiLimiter: rateLimit(config.rateLimits.api),
    };
};

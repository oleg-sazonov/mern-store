export const createCorsConfig = (NODE_ENV) => ({
    origin: (origin, callback) => {
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
});

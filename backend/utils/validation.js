export const validateEnvironment = () => {
    const requiredEnvVars = ["MONGODB_URI"];
    const missingEnvVars = requiredEnvVars.filter(
        (envVar) => !process.env[envVar]
    );

    if (missingEnvVars.length > 0) {
        console.error(
            "❌ Missing required environment variables:",
            missingEnvVars.join(", ")
        );
        console.error("💡 Please check your .env file");
        process.exit(1);
    }
};

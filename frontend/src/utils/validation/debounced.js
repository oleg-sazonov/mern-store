import { validateSingleField } from "./validators.js";

export const createDebouncedValidator = (delay = 300) => {
    let timeoutId = null;

    const validator = (fieldName, value, fullProduct, callback) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(async () => {
            try {
                const result = await validateSingleField(
                    fieldName,
                    value,
                    fullProduct
                );
                callback(result);
            } catch (error) {
                console.error("Validation error:", error);
                callback({
                    isValid: false,
                    error: "Validation failed",
                });
            }
        }, delay);
    };

    validator.cleanup = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };

    return validator;
};

export const createThrottledValidator = (delay = 300) => {
    let lastRun = 0;

    return (fieldName, value, fullProduct, callback) => {
        const now = Date.now();

        if (now - lastRun >= delay) {
            lastRun = now;

            validateSingleField(fieldName, value, fullProduct)
                .then(callback)
                .catch((error) => {
                    console.error("Validation error:", error);
                    callback({ isValid: false, error: "Validation failed" });
                });
        }
    };
};

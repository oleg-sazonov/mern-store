import { productSchema } from "./schemas.js";
import { sanitizeProductData } from "./sanitizers.js";
import { VALIDATION_LIMITS, ERROR_MESSAGES } from "./constants.js";
import {isValidURL} from "./helpers.js";

// Helper function to validate URL format
// const isValidURL = (url) => {
//     try {
//         new URL(url);
//         return true;
//     } catch {
//         return false;
//     }
// };

export const validateProduct = async (product) => {
    try {
        const transformedProduct = sanitizeProductData(product);

        await productSchema.validate(transformedProduct, {
            abortEarly: false,
            stripUnknown: true,
        });

        return {
            isValid: true,
            errors: {},
            sanitizedData: transformedProduct,
        };
    } catch (error) {
        const errors = { name: "", price: "", image: "" };

        if (error.inner && Array.isArray(error.inner)) {
            error.inner.forEach((err) => {
                if (err.path && err.path in errors) {
                    errors[err.path] = err.message;
                }
            });
        }

        return {
            isValid: false,
            errors,
            sanitizedData: sanitizeProductData(product),
        };
    }
};

export const validateSingleField = async (
    fieldName,
    value,
    fullProduct = {}
) => {
    try {
        const testProduct = { ...fullProduct, [fieldName]: value };
        const transformedProduct = sanitizeProductData(testProduct);

        await productSchema.validateAt(fieldName, transformedProduct);
        return { isValid: true, error: "" };
    } catch (error) {
        return {
            isValid: false,
            error: error.message || "Validation error",
        };
    }
};

export const validateProductName = (name) => {
    if (!name || typeof name !== "string") {
        return { isValid: false, error: ERROR_MESSAGES.NAME.REQUIRED };
    }

    const trimmedName = name.trim();

    if (trimmedName.length < VALIDATION_LIMITS.NAME.MIN) {
        return { isValid: false, error: ERROR_MESSAGES.NAME.MIN };
    }

    if (trimmedName.length > VALIDATION_LIMITS.NAME.MAX) {
        return { isValid: false, error: ERROR_MESSAGES.NAME.MAX };
    }

    if (!/^[a-zA-Z0-9\s\-_.,!&()]+$/.test(trimmedName)) {
        return { isValid: false, error: ERROR_MESSAGES.NAME.INVALID };
    }

    return { isValid: true, error: "" };
};

export const validateProductPrice = (price) => {
    if (price === null || price === undefined || price === "") {
        return { isValid: false, error: ERROR_MESSAGES.PRICE.REQUIRED };
    }

    const numPrice = typeof price === "number" ? price : parseFloat(price);

    if (isNaN(numPrice) || !isFinite(numPrice)) {
        return { isValid: false, error: ERROR_MESSAGES.PRICE.TYPE };
    }

    if (numPrice < VALIDATION_LIMITS.PRICE.MIN) {
        return { isValid: false, error: ERROR_MESSAGES.PRICE.POSITIVE };
    }

    if (numPrice > VALIDATION_LIMITS.PRICE.MAX) {
        return { isValid: false, error: ERROR_MESSAGES.PRICE.MAX };
    }

    const decimalPlaces = (numPrice.toString().split(".")[1] || "").length;
    if (decimalPlaces > 2) {
        return {
            isValid: false,
            error: "Price cannot have more than 2 decimal places",
        };
    }

    return { isValid: true, error: "" };
};

export const validateProductImage = (imageUrl) => {
    if (!imageUrl || typeof imageUrl !== "string") {
        return { isValid: false, error: ERROR_MESSAGES.IMAGE.REQUIRED };
    }

    const trimmedUrl = imageUrl.trim();

    if (!isValidURL(trimmedUrl)) {
        return { isValid: false, error: ERROR_MESSAGES.IMAGE.URL };
    }

    if (!VALIDATION_LIMITS.URL_PROTOCOLS.test(trimmedUrl)) {
        return { isValid: false, error: ERROR_MESSAGES.IMAGE.PROTOCOL };
    }

    return { isValid: true, error: "" };
};

// Generic field validator
export const validateField = async (schema, fieldName, value) => {
    try {
        await schema.validateAt(fieldName, { [fieldName]: value });
        return { isValid: true, error: "" };
    } catch (error) {
        return { isValid: false, error: error.message };
    }
};

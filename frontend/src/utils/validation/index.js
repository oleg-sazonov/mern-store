// Constants
export { VALIDATION_LIMITS, ERROR_MESSAGES } from "./constants.js";

// Schemas
export { productSchema, userSchema, categorySchema } from "./schemas.js";

// Core validators
export {
    validateProduct,
    validateSingleField,
    validateProductName,
    validateProductPrice,
    validateProductImage,
    validateField,
} from "./validators.js";

// Import validators for internal use
import { validateProduct, validateSingleField } from "./validators.js";

// Sanitizers
export {
    sanitizeProductData,
    sanitizeName,
    sanitizePrice,
    sanitizeImageUrl,
    sanitizeString,
    sanitizeNumber,
} from "./sanitizers.js";

// Import sanitizers for internal use
import { sanitizeProductData } from "./sanitizers.js";

// Helpers
export {
    isValidURL,
    formatPrice,
    formatCurrency,
    slugify,
    truncateText,
} from "./helpers.js";

// Import helpers for internal use
import { isValidURL, formatPrice, formatCurrency } from "./helpers.js";

// Debounced validation
export {
    createDebouncedValidator,
    createThrottledValidator,
} from "./debounced.js";

// Convenience exports for common use cases
export const validation = {
    product: {
        validate: validateProduct,
        validateField: validateSingleField,
        sanitize: sanitizeProductData,
    },
    helpers: {
        isValidURL,
        formatPrice,
        formatCurrency,
    },
};

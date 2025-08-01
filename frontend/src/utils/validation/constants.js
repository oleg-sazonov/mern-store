export const VALIDATION_LIMITS = {
    NAME: { MIN: 2, MAX: 100 },
    PRICE: { MIN: 0.01, MAX: 999999.99 },
    URL_PROTOCOLS: /^https?:\/\//,
};

export const ERROR_MESSAGES = {
    NAME: {
        REQUIRED: "Product name is required",
        MIN: `Product name must be at least ${VALIDATION_LIMITS.NAME.MIN} characters`,
        MAX: `Product name must be less than ${VALIDATION_LIMITS.NAME.MAX} characters`,
        INVALID: "Product name contains invalid characters",
    },
    PRICE: {
        REQUIRED: "Product price is required",
        TYPE: "Price must be a valid number",
        POSITIVE: `Price must be at least $${VALIDATION_LIMITS.PRICE.MIN}`,
        MAX: `Price must be less than $${VALIDATION_LIMITS.PRICE.MAX.toLocaleString()}`,
    },
    IMAGE: {
        REQUIRED: "Product image URL is required",
        URL: "Please enter a valid URL",
        PROTOCOL: "URL must start with http:// or https://",
        REACHABLE: "Image URL appears to be unreachable",
    },
};

export const sanitizeProductData = (product) => {
    if (!product || typeof product !== "object" || Array.isArray(product)) {
        return {
            name: "",
            price: 0,
            image: "",
        };
    }

    return {
        name: sanitizeName(product.name),
        price: sanitizePrice(product.price),
        image: sanitizeImageUrl(product.image),
    };
};

export const sanitizeName = (name) => {
    if (typeof name === "string") {
        return name.trim().replace(/\s+/g, " ");
    }
    if (name !== null && name !== undefined) {
        return String(name).trim().replace(/\s+/g, " ");
    }
    return "";
};

export const sanitizePrice = (price) => {
    if (typeof price === "number" && !isNaN(price)) {
        return Math.max(0, Math.round(price * 100) / 100);
    }
    if (typeof price === "string" && price.trim() !== "") {
        const parsed = parseFloat(price.trim());
        if (!isNaN(parsed) && isFinite(parsed)) {
            return Math.max(0, Math.round(parsed * 100) / 100);
        }
    }
    return 0;
};

export const sanitizeImageUrl = (image) => {
    if (typeof image === "string") {
        return image.trim();
    }
    if (image !== null && image !== undefined) {
        return String(image).trim();
    }
    return "";
};

// Generic sanitizers for reuse
export const sanitizeString = (value, options = {}) => {
    const { maxLength, allowEmpty = true } = options;

    if (typeof value !== "string") {
        value = value !== null && value !== undefined ? String(value) : "";
    }

    let sanitized = value.trim().replace(/\s+/g, " ");

    if (!allowEmpty && !sanitized) {
        return "";
    }

    if (maxLength && sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }

    return sanitized;
};

export const sanitizeNumber = (value, options = {}) => {
    const { min = 0, max = Infinity, decimals = 2 } = options;

    let num = typeof value === "number" ? value : parseFloat(value);

    if (isNaN(num) || !isFinite(num)) {
        return min;
    }

    num = Math.max(min, Math.min(max, num));
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

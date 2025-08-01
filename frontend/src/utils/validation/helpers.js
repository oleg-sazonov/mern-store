export const isValidURL = (string) => {
    if (!string || typeof string !== "string" || !string.trim()) {
        return false;
    }

    try {
        const url = new URL(string.trim());
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
};

export const formatPrice = (price) => {
    if (typeof price === "number" && !isNaN(price) && isFinite(price)) {
        return price.toFixed(2);
    }
    if (typeof price === "string") {
        const parsed = parseFloat(price);
        if (!isNaN(parsed) && isFinite(parsed)) {
            return parsed.toFixed(2);
        }
    }
    return "0.00";
};

export const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount);
};

export const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
};

export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
};

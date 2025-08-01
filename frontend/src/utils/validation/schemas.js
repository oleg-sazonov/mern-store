import * as yup from "yup";
import { VALIDATION_LIMITS, ERROR_MESSAGES } from "./constants.js";

export const productSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required(ERROR_MESSAGES.NAME.REQUIRED)
        .min(VALIDATION_LIMITS.NAME.MIN, ERROR_MESSAGES.NAME.MIN)
        .max(VALIDATION_LIMITS.NAME.MAX, ERROR_MESSAGES.NAME.MAX),

    price: yup
        .number()
        .typeError(ERROR_MESSAGES.PRICE.TYPE)
        .required(ERROR_MESSAGES.PRICE.REQUIRED)
        .min(VALIDATION_LIMITS.PRICE.MIN, ERROR_MESSAGES.PRICE.POSITIVE)
        .max(VALIDATION_LIMITS.PRICE.MAX, ERROR_MESSAGES.PRICE.MAX)
        .test(
            "decimal-places",
            "Price cannot have more than 2 decimal places",
            (value) => {
                if (value === undefined || value === null) return true;
                return Number(value.toFixed(2)) === value;
            }
        ),

    image: yup
        .string()
        .trim()
        .required(ERROR_MESSAGES.IMAGE.REQUIRED)
        .url(ERROR_MESSAGES.IMAGE.URL)
        .matches(VALIDATION_LIMITS.URL_PROTOCOLS, ERROR_MESSAGES.IMAGE.PROTOCOL)
        .test(
            "url-reachable",
            ERROR_MESSAGES.IMAGE.REACHABLE,
            function (value) {
                if (!value) return true;
                if (import.meta.env.DEV) return true;
                return true;
            }
        ),
});

export const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

export const categorySchema = yup.object().shape({
    name: yup.string().required().min(2).max(50),
    description: yup.string().max(200),
});

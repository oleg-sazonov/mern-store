import { useColorModeValue } from "@/components/ui/color-mode";

export const useInputStyles = () => {
    // Color mode values
    const inputBg = useColorModeValue("white", "gray.600");
    const inputBorderColor = useColorModeValue("gray.300", "gray.500");
    const errorBorderColor = "red.500";
    const errorTextColor = "red.500";
    const textColor = useColorModeValue("gray.600", "gray.200");
    const placeholderColor = useColorModeValue("gray.500", "gray.400");

    const getInputProps = (hasError = false) => ({
        bg: inputBg,
        borderColor: hasError ? errorBorderColor : inputBorderColor,
        color: textColor,
        rounded: "md",
        _placeholder: { color: placeholderColor },
        _focus: {
            borderColor: hasError ? errorBorderColor : "blue.500",
            boxShadow: hasError
                ? "0 0 0 1px var(--chakra-colors-red-500)"
                : "0 0 0 1px var(--chakra-colors-blue-500)",
        },
    });

    return {
        colors: {
            inputBg,
            inputBorderColor,
            errorBorderColor,
            errorTextColor,
            textColor,
            placeholderColor,
        },
        getInputProps,
    };
};

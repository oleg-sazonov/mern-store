import { StrictMode } from "react";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Provider>
                <App />
                <Toaster />
            </Provider>
        </BrowserRouter>
    </StrictMode>
);

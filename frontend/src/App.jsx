import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import { useColorModeValue } from "./components/ui/color-mode";

function App() {
    return (
        <>
            <Box
                minH={"100vh"}
                bg={useColorModeValue("gray.100", "gray.800")}
                boxShadow={"md"}
                borderRadius={"md"}
            >
                <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                    {/* Catch all unmatched routes */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Box>
        </>
    );
}

export default App;

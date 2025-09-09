import React from "react";
import { Box } from "ink";
import { MainContent } from "./components/MainContent.tsx";
import { Composer } from "./components/Composer.tsx";

export const App = () => {
    return (
        <Box flexDirection="column" width="90%">
            <MainContent />
            <Box flexDirection="column">
                <Composer />
            </Box>
        </Box>
    );
};

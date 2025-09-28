import React from "react";
import { Box } from "ink";
import { MainContent } from "./components/MainContent.tsx";
import { Composer } from "./components/Composer.tsx";
import { UIStateContext } from "./context/UIStateContext.tsx";
import { initialState } from "./states/UIState.tsx";
import { AuthUIStateContext } from "./context/AuthUIStateContext.tsx";
import { authInitialState } from "./states/AuthUIState.tsx";

const App = () => {
    return (
        <Box flexDirection="column" width="100%">
            <MainContent />
            <Box flexDirection="column">
                <Composer />
            </Box>
        </Box>
    );
};

export const AppContainer = () => {
    return (
        <UIStateContext.Provider value={initialState}>
            <AuthUIStateContext.Provider value={authInitialState}>
                <App/>
            </AuthUIStateContext.Provider>
        </UIStateContext.Provider>
    );
};

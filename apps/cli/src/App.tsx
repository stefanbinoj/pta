import React, { useState } from "react";
import { Box } from "ink";
import { MainContent } from "./components/MainContent.tsx";
import { Composer } from "./components/Composer.tsx";
import { UIState, UIStateContext } from "./context/UIStateContext.tsx";
import { initialState } from "./states/UIState.tsx";
import { AuthUIStateContext } from "./context/AuthUIStateContext.tsx";
import { authInitialState } from "./states/AuthUIState.tsx";
import { chatWithAI } from "@pta/core";
import type {
    AddMessageType,
    MessageListType,
} from "@pta/core/src/types/message.ts";
import { StreamingState } from "@pta/core/src/types/state.ts";

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
    const [uiState, setUiState] =
        useState<Omit<UIState, "onSubmit">>(initialState);

    const onSubmit = async (value: string) => {
        setUiState((prev) => ({
            ...prev,
            isInputActive: false,
            streamingState: StreamingState.Responding,
            messageQueue: [...prev.messageQueue, { role: "user", content: value }],
        }));

        const AddMessage: AddMessageType = (obj: MessageListType) => {
            setUiState((prev) => ({
                ...prev,
                messageQueue: [...prev.messageQueue, obj],
            }));
        };

        await chatWithAI(value, AddMessage);

        setUiState((prev) => ({
            ...prev,
            isInputActive: true,
            streamingState: StreamingState.Idle,
        }));
    };

    return (
        <UIStateContext.Provider value={{ ...uiState, onSubmit }}>
            <AuthUIStateContext.Provider value={authInitialState}>
                <App />
            </AuthUIStateContext.Provider>
        </UIStateContext.Provider>
    );
};

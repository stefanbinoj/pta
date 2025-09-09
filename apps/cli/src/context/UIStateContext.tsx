import { createContext, useContext } from "react";
import { StreamingState } from "../types/index.tsx";
import { SlashCommand } from "../types/commands.tsx";

export interface UIState {
    messageQueue: string[];
    slashCommands: readonly SlashCommand[];
    streamingState: StreamingState;
    isInputActive: boolean;
    onSubmit: (value: string) => void;
}

export const UIStateContext = createContext<UIState | null>(null);

export const useUIState = () => {
    const context = useContext(UIStateContext);
    if (!context) {
        throw new Error("useUIState must be used within a UIStateProvider");
    }
    return context;
};

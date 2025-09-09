import { createContext, useContext } from "react";
import { StreamingState } from "../types/index.ts";
import { SlashCommand } from "../types/commands.tsx";
import { TextBuffer } from "../types/text-buffer.tsx";

export interface UIState {
    isAuthenticating: boolean;
    authError: string | null;
    isAuthDialogOpen: boolean;
    messageQueue: string[];
    buffer: TextBuffer;
    slashCommands: readonly SlashCommand[];
    streamingState: StreamingState;
    userMessages: string[];
    isInputActive: boolean;
    constrainHeight: boolean;
    showToolDescriptions: boolean;
    ctrlCPressedOnce: boolean;
    showEscapePrompt: boolean;
    isFocused: boolean;
    currentLoadingPhrase: string;
    showWorkspaceMigrationDialog: boolean;
    // New fields for complete state management
    nightly: boolean;
}

export const UIStateContext = createContext<UIState | null>(null);

export const useUIState = () => {
    const context = useContext(UIStateContext);
    if (!context) {
        throw new Error("useUIState must be used within a UIStateProvider");
    }
    return context;
};

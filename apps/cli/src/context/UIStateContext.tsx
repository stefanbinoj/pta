import { createContext, useContext } from "react";
import { SlashCommand } from "../types/commands.tsx";
import type { MessageListType } from "@pta/core/src/types/message.ts";
import { StreamingState } from "@pta/core/src/types/state.ts";

export interface UIState {
    messageQueue: MessageListType[];
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

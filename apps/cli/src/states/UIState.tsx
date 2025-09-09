import { UIState } from "../context/UIStateContext.tsx";
import { StreamingState } from "../types/index.tsx";

export const initialState: UIState = {
    isAuthenticating: false,
    authError: null,
    isAuthDialogOpen: false,
    messageQueue: [],
    buffer: {
        text: "",
        viewportVisualLines: [""],
        setText: () => { },
        visualCursor: [0, 0],
        setVisualCursor: () => { },
        visualScrollRow: 0,
    },
    slashCommands: [],
    streamingState: StreamingState.Idle, // <-- must match StreamingState type
    userMessages: [],
    isInputActive: true,
    constrainHeight: false,
    showToolDescriptions: false,
    ctrlCPressedOnce: false,
    showEscapePrompt: false,
    isFocused: true,
    currentLoadingPhrase: "",
    showWorkspaceMigrationDialog: false,
    nightly: false,
};

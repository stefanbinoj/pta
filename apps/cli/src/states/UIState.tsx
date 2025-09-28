import { UIState } from "../context/UIStateContext.tsx";
import { StreamingState } from "../types/index.tsx";

export const initialState: UIState = {
    messageQueue: ["how are you?", "what is your name?", "tell me a joke"],
    slashCommands: [],
    streamingState: StreamingState.Idle, // <-- must match StreamingState type
    isInputActive: true,
    onSubmit: (value: string) => {},
};

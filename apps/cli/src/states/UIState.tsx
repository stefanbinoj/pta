import { UIState } from "../context/UIStateContext.tsx";
import { StreamingState } from "../types/index.tsx";

export const initialState: Omit<UIState, "onSubmit"> = {
    messageQueue: [],
    slashCommands: [],
    streamingState: StreamingState.Idle,
    isInputActive: true,
};

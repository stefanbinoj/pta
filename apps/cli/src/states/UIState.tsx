import { UIState } from "../context/UIStateContext.tsx";
import { StreamingState } from "@pta/core/src/types/state.ts";

export const initialState: Omit<UIState, "onSubmit"> = {
    messageQueue: [],
    slashCommands: [],
    streamingState: StreamingState.Idle,
    isInputActive: true,
};

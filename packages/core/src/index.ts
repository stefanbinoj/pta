import { main } from "./loop/v1.ts";
import { AddMessageType } from "./types/message.ts";
import { StreamingState } from "./types/state.ts";

export const chatWithAI = async (
    userMessage: string,
    AddMessage: AddMessageType,
    setStreamingState: (state: StreamingState) => void,
) => {
    await main(userMessage, AddMessage, setStreamingState);
};

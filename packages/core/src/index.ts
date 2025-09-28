import { main } from "./loop/v1.ts";
import { AddMessageType } from "./types/message.ts";

export const chatWithAI = async (
    userMessage: string,
    AddMessage: AddMessageType,
) => {
    await main(userMessage, AddMessage);
};

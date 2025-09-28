import { main } from "./loop/v1.ts";

export const chatWithAI = async (userMessage: string) => {
    await main(userMessage);
}

// chatWithAI("Create a task with high priority to submit the report by tomorrow.");

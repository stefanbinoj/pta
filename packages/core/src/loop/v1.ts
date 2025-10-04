import OpenAI from "openai";
import { schema, systemPrompt, tools } from "./loop_system_prompt.ts";
import type { ChatCompletionMessageParam } from "openai/resources/chat";
import { create_task, get_tasks } from "../tools/tasks.ts";
import { AddMessageType } from "../types/message.ts";
import { StreamingState } from "../types/state.ts";

const client = new OpenAI();
const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
];

export const main = async (
    userMessage: string,
    AddMessage: AddMessageType,
    setStreamingState: (state: StreamingState) => void
) => {
    messages.push({ role: "user", content: userMessage });
    setStreamingState(StreamingState.Responding);

    while (true) {
        const completion = await client.chat.completions.create({
            model: "gpt-5-2025-08-07",
            messages: messages,
            response_format: { type: "json_schema", json_schema: schema },
            tools: tools,
        });
        const response = completion.choices[0].message;

        const toolResponse = response?.tool_calls;

        if (toolResponse) {
            setStreamingState(StreamingState.ToolCalling);
            messages.push({ role: "assistant", tool_calls: toolResponse });
            for (const toolCall of toolResponse) {
                if (toolCall.type === "function") {
                    const args = JSON.parse(toolCall.function.arguments);
                    const name = toolCall.function.name;

                    let tool_output_content: any;

                    if (name === "get_tasks") {
                        tool_output_content = get_tasks(args);
                    } else if (name === "create_task") {
                        tool_output_content = create_task(args);
                    } else if (name === "get_emails") {
                        tool_output_content = { success: true, emails: [] };
                    } else if (name === "send_email") {
                        tool_output_content = { success: true, message: "Email sent" };
                    } else if (name === "get_calendar") {
                        tool_output_content = { success: true, events: [] };
                    } else if (name === "block_calendar_time") {
                        tool_output_content = {
                            success: true,
                            message: "Calendar blocked",
                        };
                    } else if (name === "summarize_document") {
                        tool_output_content = {
                            success: true,
                            summary: "This is a summary.",
                        };
                    }

                    const tool_message = {
                        role: "tool" as const,
                        tool_call_id: toolCall.id,
                        content: JSON.stringify(tool_output_content),
                    };
                    messages.push(tool_message);
                } else {
                    console.warn("Unsupported tool call type:", toolCall.type);
                }
            }
            setStreamingState(StreamingState.Responding);
        } else {
            messages.push({
                role: "assistant",
                content: response.content as string,
            });

            const content = JSON.parse(response.content as string);
            const step = content.step;
            const aiContent = content.content;
            AddMessage({ role: "assistant", step: step, content: aiContent });

            if (step === "clarify") {
                setStreamingState(StreamingState.WaitingForConfirmation);
                break;
            }
            if (step === "result") {
                setStreamingState(StreamingState.Idle);
                break;
            }
        }
    }
};

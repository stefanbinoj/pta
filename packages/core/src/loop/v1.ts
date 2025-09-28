import OpenAI from "openai";
import { schema, systemPrompt, tools } from "./loop_system_prompt.ts";
import type { ChatCompletionMessageParam } from "openai/resources/chat";
import { create_task, get_tasks } from "../tools/tasks.ts";

const client = new OpenAI();
const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    {
        role: "user",
        content:
            "create a new tasks for calling my gf at 9pm today and dont book calendar event this is a must do task remind me okay",
    },
];

export const main = async () => {
    while (true) {
        const completion = await client.chat.completions.create({
            model: "gpt-5-2025-08-07",
            messages: messages,
            response_format: { type: "json_schema", json_schema: schema },
            tools: tools,
        });

        const response = completion.choices[0].message;
        console.log("Response: ", response);

        const toolResponse = response?.tool_calls;

        if (toolResponse) {
            messages.push({ role: "assistant", tool_calls: toolResponse });
            for (const toolCall of toolResponse) {
                if (toolCall.type === "function") {
                    const args = JSON.parse(toolCall.function.arguments);
                    const name = toolCall.function.name;
                    console.log(args);

                    if (name === "get_tasks") {
                        const tasks = get_tasks(args);
                        console.log("Tasks: ", tasks);
                        messages.push({
                            role: "tool",
                            tool_call_id: toolCall.id,
                            content: JSON.stringify(tasks),
                        });
                    }

                    if (name === "create_task") {
                        const result = create_task(args);
                        messages.push({
                            role: "tool",
                            tool_call_id: toolCall.id,
                            content: JSON.stringify(result),
                        });
                    }

                    if (name === "get_emails") {
                    }
                    if (name === "send_email") {
                    }
                    if (name === "get_calendat") {
                    }
                    if (name === "block_calendar_time") {
                    }
                    if (name === "summarize_document") {
                    }
                } else {
                    console.warn("Unsupported tool call type:", toolCall.type);
                }
            }
        } else {
            messages.push({
                role: "assistant",
                content: response.content as string,
            });

            const content = JSON.parse(response.content as string);
            const step = content.step;
            const aiContent = content.content;

            if (step === "analyze") {
                // do nothing, wait for next input
            } else if (step === "think") {
                // do nothing, wait for next input
            } else if (step === "clarify") {
                // do nothing, wait for next input
                // break
            } else if (step === "observe") {
                // do nothing, wait for next input
            } else if (step === "continue") {
                // do nothing, wait for next input
            } else if (step === "result") {
                console.log("Final Result: ", aiContent);
                break;
            }
        }
    }
};

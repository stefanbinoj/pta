import OpenAI from "openai";
import { schema, systemPrompt } from "./loop_system_prompt.ts";
import type { ChatCompletionMessageParam } from "openai/resources/chat";

const client = new OpenAI();
const messages : ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: "what is my tasks for today?" },
]

export const main = async () => {
    while (true) {
        const completion = await client.chat.completions.create({
            model: "gpt-5-2025-08-07",
            messages: messages,
            response_format: { type: "json_schema", json_schema: schema, },
        });
        const response = completion.choices[0].message
        messages.push({role: "assistant", content: response.content as string});

        const content = JSON.parse(response.content as string);
        const step = content.step;
        const aiContent = content.content;
        console.log(step);
        console.log(aiContent);

        if(step === "analyze"){
            // do nothing, wait for next input
        }
        else if(step === "think"){
            // do nothing, wait for next input
        }
        else if(step === "tool_call"){
        }
        else if(step === "observe"){
            // do nothing, wait for next input
        }
        else if(step === "continue"){
            // do nothing, wait for next input
        }
        else if(step === "result"){
            console.log("Final Result: ", aiContent);
            break;
        }


    }

};


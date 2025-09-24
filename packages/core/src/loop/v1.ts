import OpenAI from "openai";
import { schema, systemPrompt } from "./loop_system_prompt.ts";
const client = new OpenAI();

export const main = async () => {
    const completion = await client.chat.completions.create({
        model: "gpt-5-2025-08-07",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: "what is my tasks for today?" },
        ],
        response_format: { type: "json_schema" , json_schema: schema ,},
    });
    console.log(completion.choices[0].message);
};


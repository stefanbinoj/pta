import OpenAI from "openai";
import { schema, systemPrompt, tools } from "./loop_system_prompt.ts";
import type { ChatCompletionMessageParam } from "openai/resources/chat";

const client = new OpenAI();
const messages: ChatCompletionMessageParam[] = [
  { role: "system", content: systemPrompt },
  { role: "user", content: "what is my tasks for today?" },
]
const todos = [
  { id: 1, title: "Finish the report", dueDate: "202]5-09-15", priority: "high" },
  { id: 2, title: "Email the client", dueDate: "2025-09-15", priority: "medium" },
  { id: 3, title: "Team meeting", dueDate: "2025-09-16", priority: "low" },
];

export const main = async () => {
  while (true) {

    const completion = await client.chat.completions.create({
      model: "gpt-5-2025-08-07",
      messages: messages,
      response_format: { type: "json_schema", json_schema: schema, },
      tools: tools,
    });

    const response = completion.choices[0].message
    console.log("Response: ", response);

    const toolResponse = response?.tool_calls;

    if (toolResponse) {
      messages.push({ role: "assistant", tool_calls: toolResponse });
      for (const toolCall of toolResponse) {
        const args = JSON.parse(toolCall.function.arguments);
        const name = toolCall.function.name
        console.log(name, args);

        if (name === "get_tasks") {
          console.log("hi");
          messages.push({
            role: "tool", tool_call_id: toolCall.id, content: JSON.stringify(todos),
          });
          console.log(messages);
        }

      }
    }

    else {
      messages.push({ role: "assistant", content: response.content as string });

      const content = JSON.parse(response.content as string);
      const step = content.step;
      const aiContent = content.content;

      if (step === "analyze") {
        // do nothing, wait for next input
      }
      else if (step === "think") {
        // do nothing, wait for next input
      }
      else if (step === "observe") {
        // do nothing, wait for next input
      }
      else if (step === "continue") {
        // do nothing, wait for next input
      }
      else if (step === "result") {
        console.log("Final Result: ", aiContent);
        break;
      }


    }
  }

};


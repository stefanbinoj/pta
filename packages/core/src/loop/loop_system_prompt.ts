import type { ChatCompletionTool } from "openai/resources/chat";

export const systemPrompt = `
You are PersonalAI, an intelligent sequential loop-based personal assistant agent. You operate by performing ONE step at a time in a structured sequence until you can provide a complete answer to the user's request.

## CRITICAL SEQUENTIAL STEPS
You MUST follow these exact steps in sequence, performing ONLY ONE step per interaction:

1. **ANALYZE** - Break down the user request and understand what they need
2. **THINK** - Plan your approach and decide what information/actions are needed
3. **CLARIFY** - Breaks the loop and asks the user for all missing information if any required fields are absent to proceed (e.g., missing date for calendar event)
4. **OBSERVE** - Analyze the tool results and determine next steps
5. **CONTINUE** or **RESULT** - Either continue to next tool call or provide final answer

### Sequential Rules:
- Perform ONLY ONE step per response
- Wait for next input before proceeding to the next step
- Always use strict JSON output format
- If THINK identifies missing input, proceed to CLARIFY.
- After CLARIFY (user responds), return to ANALYZE and continue the sequence.
- Only move to RESULT when you can provide a comprehensive answer

## OUTPUT FORMAT
You MUST follow this strict JSON schema for every response:

{ "step": "string", "content": "string" }

Valid "step" values: "analyze", "think", "clarify", "observe", "continue", "result"

## AVAILABLE TOOLS
- **Task Management**
    - get_tasks() - Retrieve all current tasks
    - get_tasks({priority="high"|"medium"|"low"}) - Get tasks by priority
    - get_tasks({due_date="YYYY-MM-DD"}) - Get tasks due on a specific date
    - create_task({description, priority, due_date }) - Create a new task
    - delete_task({id}) - Delete a task by ID
- **Email Management**
    - get_emails() - Get recent emails from inbox
    - get_emails({unread=true}) - Get only unread emails
    - get_emails({sender="email@domain.com"}) - Get emails from a specific sender
    - send_email({to, subject, body, priority="normal"|"high"}) - Send an email
- **Calendar Management**
    - get_calendar() - Get today's events
    - get_calendar({date="YYYY-MM-DD"}) - Get events for a specific date
    - get_calendar({date_range="YYYY-MM-DD to YYYY-MM-DD"}) - Get events in a date range
    - block_calendar_time({date, start_time, end_time, title, description, attendees}) - Schedule an event
- **Document Processing**
    - summarize_document({file_path, focus_area="key_points"|"action_items"|"deadlines"}) - Summarize a document

## STEP-BY-STEP EXAMPLES

### Example 1: Simple Calendar Check
**User:** "What's on my calendar today?"
**Step 1:**
{ "step": "analyze", "content": "The user wants to see their calendar events for today. This is a straightforward information request that requires checking today's calendar schedule." }

**Step 2:**
{ "step": "think", "content": "I need to retrieve today's calendar events using the get_calendar tool to show the user their schedule. This should be sufficient to answer their question completely." }

// No manual step here — OpenAI triggers the tool call automatically after THINK.

**Step 4:**
{ "step": "observe", "content": "Retrieved today's calendar showing: 9:00 AM - Team standup (30 min), 11:30 AM - Client presentation (1 hour), 2:00 PM - Project review (45 min), 4:00 PM - One-on-one with Sarah (30 min). I have complete information to provide a comprehensive answer to the user." }

**Step 5:**
{ "step": "result", "content": "Here's your schedule for today:nn• **9:00 AM - 9:30 AM**: Team standupn• **11:30 AM - 12:30 PM**: Client presentationn• **2:00 PM - 2:45 PM**: Project reviewn• **4:00 PM - 4:30 PM**: One-on-one with SarahnnYou have free time from 9:30-11:30 AM and 12:30-2:00 PM for focused work." }


### Example 2: Complex Task Planning
**User:** "Schedule a call with John."
**Step 1:**
{ "step": "analyze", "content": "The user wants to schedule a call with John. This likely involves using the calendar to block time, but the request lacks key details." }

**Step 2:**
{ "step": "think", "content": "To block calendar time, I need a date, start and end time, and ideally John's email. I will clarify with the user." }

**Step 3:**
{ "step": "clarify", "content": "Can you provide the date, start and end time, and John's email address for the meeting you'd like to schedule?" }

// Steps after THINK will include the tool call and result analysis.
// The agent will resume with OBSERVE, CONTINUE, or RESULT depending on tool output.

## STEP DEFINITIONS

- **ANALYZE**
    - Break down the user request into components
    - Identify the type of assistance needed
    - Determine complexity level (simple vs multi-step)
- **THINK**
    - Plan the approach and sequence of actions
    - Identify what information or tools are needed
    - Consider user context and priorities
    - **If the user's request is missing necessary information to call a tool (e.g., missing a date for a calendar event), your next step should be CLARIFY, where you ask the user for the missing details.**
- **CLARIFY**
    - Ask the user a clear, concise question to gather missing information or resolve ambiguity
    - Should be used when the request cannot proceed due to missing required fields for tool calls
    - Include any examples or suggestions to help the user respond
- **TOOL_CALL**
    - Execute ONE specific tool by providing a JSON object with its name and parameters.
    - Use exact tool syntax as defined in available tools.
- **OBSERVE**
    - Analyze tool results and their implications.
    - If a tool call fails or returns no results, acknowledge it and use the next THINK step to decide on an alternative approach.
- **CONTINUE**
    - Explicitly state that more steps are needed and explain what still needs to be accomplished.
- **RESULT**
    - Provide a comprehensive final answer with actionable recommendations.

## IMPORTANT RULES
- **One Step Only**: Perform exactly one step per response
- **JSON Format**: Always use the strict JSON schema
- **Sequential Flow**: Follow the step sequence without skipping
- **Complete Information**: Only move to RESULT when you have everything needed
- **Tool Accuracy**: Use exact tool names and parameter formats
- **User Focus**: Keep responses relevant and actionable

## SHORT NOTE
// The system will automatically initiate a tool call after a THINK step if no clarification is required.
// Tool calls are triggered outside the JSON format defined here.
`;

export const schema = {
    name: "SequentialStep",
    schema: {
        type: "object",
        properties: {
            step: {
                type: "string",
                enum: ["analyze", "think", "clarify", "observe", "continue", "result"],
            },
            content: {
                type: "string",
            },
        },
        required: ["step", "content"],
        additionalProperties: false,
    },
};

export const tools: ChatCompletionTool[] = [
    {
        type: "function",
        function: {
            name: "get_tasks",
            description: "Retrieve tasks with optional filters",
            parameters: {
                type: "object",
                properties: {
                    priority: {
                        type: "string",
                        enum: ["high", "medium", "low"],
                    },
                    due_date: { type: "string", format: "date" },
                },
                additionalProperties: false,
            },
        },
    },
    {
        type: "function",
        function: {
            name: "create_task",
            description: "Create a new task",
            parameters: {
                type: "object",
                properties: {
                    description: { type: "string" },
                    priority: {
                        type: "string",
                        enum: ["high", "medium", "low"],
                    },
                    due_date: { type: "string", format: "date" },
                },
                required: ["description", "priority", "due_date"],
                additionalProperties: false,
            },
        },
    },
    {
        type: "function",
        function: {
            name: "delete_task",
            description: "Delete a task by ID",
            parameters: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "The unique identifier of the task to be deleted",
                    },
                },
                required: ["id"],
                additionalProperties: false,
            },
        },
    },
    {
        type: "function",
        function: {
            name: "get_emails",
            description: "Retrieve emails",
            parameters: {
                type: "object",
                properties: {
                    unread: { type: "boolean" },
                    sender: { type: "string", format: "email" },
                },
                additionalProperties: false,
            },
        },
    },
    {
        type: "function",
        function: {
            name: "send_email",
            description: "Send an email",
            parameters: {
                type: "object",
                properties: {
                    to: { type: "string", format: "email" },
                    subject: { type: "string" },
                    body: { type: "string" },
                    priority: { type: "string", enum: ["normal", "high"] },
                },
                required: ["to", "subject", "body"],
                additionalProperties: false,
            },
        },
    },
    {
        type: "function",
        function: {
            name: "get_calendar",
            description: "Retrieve calendar events",
            parameters: {
                type: "object",
                properties: {
                    date: { type: "string", format: "date" },
                    date_range: { type: "string" }, // You can parse this as `YYYY-MM-DD to YYYY-MM-DD`
                },
                additionalProperties: false,
            },
        },
    },
    {
        type: "function",
        function: {
            name: "block_calendar_time",
            description: "Block time in the calendar for an event",
            parameters: {
                type: "object",
                properties: {
                    date: { type: "string", format: "date" },
                    start_time: { type: "string" },
                    end_time: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    attendees: {
                        type: "array",
                        items: { type: "string", format: "email" },
                    },
                },
                required: ["date", "start_time", "end_time", "title"],
                additionalProperties: false,
            },
        },
    },
    {
        type: "function",
        function: {
            name: "summarize_document",
            description: "Summarize a document based on a focus area",
            parameters: {
                type: "object",
                properties: {
                    file_path: { type: "string" },
                    focus_area: {
                        type: "string",
                        enum: ["key_points", "action_items", "deadlines"],
                    },
                },
                required: ["file_path"],
                additionalProperties: false,
            },
        },
    },
];

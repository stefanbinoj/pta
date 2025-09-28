export interface MessageListType {
    role: "user" | "assistant" | "tool";
    step?: "think" | "analyze" | "observe" | "clarify" | "result" | "continue";
    content: string;
}

export type AddMessageType = (obj: MessageListType) => void;

import React from "react";
import { Box, Text } from "ink";
import type { MessageListType } from "@pta/core/src/types/message.ts";
import { Colors } from "../ui/colors.ts";

interface ChatMessageProps {
    message: MessageListType;
    messageId: string; // Use a stable ID instead of array index
}

export const ChatMessage = React.memo(({ message, messageId }: ChatMessageProps) => {
    if (message.role === "user") {
        return (
            <Box
                borderStyle="round"
                borderColor={Colors.Gray}
                paddingLeft={2}
                paddingRight={2}
                marginY={1}
                alignSelf="flex-start"
            >
                <Text color={Colors.Gray}>{message.content}</Text>
            </Box>
        );
    } else if (message.step === "analyze") {
        return null;
    } else if (message.step === "think") {
        return (
            <Box marginY={1}>
                <Text color={Colors.Gray}>
                    {message.content}
                </Text>
            </Box>
        );
    } else {
        return (
            <Box marginY={1}>
                <Text color={Colors.AccentBlue}>✶</Text>
                <Text color="white">
                    {message.content}
                </Text>
            </Box>
        );
    }
});

ChatMessage.displayName = "ChatMessage";
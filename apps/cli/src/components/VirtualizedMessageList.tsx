import React, { useMemo } from "react";
import { Box } from "ink";
import { ChatMessage } from "./ChatMessage.tsx";
import type { MessageListType } from "@pta/core/src/types/message.ts";

interface VirtualizedMessageListProps {
    messages: MessageListType[];
    maxVisibleMessages?: number; // For very large chats, only show the most recent N messages
}

export const VirtualizedMessageList = React.memo(
    ({ messages, maxVisibleMessages = 10 }: VirtualizedMessageListProps) => {
        const visibleMessages = useMemo(() => {
            if (messages.length <= maxVisibleMessages) {
                return messages.map((message, index) => {
                    const stableKey = `${message.role}-${message.step || "default"}-${index}-${message.content.slice(0, 20)}`;
                    return { message, key: stableKey };
                });
            }

            const startIndex = messages.length - maxVisibleMessages;
            return messages.slice(startIndex).map((message, relativeIndex) => {
                const actualIndex = startIndex + relativeIndex;
                const stableKey = `${message.role}-${message.step || "default"}-${actualIndex}-${message.content.slice(0, 20)}`;
                return { message, key: stableKey };
            });
        }, [messages, maxVisibleMessages]);

        const hasMoreMessages = messages.length > maxVisibleMessages;

        return (
            <Box flexDirection="column" marginTop={1}>
                {hasMoreMessages && (
                    <Box marginY={1} justifyContent="center">
                        <Box
                            borderStyle="single"
                            borderColor="gray"
                            paddingX={2}
                            paddingY={0}
                        >
                            {/* <Box color={Colors.Gray}> */}
                            <Box>
                                ... {messages.length - maxVisibleMessages} earlier messages
                                (showing most recent {maxVisibleMessages})
                            </Box>
                        </Box>
                    </Box>
                )}

                {visibleMessages.map(({ message, key }) => (
                    <ChatMessage key={key} message={message} messageId={key} />
                ))}
            </Box>
        );
    },
);

VirtualizedMessageList.displayName = "VirtualizedMessageList";

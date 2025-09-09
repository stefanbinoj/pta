import React from "react";
import { Box, Text } from "ink";

import { InputPrompt } from "./InputPrompt.tsx";
import { LoadingIndicator } from "../ui/components/LoadingIndicator.tsx";
import { useUIState } from "../context/UIStateContext.tsx";

const MAX_DISPLAYED_QUEUED_MESSAGES = 3;

export const Composer = () => {
    const uiState = useUIState();
    return (
        <Box flexDirection="column">
            <LoadingIndicator />

            {uiState.messageQueue.length > 0 && (
                <Box flexDirection="column" marginTop={1}>
                    {uiState.messageQueue
                        .slice(0, MAX_DISPLAYED_QUEUED_MESSAGES)
                        .map((message, index) => {
                            const preview = message.replace(/\s+/g, " ");

                            return (
                                <Box key={index} paddingLeft={2} width="100%">
                                    <Text dimColor wrap="truncate">
                                        {preview}
                                    </Text>
                                </Box>
                            );
                        })}
                    {uiState.messageQueue.length > MAX_DISPLAYED_QUEUED_MESSAGES && (
                        <Box paddingLeft={2}>
                            <Text dimColor>
                                ... (+
                                {uiState.messageQueue.length -
                                    MAX_DISPLAYED_QUEUED_MESSAGES}{" "}
                                more)
                            </Text>
                        </Box>
                    )}
                </Box>
            )}

            {uiState.isInputActive && (
                <InputPrompt
                    userMessages={uiState.userMessages}
                    slashCommands={uiState.slashCommands}
                    focus={uiState.isFocused}
                    buffer={uiState.buffer}
                />
            )}
        </Box>
    );
};

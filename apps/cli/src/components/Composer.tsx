import React from "react";
import { Box, Text } from "ink";

import { InputPrompt } from "./InputPrompt.tsx";
import { LoadingIndicator } from "../ui/components/LoadingIndicator.tsx";
import { useUIState } from "../context/UIStateContext.tsx";
import { StreamingState } from "../types/index.tsx";
import { Colors } from "../ui/colors.ts";

const MAX_DISPLAYED_QUEUED_MESSAGES = 3;

export const Composer = () => {
    const uiState = useUIState();
    return (
        <Box flexDirection="column">
            {uiState.streamingState === StreamingState.Responding ? (
                <LoadingIndicator />
            ) : null}

            {uiState.messageQueue.length > 0 && (
                <Box flexDirection="column" marginTop={1}>
                    {uiState.messageQueue
                        .slice(0, MAX_DISPLAYED_QUEUED_MESSAGES)
                        .map((message, index) => {
                            const preview = message.replace(/\s+/g, " ");

                            return (
                                <Box
                                    borderStyle="round"
                                    borderColor={Colors.Gray}
                                    key={index}
                                    paddingLeft={2}
                                    paddingRight={2}
                                    alignSelf="flex-start"
                                >
                                    <Text dimColor wrap="truncate">
                                        {preview}
                                    </Text>
                                </Box>
                            );
                        })}
                    {uiState.messageQueue.length >
                        MAX_DISPLAYED_QUEUED_MESSAGES && (
                        <Box
                            paddingLeft={2}
                            borderStyle="round"
                            borderColor={Colors.Gray}
                        >
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
                    slashCommands={uiState.slashCommands}
                    onSubmit={uiState.onSubmit}
                />
            )}
        </Box>
    );
};

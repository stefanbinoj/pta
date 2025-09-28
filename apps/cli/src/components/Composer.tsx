import React from "react";
import { Box, Text } from "ink";

import { InputPrompt } from "./InputPrompt.tsx";
import { LoadingIndicator } from "../ui/components/LoadingIndicator.tsx";
import { useUIState } from "../context/UIStateContext.tsx";
import { StreamingState } from "../types/index.tsx";
import { Colors } from "../ui/colors.ts";

export const Composer = () => {
    const uiState = useUIState();
    return (
        <Box flexDirection="column">
            {uiState.messageQueue.length > 0 && (
                <Box flexDirection="column" marginTop={1}>
                    {uiState.messageQueue.map((message, index) => {
                        if (message.step === "think") return null;

                        if (message.role === "user") {
                            return (
                                <Box
                                    borderStyle="round"
                                    borderColor={Colors.Gray}
                                    key={index}
                                    paddingLeft={2}
                                    paddingRight={2}
                                    alignSelf="flex-start"
                                >
                                    <Text dimColor>{message.content}</Text>
                                </Box>
                            );
                        } else {
                            return (
                                <Text key={index} color="white">
                                    {message.content}
                                </Text>
                            );
                        }
                    })}
                </Box>
            )}
            {uiState.streamingState === StreamingState.Responding ? (
                <LoadingIndicator />
            ) : uiState.isInputActive ? (
                <InputPrompt
                    slashCommands={uiState.slashCommands}
                    onSubmit={uiState.onSubmit}
                />
            ) : null}
        </Box>
    );
};

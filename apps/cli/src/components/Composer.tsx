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
                        if (message.role === "user") {
                            return (
                                <Box
                                    borderStyle="round"
                                    borderColor={Colors.Gray}
                                    key={index}
                                    paddingLeft={2}
                                    paddingRight={2}
                                    marginY={1}
                                    alignSelf="flex-start"
                                >
                                    <Text color={Colors.Gray}>{message.content}</Text>
                                </Box>
                            );
                        } else {
                            return (
                                <Box key={index}>
                                    <Text color={Colors.AccentBlue}>{message.step}</Text>
                                    <Text key={index} color="white">
                                        {message.content}
                                    </Text>
                                </Box>
                            );
                        }
                    })}
                </Box>
            )}
            {uiState.streamingState === StreamingState.Responding ? (
                <Box>
                    <LoadingIndicator />
                    <Text color={Colors.Gray}>AI is typing...</Text>
                </Box>
            ) : uiState.isInputActive ? (
                <InputPrompt
                    slashCommands={uiState.slashCommands}
                    onSubmit={uiState.onSubmit}
                />
            ) : null}
        </Box>
    );
};

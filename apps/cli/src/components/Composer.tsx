import React from "react";
import { Box, Text } from "ink";

import { InputPrompt } from "./InputPrompt.tsx";
import { LoadingIndicator } from "../ui/components/LoadingIndicator.tsx";
import { useUIState } from "../context/UIStateContext.tsx";
import { StreamingState } from "@pta/core/src/types/state.ts";
import { Colors } from "../ui/colors.ts";

export const Composer = () => {
    const uiState = useUIState();

    return (
        <Box flexDirection="column">
            {uiState.messageQueue.length > 0 && (
                <Box flexDirection="column" marginTop={1}>
                    {uiState.messageQueue.map((message, index) => {
                        console.log("Rendering message:", message);
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
                        } else if (message.step === "analyze") return null;
                        else if (message.step === "think") {
                            return (
                                <Box key={index} marginY={1}>
                                    <Text key={index} color={Colors.Gray}>
                                        {message.content}
                                    </Text>
                                </Box>
                            );
                        } else {
                            return (
                                <Box key={index}>
                                    <Text color={Colors.AccentBlue}>✶</Text>
                                    <Text key={index} color="white">
                                        {message.content}
                                    </Text>
                                </Box>
                            );
                        }
                    })}
                </Box>
            )}

            {uiState.streamingState !== StreamingState.Idle ? (
                uiState.streamingState === StreamingState.ToolCalling ? (
                    <Box>
                        <LoadingIndicator />
                        <Text color={Colors.Gray}>Calling tool...</Text>
                    </Box>
                ) : uiState.streamingState === StreamingState.Responding ? (
                    <Box>
                        <LoadingIndicator />
                        <Text color={Colors.Gray}>Thinking...</Text>
                    </Box>
                ) : uiState.streamingState === StreamingState.WaitingForConfirmation ? (
                    <Box>
                        <LoadingIndicator />
                        <Text color={Colors.Gray}>Waiting For Confirmation...</Text>
                    </Box>
                ) : null
            ) : null}

            {uiState.isInputActive ? (
                <InputPrompt
                    slashCommands={uiState.slashCommands}
                    onSubmit={uiState.onSubmit}
                />
            ) : null}
        </Box>
    );
};

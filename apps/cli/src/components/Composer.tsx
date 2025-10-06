import React from "react";
import { Box, Text } from "ink";

import { InputPrompt } from "./InputPrompt.tsx";
import { LoadingIndicator } from "../ui/components/LoadingIndicator.tsx";
import { VirtualizedMessageList } from "./VirtualizedMessageList.tsx";
import { useUIState } from "../context/UIStateContext.tsx";
import { StreamingState } from "@pta/core/src/types/state.ts";
import { Colors } from "../ui/colors.ts";

export const Composer = React.memo(() => {
    const uiState = useUIState();

    return (
        <Box flexDirection="column">
            {uiState.messageQueue.length > 0 && (
                <VirtualizedMessageList 
                    messages={uiState.messageQueue}
                    maxVisibleMessages={50} // Adjust this based on performance needs
                />
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
});

Composer.displayName = "Composer";

import React from "react";
import { Box } from "ink";
import { GeminiRespondingSpinner } from "./GeminiRespondingSpinner.js";

export const LoadingIndicator = () => {
    return (
        <Box paddingLeft={0} flexDirection="column">
            <Box width="100%">
                <Box>
                    <Box marginRight={1}>
                        <GeminiRespondingSpinner />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

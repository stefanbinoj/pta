import React, { useState } from "react";
import { Box, Text } from "ink";
import TextInput from "ink-text-input"; // 1. Import the TextInput component
import { SlashCommand } from "../types/commands.tsx";
import { Colors } from "../ui/colors.ts";

interface InputPromptProps {
    slashCommands: readonly SlashCommand[];
    placeholder?: string;
    onSubmit: (value: string) => void;
}

export const InputPrompt = React.memo(({
    slashCommands,
    placeholder = "Chat with your AI assistant...",
    onSubmit,
}: InputPromptProps) => {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (value: string) => {
        onSubmit(value);
        setInputValue("");
    };

    return (
        <Box borderColor={Colors.AccentBlue} borderStyle="round" paddingX={1} marginY={1}>
            <Box marginRight={1}>
                <Text color={Colors.AccentBlue}>&gt;</Text>
            </Box>

            <TextInput
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleSubmit}
                placeholder={placeholder}
            />
        </Box>
    );
});

InputPrompt.displayName = "InputPrompt";

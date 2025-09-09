import { Box, Text } from "ink";
import React from "react";
import chalk from "chalk";
import stringWidth from "string-width";
import { SlashCommand } from "../types/commands.tsx";

const theme = {
    text: {
        secondary: "gray",
        accent: "cyan",
    },
};

const cpLen = (str: string) => [...str].length;
const cpSlice = (str: string, begin?: number, end?: number) =>
    [...str].slice(begin, end).join("");

const parseInputForHighlighting = (lineText: string) => [
    { type: "text", text: lineText },
];

type TextBuffer = {
    text: string;
    viewportVisualLines: string[];
    visualCursor: [number, number];
    visualScrollRow: number;
};

// --- Updated InputPrompt Component ---

export const InputPrompt = ({
    userMessages,
    slashCommands,
    focus,
    buffer,
    inputWidth= 80,
    placeholder = "Type a message or command...",
}: {
    userMessages: string[];
    slashCommands: readonly SlashCommand[];
    focus: boolean;
    // ADDED: Prop definitions
    buffer: TextBuffer;
    inputWidth?: number;
    placeholder?: string;
}) => {
    // --- ADDED: Definition of missing variables ---

    // These variables are derived from the `buffer` prop to render the text and cursor correctly.
    const linesToRender = buffer.viewportVisualLines;
    const [cursorVisualRowAbsolute, cursorVisualColAbsolute] =
        buffer.visualCursor;
    const scrollVisualRow = buffer.visualScrollRow;

    // In the original code, ghost text for autocompletion is complex.
    // Here, they are set to empty values for simplicity.
    const inlineGhost = "";
    const additionalLines: string[] = [];

    return (
        <>
            <Box borderStyle="round" paddingX={1}>
                <Box flexGrow={1} flexDirection="column">
                    {buffer.text.length === 0 && placeholder ? (
                        focus ? (
                            <Text>
                                {chalk.inverse(placeholder.slice(0, 1))}
                                <Text color={theme.text.secondary}>{placeholder.slice(1)}</Text>
                            </Text>
                        ) : (
                            <Text color={theme.text.secondary}>{placeholder}</Text>
                        )
                    ) : (
                        linesToRender
                            .map((lineText, visualIdxInRenderedSet) => {
                                const tokens = parseInputForHighlighting(lineText);
                                const cursorVisualRow =
                                    cursorVisualRowAbsolute - scrollVisualRow;
                                const isOnCursorLine =
                                    focus && visualIdxInRenderedSet === cursorVisualRow;

                                const renderedLine: React.ReactNode[] = [];
                                let charCount = 0;

                                tokens.forEach((token, tokenIdx) => {
                                    let display = token.text;
                                    if (isOnCursorLine) {
                                        const relativeVisualColForHighlight =
                                            cursorVisualColAbsolute;
                                        const tokenStart = charCount;
                                        const tokenEnd = tokenStart + cpLen(token.text);

                                        if (
                                            relativeVisualColForHighlight >= tokenStart &&
                                            relativeVisualColForHighlight < tokenEnd
                                        ) {
                                            const charToHighlight = cpSlice(
                                                token.text,
                                                relativeVisualColForHighlight - tokenStart,
                                                relativeVisualColForHighlight - tokenStart + 1,
                                            );
                                            const highlighted = chalk.inverse(charToHighlight);
                                            display =
                                                cpSlice(
                                                    token.text,
                                                    0,
                                                    relativeVisualColForHighlight - tokenStart,
                                                ) +
                                                highlighted +
                                                cpSlice(
                                                    token.text,
                                                    relativeVisualColForHighlight - tokenStart + 1,
                                                );
                                        }
                                        charCount = tokenEnd;
                                    }

                                    const color =
                                        token.type === "command" || token.type === "file"
                                            ? theme.text.accent
                                            : undefined;

                                    renderedLine.push(
                                        <Text key={`token-${tokenIdx}`} color={color}>
                                            {display}
                                        </Text>,
                                    );
                                });
                                const currentLineGhost = isOnCursorLine ? inlineGhost : "";

                                if (
                                    isOnCursorLine &&
                                    cursorVisualColAbsolute === cpLen(lineText)
                                ) {
                                    if (!currentLineGhost) {
                                        renderedLine.push(
                                            <Text key={`cursor-end-${cursorVisualColAbsolute}`}>
                                                {chalk.inverse(" ")}
                                            </Text>,
                                        );
                                    }
                                }

                                const showCursorBeforeGhost =
                                    focus &&
                                    isOnCursorLine &&
                                    cursorVisualColAbsolute === cpLen(lineText) &&
                                    currentLineGhost;

                                return (
                                    <Box key={`line-${visualIdxInRenderedSet}`} height={1}>
                                        <Text>
                                            {renderedLine}
                                            {showCursorBeforeGhost && chalk.inverse(" ")}
                                            {currentLineGhost && (
                                                <Text color={theme.text.secondary}>
                                                    {currentLineGhost}
                                                </Text>
                                            )}
                                        </Text>
                                    </Box>
                                );
                            })
                            .concat(
                                additionalLines.map((ghostLine, index) => {
                                    const padding = Math.max(
                                        0,
                                        inputWidth - stringWidth(ghostLine),
                                    );
                                    return (
                                        <Text
                                            key={`ghost-line-${index}`}
                                            color={theme.text.secondary}
                                        >
                                            {ghostLine}
                                            {" ".repeat(padding)}
                                        </Text>
                                    );
                                }),
                            )
                    )}
                </Box>
            </Box>
        </>
    );
};

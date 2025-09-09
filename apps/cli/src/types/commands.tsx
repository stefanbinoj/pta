import { type ReactNode } from "react";

export interface ToolActionReturn {
    type: "tool";
    toolName: string;
    toolArgs: Record<string, unknown>;
}

export interface QuitActionReturn {
    type: "quit";
    messages: any[];
}

export interface SubmitPromptActionReturn {
    type: "submit_prompt";
    content: any;
}

/**
 * The return type for a command action that needs to pause and request
 * confirmation for a set of shell commands before proceeding.
 */
export interface ConfirmShellCommandsActionReturn {
    type: "confirm_shell_commands";
    /** The list of shell commands that require user confirmation. */
    commandsToConfirm: string[];
    /** The original invocation context to be re-run after confirmation. */
    originalInvocation: {
        raw: string;
    };
}

export interface ConfirmActionReturn {
    type: "confirm_action";
    /** The React node to display as the confirmation prompt. */
    prompt: ReactNode;
    /** The original invocation context to be re-run after confirmation. */
    originalInvocation: {
        raw: string;
    };
}

export type SlashCommandActionReturn =
    | ToolActionReturn
    | QuitActionReturn
    | SubmitPromptActionReturn
    | ConfirmShellCommandsActionReturn
    | ConfirmActionReturn;

export enum CommandKind {
    BUILT_IN = "built-in",
    FILE = "file",
    MCP_PROMPT = "mcp-prompt",
}

// The standardized contract for any command in the system.
export interface SlashCommand {
    name: string;
    altNames?: string[];
    description: string;
    hidden?: boolean;

    kind: CommandKind;

    // Optional metadata for extension commands
    extensionName?: string;

    // The action to run. Optional for parent commands that only group sub-commands.
    action?: (
        args: string, // TODO: Remove args. CommandContext now contains the complete invocation.
    ) =>
        | void
        | SlashCommandActionReturn
        | Promise<void | SlashCommandActionReturn>;

    // Provides argument completion (e.g., completing a tag for `/chat resume <tag>`).
    completion?: (partialArg: string) => Promise<string[]>;

    subCommands?: SlashCommand[];
}

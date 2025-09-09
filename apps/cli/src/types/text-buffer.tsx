export interface TextBuffer {
    text: string;
    setText: (text: string) => void;
    viewportVisualLines: string[];
    visualCursor: [number, number];
    setVisualCursor: (cursor: [number, number]) => void;
    visualScrollRow: number;
}

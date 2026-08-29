// INFO: Pure game data & helpers (no React)
import type { CardTypes } from "./types";

export const CARD_VALUES = [
    "🍎", "🍌", "🍒", "🍇", "🍊", "🍓", "🫐", "🍍",
    "🍎", "🍌", "🍒", "🍇", "🍊", "🍓", "🫐", "🍍"
];

// 1. Function to initialize and shuffle the cards
export const createInitialBoard = (): CardTypes[] => {
    // Shuffle a copy so the original CARD_VALUES is never mutated
    const shuffledValues = [...CARD_VALUES].sort(() => Math.random() - 0.5);

    // Turn each fruit into a fresh, hidden card object
    return shuffledValues.map((item) => ({
        id: crypto.randomUUID(),
        item,
        isFlipped: false,
        isMatched: false
    }));
};

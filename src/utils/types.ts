// INFO: Shared types used across the app

// Shape of the header stats + props the New Game button accepts
type HeaderTypes = {
    score: number;
    moves: number;
    onClick?: () => void;
}

// Shape of a single board card
type CardTypes = {
    id: string;
    item: string;      // fruit emoji shown when revealed
    isFlipped: boolean; // is the card face-up right now
    isMatched: boolean; // was this card's pair found
};

// Props passed to the win screen
type WinMessageProps = {
    score: number;
    moves: number;
    onPlayAgain: () => void;
};

export type { HeaderTypes, CardTypes, WinMessageProps }

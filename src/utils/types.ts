type HeaderTypes = {
    score: number;
    moves: number;
    onClick?: () => void;
}

type CardTypes = {
    id: string;
    item: string;
    isFlipped: boolean;
    isMatched: boolean;
};

type WinMessageProps = {
    score: number;
    moves: number;
    onPlayAgain: () => void;
};

export type { HeaderTypes, CardTypes, WinMessageProps }

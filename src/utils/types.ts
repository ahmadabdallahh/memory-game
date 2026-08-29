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

export type { HeaderTypes, CardTypes }

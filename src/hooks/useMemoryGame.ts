// INFO: All game state & rules, isolated into a custom hook
import { useState } from "react";
import type { HeaderTypes, CardTypes } from "../utils/types";
import { createInitialBoard } from "../utils/gameLogic";

const useMemoryGame = () => {
    // Lazy init: createInitialBoard runs only once, so no useEffect is needed for setup
    const [cards, setCards] = useState<CardTypes[]>(createInitialBoard);
    const [flippedCards, setFlippedCards] = useState<CardTypes[]>([]);
    const [data, setData] = useState<HeaderTypes>({ score: 0, moves: 0 });

    const isWon = cards.length > 0 && cards.every((card) => card.isMatched);

    const handleNewGame = () => {
        setCards(createInitialBoard());
        setFlippedCards([]);
        setData((prev) => ({ ...prev, score: 0, moves: 0 }));
    };

    const handleToggleFlipped = (id: string | number) => {
        const targetCard = cards.find((card) => card.id === id);

        setData((prev) => ({ ...prev, moves: prev.moves + 1 }));

        // Guard: prevents clicking if two cards are open or the card is already flipped/matched
        if (flippedCards.length === 2 || !targetCard || targetCard.isFlipped || targetCard.isMatched) {
            return;
        }

        // 1. Flip the currently selected card
        const updatedCards = cards.map((c) =>
            c.id === targetCard.id ? { ...c, isFlipped: true } : c
        );
        setCards(updatedCards);

        const newFlipped = [...flippedCards, targetCard];
        setFlippedCards(newFlipped);

        // 2. Check for a match when the second card is flipped
        if (newFlipped.length === 2) {
            const [firstCard] = newFlipped;

            if (firstCard.item === targetCard.item) {
                // Match: mark both cards as isMatched
                setCards((prev) =>
                    prev.map((c) =>
                        c.id === firstCard.id || c.id === targetCard.id
                            ? { ...c, isMatched: true }
                            : c
                    )
                );
                setData((prev) => ({ ...prev, score: prev.score + 1 }));
                setFlippedCards([]); // Reset the selection
            } else {
                // No match: wait 800ms then flip both cards back
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((c) =>
                            c.id === firstCard.id || c.id === targetCard.id
                                ? { ...c, isFlipped: false }
                                : c
                        )
                    );
                    setFlippedCards([]); // Reset the selection
                }, 800);
            }
        }
    };

    return {
        cards,
        score: data.score,
        moves: data.moves,
        isWon,
        handleToggleFlipped,
        handleNewGame,
    };
};

export default useMemoryGame;

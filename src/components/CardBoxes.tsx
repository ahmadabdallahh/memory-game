import { useState } from "react";
import type { HeaderTypes, CardTypes } from "../utils/types";
import Header from "./Header";

const cardValues = [
    "🍎", "🍌", "🍒", "🍇", "🍊", "🍓", "🫐", "🍍",
    "🍎", "🍌", "🍒", "🍇", "🍊", "🍓", "🫐", "🍍"
];

// 1. Function to initialize and shuffle the cards
const createInitialBoard = (): CardTypes[] => {
    const shuffledValues = [...cardValues].sort(() => Math.random() - 0.5);

    return shuffledValues.map((item) => ({
        id: crypto.randomUUID(),
        item,
        isFlipped: false,
        isMatched: false
    }));
};


const CardBoxes = () => {
    // Using Lazy State Initialization to avoid needing useEffect
    const [cards, setCards] = useState<CardTypes[]>(createInitialBoard);
    const [flippedCards, setFlippedCards] = useState<CardTypes[]>([]);
    const [data, setData] = useState<HeaderTypes>({ score: 0, moves: 0 });


    const handleNewGame = () => {
        setCards(createInitialBoard());
        setFlippedCards([]);

        setData((prev) => ({
            ...prev,
            score: 0,
            moves: 0,
        }));
    };

    const handleToggleFlipped = (id: string | number) => {
        const targetCard = cards.find((card) => card.id === id);

        setData(prev => ({ ...prev, moves: prev.moves + 1 }))

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

                setData(prev => ({ ...prev, score: prev.score + 1 }))

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

    return (
        <>
            <Header score={data.score} moves={data.moves} onClick={handleNewGame} />

            <div className={`grid grid-cols-4 gap-3.5 max-w-md mx-auto p-5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl`}>
                {cards.map((card) => {
                    const cardStyle = card.isMatched
                        ? "bg-emerald-600/30 border-emerald-500/50 text-emerald-300 cursor-default"
                        : card.isFlipped
                            ? "bg-indigo-600/30 border-indigo-500/50"
                            : "bg-slate-800/90 hover:bg-slate-700/80 border-slate-700/80 hover:border-indigo-500/50";

                    return (
                        <button
                            key={card.id}
                            type="button"
                            className={`group relative aspect-square w-full border rounded-xl flex items-center justify-center text-3xl shadow-md transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 select-none ${cardStyle}`}
                            onClick={() => handleToggleFlipped(card.id)}
                        >
                            <span className="group-hover:scale-110 transition-transform duration-200">
                                {card.isFlipped || card.isMatched ? card.item : "❓"}
                            </span>
                        </button>
                    );
                })}
            </div>
        </>

    );
};

export default CardBoxes;

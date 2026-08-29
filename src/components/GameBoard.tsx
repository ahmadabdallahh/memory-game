// INFO: The board grid that renders every card
import type { CardTypes } from "../utils/types";
import GameCard from "./GameCard";

type GameBoardProps = {
    cards: CardTypes[];
    onFlip: (id: string | number) => void;
};

const GameBoard = ({ cards, onFlip }: GameBoardProps) => {
    return (
        <div className="grid grid-cols-4 gap-3.5 max-w-md mx-auto p-5 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl">
            {/* Render one GameCard per board card */}
            {cards.map((card) => (
                <GameCard key={card.id} card={card} onFlip={onFlip} />
            ))}
        </div>
    );
};

export default GameBoard;

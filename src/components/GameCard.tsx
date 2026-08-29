// INFO: Single flip-card UI
import type { CardTypes } from "../utils/types";

type GameCardProps = {
    card: CardTypes;
    onFlip: (id: string | number) => void;
};

// Pick the Tailwind classes based on the card's current state
const getCardStyle = (card: CardTypes) =>
    card.isMatched
        ? "bg-emerald-600/30 border-emerald-500/50 text-emerald-300 cursor-default" // matched -> stays revealed, not clickable
        : card.isFlipped
            ? "bg-indigo-600/30 border-indigo-500/50" // flipped -> face-up highlight
            : "bg-slate-800/90 hover:bg-slate-700/80 border-slate-700/80 hover:border-indigo-500/50"; // hidden

const GameCard = ({ card, onFlip }: GameCardProps) => {
    return (
        <button
            type="button"
            className={`group relative aspect-square w-full border rounded-xl flex items-center justify-center text-3xl shadow-md transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 select-none ${getCardStyle(card)}`}
            onClick={() => onFlip(card.id)}
        >
            <span className="group-hover:scale-110 transition-transform duration-200">
                {/* Show the fruit once revealed/matched, otherwise a question mark */}
                {card.isFlipped || card.isMatched ? card.item : "❓"}
            </span>
        </button>
    );
};

export default GameCard;

// INFO: Container / page that composes header, board & win screen
import useMemoryGame from "../hooks/useMemoryGame";
import Header from "./Header";
import GameBoard from "./GameBoard";
import WinMessage from "./WinMessage";

const CardBoxes = () => {
    // Grab all game state + handlers from the custom hook
    const { cards, score, moves, isWon, handleToggleFlipped, handleNewGame } =
        useMemoryGame();

    return (
        <>
            <Header score={score} moves={moves} onClick={handleNewGame} />

            {/* Overlay shown only when every card is matched */}
            {isWon && (
                <WinMessage score={score} moves={moves} onPlayAgain={handleNewGame} />
            )}

            <GameBoard cards={cards} onFlip={handleToggleFlipped} />
        </>
    );
};

export default CardBoxes;

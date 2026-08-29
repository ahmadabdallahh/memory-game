// INFO: Win Message

type WinMessageProps = {
    score: number;
    moves: number;
    onPlayAgain: () => void;
};

const getTrophy = (moves: number) => {
    if (moves <= 12) return "🏆"; // Perfect play - minimal moves
    if (moves <= 20) return "🥇"; // Great play
    return "🎉"; // Completed the game
};

const getMessage = (moves: number) => {
    if (moves <= 12) return "Flawless! A perfect memory — unbeatable!";
    if (moves <= 20) return "Impressive! Sharp eyes and a sharp mind.";
    return "You did it! Every puzzle has an ending, and you found yours.";
};

const left = Math.floor(Math.random() * 100);
const delay = Math.random() * 0.5;
const duration = 2.4 + Math.random() * 1.6;

const WinMessage = ({ score, moves, onPlayAgain }: WinMessageProps) => {
    const trophy = getTrophy(moves);
    const message = getMessage(moves);

    // Floating confetti particles (colored dots)
    const particles = Array.from({ length: 12 }).map((_, i) => {

        const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899", "#06b6d4"];

        return (
            <span
                key={i}
                className="confetti"
                style={{
                    left: `${left}%`,
                    background: colors[i % colors.length],
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                }}
            />
        );
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/70 backdrop-blur-md">
            {/* Confetti particles */}
            {particles}

            {/* Glow behind trophy */}
            <div className="absolute w-72 h-72 rounded-full bg-indigo-500/30 blur-3xl animate-pulse" />

            {/* Card */}
            <div className="relative w-full max-w-sm mx-4 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl p-8 text-center win-card">
                {/* Trophy */}
                <div className="text-7xl mb-4 trophy-bounce drop-shadow-[0_0_25px_rgba(99,102,241,0.5)]">
                    {trophy}
                </div>

                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-emerald-400 to-indigo-400 mb-2">
                    You Won!
                </h2>

                <p className="text-slate-400 mb-6 text-sm">{message}</p>

                {/* Stats */}
                <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Score
                        </span>
                        <span className="text-3xl font-extrabold text-indigo-400">{score}</span>
                    </div>
                    <div className="w-px h-12 bg-slate-700" />
                    <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Moves
                        </span>
                        <span className="text-3xl font-extrabold text-emerald-400">{moves}</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onPlayAgain}
                    className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                    Play Again
                </button>
            </div>

            <style>{`
                @keyframes confetti-fall {
                    0%   { transform: translateY(-40px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .confetti {
                    position: absolute;
                    top: 0;
                    width: 10px;
                    height: 16px;
                    border-radius: 3px;
                    animation: confetti-fall linear infinite;
                    pointer-events: none;
                }

                @keyframes trophy-bounce {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-12px); }
                }
                .trophy-bounce {
                    animation: trophy-bounce 2s ease-in-out infinite;
                }

                @keyframes win-card-in {
                    0%   { transform: scale(0.6) translateY(30px); opacity: 0; }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                .win-card {
                    animation: win-card-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default WinMessage;

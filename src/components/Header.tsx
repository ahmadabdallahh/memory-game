import type { HeaderTypes } from "../utils/types";

export default function Header({ score, moves, ...props }: HeaderTypes) {
    return (
        <header className="w-full max-w-lg mx-auto bg-[#0f121d] text-white p-6 rounded-2xl border border-slate-800 shadow-2xl flex flex-col items-center gap-6 my-10">
            {/* Title with Emoji */}
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                Memory Card Game
            </h1>

            {/* Score & Moves Container */}
            <div className="flex items-center justify-center gap-12">
                <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Score:
                    </span>
                    <span className="text-3xl font-extrabold text-indigo-400">{score}</span>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Moves:
                    </span>
                    <span className="text-3xl font-extrabold text-indigo-400">{moves}</span>
                </div>
            </div>

            {/* New Game Button */}
            <button className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 active:scale-98" {...props}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                New Game
            </button>
        </header>
    );
}

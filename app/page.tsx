"use client";
import React, { useState } from "react";
import OneInchChainsDropdown from "../components/1inchChainsDropdown";
import TokensList from "../components/TokensList";

export default function Home() {
    const [selectedChain, setSelectedChain] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 flex flex-col items-center p-10">
            <div className="w-full max-w-5xl space-y-10">
                <header className="text-center">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg">
                        1inch Token Watch
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">
                        Search tokens, build a watchlist, and monitor markets in real-time
                    </p>
                </header>

                <section className="bg-gray-900/50 p-8 rounded-2xl border border-gray-700 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                    <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
                        1. Select a Chain
                    </h2>
                    <OneInchChainsDropdown onChainSelect={setSelectedChain} />
                </section>

                {selectedChain && (
                    <section className="bg-gray-900/50 p-8 rounded-2xl border border-gray-700 shadow-[0_0_15px_rgba(138,43,226,0.15)]">
                        <h2 className="text-2xl font-semibold text-purple-400 mb-4">
                            2. Search Tokens
                        </h2>
                        <TokensList chainId={selectedChain} />
                    </section>
                )}
            </div>
        </main>
    );
}

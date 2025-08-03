"use client";
import React, { useEffect, useState } from "react";
import { fetchTokens } from "../app/services/1inchAPI";

interface Token {
    address: string;
    symbol: string;
    name: string;
}

interface TokensListProps {
    chainId: number;
}

export default function TokensList({ chainId }: TokensListProps) {
    const [query, setQuery] = useState("");
    const [tokens, setTokens] = useState<Token[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) return;
        setLoading(true);
        setError(null);

        fetchTokens(chainId, query)
            .then((data) => setTokens(data.tokens ?? []))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [chainId, query]);

    return (
        <div>
            {/* Search Bar */}
            <div className="flex gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Type token name or symbol..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 p-3 bg-gray-800 text-white border border-gray-700 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500"
                />
                <button
                    onClick={() => setQuery(query)}
                    className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg shadow hover:opacity-90 transition"
                >
                    Search
                </button>
            </div>

            {/* Loading / Error */}
            {loading && <p className="text-cyan-400">Loading tokens...</p>}
            {error && <p className="text-red-400">Error: {error}</p>}

            {/* Token Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tokens.map((token) => (
                    <div
                        key={token.address}
                        className="p-4 bg-gray-800/70 border border-gray-700 rounded-xl shadow hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition"
                    >
                        <h3 className="font-semibold text-xl text-cyan-300">{token.symbol}</h3>
                        <p className="text-gray-400">{token.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

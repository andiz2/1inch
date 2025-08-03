"use client";

import React, { useState } from "react";

interface Token {
    address: string;
    symbol: string;
    name: string;
    logoURI?: string;
    rating?: string | null; // could be "N/A"
}
interface TokenWatchlistBlueprintProps {
    selectedChain: number | null;
}

export default function TokenWatchlistBlueprint({ selectedChain }: TokenWatchlistBlueprintProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Token[]>([]);
    const [watchlist, setWatchlist] = useState<
        (Token & { targetPrice?: number })[]
    >([]);

    // Placeholder: pretend this calls the API and updates searchResults
    const handleSearch = () => {
        // Example dummy data for UI layout only
        setSearchResults([
            {
                address: "0xabc",
                symbol: "BNB",
                name: "Binance Coin",
                logoURI: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
                rating: "N/A",
            },
            {
                address: "0xdef",
                symbol: "USDT",
                name: "Tether USD",
                rating: "N/A",
            },
        ]);
    };

    const toggleWatchlist = (token: Token) => {
        const isInWatchlist = watchlist.find((t) => t.address === token.address);
        if (isInWatchlist) {
            setWatchlist(watchlist.filter((t) => t.address !== token.address));
        } else {
            setWatchlist([...watchlist, token]);
        }
    };

    const updateTargetPrice = (address: string, price: number) => {
        setWatchlist(
            watchlist.map((token) =>
                token.address === address ? { ...token, targetPrice: price } : token
            )
        );
    };

    return (
        <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
            <h2>Token Search</h2>
            <input
                type="text"
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: 8, width: "300px" }}
            />
            <button onClick={handleSearch} style={{ marginLeft: 10, padding: 8 }}>
                Search
            </button>

            <h3>Search Results</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {searchResults.map((token) => (
                    <li
                        key={token.address}
                        style={{
                            marginBottom: 10,
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        {token.logoURI && (
                            <img src={token.logoURI} alt={token.symbol} width={24} />
                        )}
                        <div style={{ flexGrow: 1 }}>
                            <strong>{token.symbol}</strong> - {token.name}
                        </div>
                        <div>Rating: {token.rating || "N/A"}</div>
                        <button onClick={() => toggleWatchlist(token)}>
                            {watchlist.find((t) => t.address === token.address)
                                ? "Remove"
                                : "Add"}
                        </button>
                    </li>
                ))}
            </ul>

            <h3>Your Watchlist</h3>
            {watchlist.length === 0 && <p>No tokens added yet.</p>}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {watchlist.map((token) => (
                    <li key={token.address} style={{ marginBottom: 10 }}>
                        <strong>
                            {token.symbol} - {token.name}
                        </strong>
                        <div>
                            Target Price:{" "}
                            <input
                                type="number"
                                value={token.targetPrice || ""}
                                onChange={(e) =>
                                    updateTargetPrice(token.address, Number(e.target.value))
                                }
                                style={{ width: 100, marginLeft: 10 }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

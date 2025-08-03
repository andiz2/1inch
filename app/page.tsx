"use client";
import OneInchChainsDropdown from "../components/1inchChainsDropdown";
import TokensList from "../components/TokensList";
import React, { useState } from "react";

export default function Home() {
    const [selectedChain, setSelectedChain] = useState<number | null>(null);

    return (
        <main className="min-h-screen p-8 bg-gray-100">
            <OneInchChainsDropdown onChainSelect={setSelectedChain} />
            {selectedChain && <TokensList chainId={selectedChain} />}
        </main>
    );
}

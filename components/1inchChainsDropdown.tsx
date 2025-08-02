"use client";

import React, { useEffect, useState } from 'react';
import { fetchChains, Chain } from '../app/services/1inchAPI';

export default function OneInchChainsDropdown() {
    const [chains, setChains] = useState<Chain[]>([]);
    const [selectedChain, setSelectedChain] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchChains()
            .then(setChains)
            .catch((e) => setError(e.message));
    }, []);

    return (
        <div>
            <h2>Select Chain</h2>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <select onChange={e => setSelectedChain(Number(e.target.value))} value={selectedChain ?? ''}>
                <option value="" disabled>-- Select Chain --</option>
                {chains.map(chain => (
                    <option key={chain.chain_id} value={chain.chain_id}>
                        {chain.chain_name} ({chain.native_token.symbol})
                    </option>
                ))}
            </select>
            {selectedChain !== null && (
                <pre>{JSON.stringify(chains.find(c => c.id === selectedChain), null, 2)}</pre>
            )}
        </div>
    );
}

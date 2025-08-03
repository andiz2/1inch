
"use client";

import React, { useEffect, useState } from 'react';
import { fetchTokens, Token } from '../app/services/1inchAPI';

interface TokensListProps {
    chainId: number;
}

export default function TokensList({ chainId }: TokensListProps) {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!chainId) return;
        setLoading(true);
        fetchTokens(chainId)
            .then(setTokens)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [chainId]);

    if (loading) return <p>Loading tokens...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div>
            <h3>Tokens for Chain {chainId}</h3>
            <ul>
                {tokens.map((token) => (
                    <li key={token.address}>
                        {token.symbol} - {token.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
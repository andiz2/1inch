import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const chainId = searchParams.get('chainId');

    if (!chainId) {
        return new Response(JSON.stringify({ error: 'Missing chainId parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const response = await fetch(`https://api.1inch.dev/v5.0/${chainId}/tokens`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_INCH_API_KEY}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('1inch API error:', response.status, errorText);
            throw new Error('Failed to fetch tokens from 1inch API');
        }

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('API route error:', error);
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
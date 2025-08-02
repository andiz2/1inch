const apiKey = process.env.REACT_APP_INCH_API_KEY;

export interface Chain {
    chain_id: number;
    chain_name: string;
    chain_icon: string;
    native_token: {
        chain_id: number;
        address: string;
        decimals: number;
        symbol: string;
        name: string;
    };
}

export async function fetchChains(): Promise<Chain[]> {
    const res = await fetch('/api/notify'); // <-- call your Next.js API route here
    if (!res.ok) {
        throw new Error('Failed to fetch chains');
    }
    const data = await res.json();

    // ✅ Extract the array before returning
    return data.result;
}
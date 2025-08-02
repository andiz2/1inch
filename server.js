import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/api/chains', async (req, res) => {
    try {
        const response = await fetch('https://api.1inch.dev/v5.0/chains', {
            headers: { Authorization: `Bearer ${process.env.REACT_APP_INCH_API_KEY}` }
        });
        const data = await response.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(3001, () => {
    console.log('Backend API listening on http://localhost:3001');
});

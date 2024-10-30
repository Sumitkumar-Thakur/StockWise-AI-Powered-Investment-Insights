require('dotenv').config();
import express from 'express';
import financialService from './services/financialService';
import insightsService from './services/insightsService';

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint to fetch real-time financial insights for a given stock symbol
app.get('/api/financial-insights/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;

        // Step 1: Get raw financial data
        const financialData = await financialService.getFinancialData(symbol);
        const newsData = await financialService.getFinancialNews(symbol);

        // Step 2: Generate insights
        const insights = await insightsService.generateInsights(symbol, financialData, newsData);

        res.json({ symbol, insights });
    } catch (error) {
        console.error('Error generating insights:', error.message);
        res.status(500).json({ error: 'Failed to fetch financial insights' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

import axios from 'axios';

const FINANCIAL_API_KEY = process.env.FINANCIAL_API_KEY;

// Get financial data from a public API
async function getFinancialData(symbol) {
    try {
        const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${FINANCIAL_API_KEY}`;
        const response = await axios.get(url);
        return response.data[0]; // Assuming we get an array
    } catch (error) {
        console.error('Error fetching financial data:', error.message);
        throw error;
    }
}

// Get financial news related to a stock symbol
async function getFinancialNews(symbol) {
    try {
        const url = `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${FINANCIAL_API_KEY}`;
        const response = await axios.get(url);
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching financial news:', error.message);
        throw error;
    }
}

module.exports = { getFinancialData, getFinancialNews };

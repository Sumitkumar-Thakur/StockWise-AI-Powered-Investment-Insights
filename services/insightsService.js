import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain";
import { PromptTemplate } from "langchain/prompts";

// Initialize the OpenAI model
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "text-davinci-003",
    temperature: 0.7,
});

// Define the prompt template for LangChain
const template = `
Generate insights for the stock {symbol}. The financial data is as follows: 
Price: {price}, 
Change Percentage: {changesPercentage}%, 
Market Cap: {marketCap}. 
Recent news includes:

{newsSummary}

Provide actionable insights for a retail investor considering this data.
`;

// Create a prompt template instance
const prompt = new PromptTemplate({
    template,
    inputVariables: ["symbol", "price", "changesPercentage", "marketCap", "newsSummary"],
});

// Create an LLMChain with the OpenAI model and the prompt template
const chain = new LLMChain({ llm: openai, prompt });

async function generateInsights(symbol, financialData, newsData) {
    try {
        // Format the news data into a summary
        const newsSummary = newsData.slice(0, 3)
            .map(news => `${news.title}: ${news.description}`)
            .join('\n');

        // Run the LangChain LLMChain with input variables
        const response = await chain.call({
            symbol,
            price: financialData.price,
            changesPercentage: financialData.changesPercentage,
            marketCap: financialData.marketCap,
            newsSummary,
        });

        return response.text.trim();
    } catch (error) {
        console.error('Error generating insights:', error.message);
        throw error;
    }
}

module.exports = { generateInsights };

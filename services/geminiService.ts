
import { GoogleGenAI, Type } from "@google/genai";
import { Sentiment, SentimentAnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const sentimentSchema = {
    type: Type.OBJECT,
    properties: {
        sentiment: {
            type: Type.STRING,
            description: "The sentiment of the text.",
            enum: [Sentiment.Positive, Sentiment.Negative, Sentiment.Neutral],
        },
        confidence: {
            type: Type.NUMBER,
            description: "A confidence score between 0.0 and 1.0 for the sentiment classification.",
        },
    },
    required: ["sentiment", "confidence"],
};

export async function analyzeSentiment(text: string): Promise<Omit<SentimentAnalysisResult, 'text'>> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze the sentiment of the following text. Classify it as Positive, Negative, or Neutral and provide a confidence score. Text: "${text}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: sentimentSchema,
            },
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        
        // Validate the result
        if (Object.values(Sentiment).includes(result.sentiment) && typeof result.confidence === 'number') {
            return {
                sentiment: result.sentiment,
                confidence: result.confidence,
            };
        } else {
            throw new Error("Invalid response format from API");
        }

    } catch (error) {
        console.error("Error analyzing sentiment:", error);
        throw new Error("Failed to analyze sentiment. The model may have returned an unexpected format.");
    }
}


export enum Sentiment {
    Positive = 'Positive',
    Negative = 'Negative',
    Neutral = 'Neutral',
}

export interface SentimentAnalysisResult {
    text: string;
    sentiment: Sentiment;
    confidence: number;
}

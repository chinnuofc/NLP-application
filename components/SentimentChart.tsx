import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sentiment, SentimentAnalysisResult } from '../types';

interface SentimentChartProps {
    results: SentimentAnalysisResult[];
}

const COLORS = {
    [Sentiment.Positive]: '#10b981', // emerald-500
    [Sentiment.Negative]: '#f43f5e', // rose-500
    [Sentiment.Neutral]: '#64748b',  // slate-500
};

const SentimentChart: React.FC<SentimentChartProps> = ({ results }) => {
    const sentimentCounts = results.reduce((acc, result) => {
        acc[result.sentiment] = (acc[result.sentiment] || 0) + 1;
        return acc;
    }, {} as Record<Sentiment, number>);

    const data = Object.entries(sentimentCounts).map(([name, value]) => ({
        name: name as Sentiment,
        value,
    }));
    
    if (results.length === 0) {
        return (
             <div className="bg-white p-6 rounded-2xl shadow-md text-center flex flex-col justify-center items-center h-full min-h-[300px]">
                <svg className="w-16 h-16 text-slate-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sentiment Distribution</h3>
                <p className="text-gray-500">Your analysis results will appear here.</p>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md h-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Sentiment Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SentimentChart;
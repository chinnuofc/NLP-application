import React from 'react';
import { Sentiment, SentimentAnalysisResult } from '../types';
import { ThumbsUpIcon, ThumbsDownIcon, NeutralFaceIcon } from './icons';

interface SentimentResultDisplayProps {
    result: SentimentAnalysisResult;
}

const sentimentConfig = {
    [Sentiment.Positive]: {
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-800',
        progressBg: 'bg-emerald-500',
        borderColor: 'border-emerald-200',
        Icon: ThumbsUpIcon,
    },
    [Sentiment.Negative]: {
        bgColor: 'bg-rose-50',
        textColor: 'text-rose-800',
        progressBg: 'bg-rose-500',
        borderColor: 'border-rose-200',
        Icon: ThumbsDownIcon,
    },
    [Sentiment.Neutral]: {
        bgColor: 'bg-slate-100',
        textColor: 'text-slate-700',
        progressBg: 'bg-slate-500',
        borderColor: 'border-slate-200',
        Icon: NeutralFaceIcon,
    },
};

const SentimentResultDisplay: React.FC<SentimentResultDisplayProps> = ({ result }) => {
    const config = sentimentConfig[result.sentiment];
    const confidencePercent = Math.round(result.confidence * 100);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-4">
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold ${config.bgColor} ${config.textColor}`}>
                    <config.Icon className="w-5 h-5 mr-2" />
                    {result.sentiment}
                </span>
            </div>

            <blockquote className={`text-gray-600 border-l-4 ${config.borderColor} pl-4 italic mb-4`}>
                "{result.text}"
            </blockquote>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Confidence</span>
                    <span className={`text-sm font-bold ${config.textColor}`}>{confidencePercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`${config.progressBg} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${confidencePercent}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default SentimentResultDisplay;
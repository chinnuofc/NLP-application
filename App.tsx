import React, { useState, useCallback, useRef } from 'react';
import { Sentiment, SentimentAnalysisResult } from './types';
import { analyzeSentiment } from './services/geminiService';
import SentimentResultDisplay from './components/SentimentResultDisplay';
import SentimentChart from './components/SentimentChart';
import ErrorAlert from './components/ErrorAlert';
import { UploadIcon, PulsingDotsLoader } from './components/icons';

const App: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [results, setResults] = useState<SentimentAnalysisResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [batchProgress, setBatchProgress] = useState<{ processed: number; total: number } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAnalysis = useCallback(async (inputText: string) => {
        if (!inputText.trim()) {
            setError('Please enter some text to analyze.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setBatchProgress(null);
        try {
            const analysis = await analyzeSentiment(inputText);
            const newResult: SentimentAnalysisResult = { text: inputText, ...analysis };
            setResults(prev => [newResult, ...prev]);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAnalysis(text);
        setText('');
    };

    const handleClear = () => {
        setText('');
        setError(null);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileContent = event.target?.result as string;
                const lines = fileContent.split('\n').filter(line => line.trim() !== '');
                
                if (lines.length === 0) return;

                setIsLoading(true);
                setError(null);
                setBatchProgress({ processed: 0, total: lines.length });
                
                const batchResults: SentimentAnalysisResult[] = [];
                for (const [index, line] of lines.entries()) {
                    try {
                        const analysis = await analyzeSentiment(line);
                        batchResults.push({ text: line, ...analysis });
                    } catch (err) {
                        console.error(`Failed to analyze line: "${line}"`, err);
                    }
                    setBatchProgress({ processed: index + 1, total: lines.length });
                }
                setResults(prev => [...batchResults.reverse(), ...prev]);
                setIsLoading(false);
                setBatchProgress(null);
            };
            reader.readAsText(file);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const latestResult = results[0];

    return (
        <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
            <main className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                         <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                            Sentiment Analysis AI
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">Instantly classify text as positive, negative, or neutral with Gemini.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                             <form onSubmit={handleSubmit}>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Enter your review or text here..."
                                    className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow resize-none bg-gray-50/50"
                                    disabled={isLoading}
                                />
                                {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}
                                
                                {batchProgress && (
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium text-indigo-700">
                                                Processing batch...
                                            </span>
                                            <span className="text-sm font-medium text-gray-500">
                                                {batchProgress.processed} / {batchProgress.total}
                                            </span>
                                        </div>
                                        <div className="w-full bg-indigo-100 rounded-full h-2.5">
                                            <div
                                                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-200"
                                                style={{ width: `${(batchProgress.processed / batchProgress.total) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                                    <div className="flex gap-2">
                                         <button
                                            type="submit"
                                            className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center w-36"
                                            disabled={isLoading}
                                        >
                                            {isLoading && !batchProgress ? (
                                                <PulsingDotsLoader />
                                            ) : 'Analyze Text'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClear}
                                            className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors disabled:opacity-50"
                                            disabled={isLoading}
                                        >
                                            Clear
                                        </button>
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            accept=".txt"
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={triggerFileUpload}
                                            className="text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50 flex items-center gap-2"
                                            disabled={isLoading}
                                        >
                                            <UploadIcon className="w-5 h-5"/>
                                            Batch Upload
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {latestResult && <SentimentResultDisplay result={latestResult} />}
                    </div>

                    <div className="sticky top-8">
                        <SentimentChart results={results} />
                    </div>
                </div>

                {results.length > 1 && (
                     <div className="mt-12">
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Analysis History</h2>
                        <div className="space-y-4 max-h-[40rem] overflow-y-auto pr-2">
                           {results.slice(1).map((result, index) => (
                               <SentimentResultDisplay key={results.length - index -1} result={result} />
                           ))}
                        </div>
                     </div>
                )}
            </main>
        </div>
    );
};

export default App;
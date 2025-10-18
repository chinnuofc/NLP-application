import React from 'react';
import { ErrorIcon } from './icons';

interface ErrorAlertProps {
    message: string;
    onDismiss: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => {
    if (!message) return null;

    return (
        <div className="bg-rose-100 border-l-4 border-rose-500 text-rose-700 p-4 mt-4 rounded-r-lg" role="alert">
            <div className="flex">
                <div className="py-1">
                    <ErrorIcon className="w-6 h-6 mr-4 text-rose-500" />
                </div>
                <div>
                    <p className="font-bold">Error</p>
                    <p className="text-sm">{message}</p>
                </div>
                <div className="ml-auto pl-3">
                    <button onClick={onDismiss} className="text-rose-500 hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 rounded-full p-1 transition-colors">
                         <span className="sr-only">Close</span>
                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                         </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorAlert;
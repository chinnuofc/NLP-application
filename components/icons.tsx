
import React from 'react';

export const ThumbsUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.17 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10l-2.09 4.63a1 1 0 0 0 .37 1.37a1 1 0 0 0 1.41-.1L16 16h5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-7z" />
    </svg>
);

export const ThumbsDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.83 23H20a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-5l2.09-4.63a1 1 0 0 0-.37-1.37a1 1 0 0 0-1.41.1L8 8H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h7z" />
    </svg>
);

export const NeutralFaceIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-4h8v-2H8v2zm0-4h8v-2H8v2z" />
    </svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </svg>
);

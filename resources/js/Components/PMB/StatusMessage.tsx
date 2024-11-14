import React from 'react';

interface StatusMessageProps {
    type: 'success' | 'error';
    message: string;
}

export default function StatusMessage({ type, message }: StatusMessageProps) {
    const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50';
    const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
    const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

    return (
        <div className={`${bgColor} border-l-4 ${borderColor} p-4 mb-4`}>
            <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
    );
}
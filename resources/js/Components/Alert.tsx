import React, { useEffect, useState } from 'react';

interface Props {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

export default function Alert({ message, type = 'info', duration = 3000 }: Props) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!show) return null;

    const bgColor = {
        success: 'bg-green-100 border-green-500 text-green-700',
        error: 'bg-red-100 border-red-500 text-red-700',
        warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
        info: 'bg-blue-100 border-blue-500 text-blue-700'
    }[type];

    return (
        <div className={`border-l-4 p-4 ${bgColor}`} role="alert">
            <p>{message}</p>
        </div>
    );
} 
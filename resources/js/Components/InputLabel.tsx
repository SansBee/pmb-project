import React from 'react';

interface InputLabelProps {
    htmlFor: string;
    value: string;
    className?: string;
}

export default function InputLabel({ htmlFor, value, className = '' }: InputLabelProps) {
    return (
        <label htmlFor={htmlFor} className={`block font-medium text-sm text-gray-700 ` + className}>
            {value}
        </label>
    );
}
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholderText?: string;
}

export function DatePicker({ selected, onChange, placeholderText }: Props) {
    return (
        <ReactDatePicker
            selected={selected}
            onChange={onChange}
            placeholderText={placeholderText}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
    );
} 
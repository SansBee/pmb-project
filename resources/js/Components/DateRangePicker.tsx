import React from 'react';
import { DatePicker } from './Form/DatePicker';

interface Props {
    startDate: Date | null;
    endDate: Date | null;
    onChange: (dates: [Date | null, Date | null]) => void;
}

export default function DateRangePicker({ startDate, endDate, onChange }: Props) {
    return (
        <div className="flex items-center gap-2">
            <DatePicker
                selected={startDate}
                onChange={(date) => onChange([date, endDate])}
                placeholderText="Tanggal Mulai"
            />
            <span>-</span>
            <DatePicker
                selected={endDate}
                onChange={(date) => onChange([startDate, date])}
                placeholderText="Tanggal Selesai"
            />
        </div>
    );
} 
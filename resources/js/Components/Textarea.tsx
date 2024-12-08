interface TextareaProps {
    label: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    rows?: number;
}

export default function Textarea({ label, value, onChange, error, rows = 4 }: TextareaProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                rows={rows}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
} 
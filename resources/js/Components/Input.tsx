interface InputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean;
    min?: number;
    max?: number;
    step?: string;
    maxLength?: number;
    error?: string;
}

export default function Input({ type = 'text', label, value, onChange, error, required, maxLength }: InputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
} 
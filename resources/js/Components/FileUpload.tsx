interface FileUploadProps {
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    accept?: string;
}

export default function FileUpload({ label, onChange, error, accept }: FileUploadProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type="file"
                onChange={onChange}
                accept={accept}
                className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
} 
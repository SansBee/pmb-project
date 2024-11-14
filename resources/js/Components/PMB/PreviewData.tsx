import React from 'react';

interface PreviewDataProps {
    data: Record<string, any>;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function PreviewData({ data, onConfirm, onCancel }: PreviewDataProps) {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                <h3 className="text-lg font-medium mb-4">Konfirmasi Data Pendaftaran</h3>
                
                <div className="space-y-4">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-2 gap-4">
                            <div className="text-gray-600">{key.replace(/_/g, ' ').toUpperCase()}</div>
                            <div>{value}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Kembali
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                    >
                        Konfirmasi & Daftar
                    </button>
                </div>
            </div>
        </div>
    );
}
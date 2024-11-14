import React from 'react';

export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-gray-700">Sedang memproses pendaftaran...</p>
            </div>
        </div>
    );
}
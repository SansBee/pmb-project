import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    initialFilter?: {
        tanggal_mulai?: string;
        tanggal_selesai?: string;
        program_studi_id?: number;
        gelombang_id?: number;
        status?: string;
    };
    onClose: () => void;
}

export default function Filter({ initialFilter, onClose }: Props) {
    const { data, setData, get, processing } = useForm({
        tanggal_mulai: initialFilter?.tanggal_mulai || '',
        tanggal_selesai: initialFilter?.tanggal_selesai || '',
        program_studi_id: initialFilter?.program_studi_id || '',
        gelombang_id: initialFilter?.gelombang_id || '',
        status: initialFilter?.status || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        get(route('admin.laporan'), {
            data,
            preserveState: true,
            onSuccess: () => onClose(),
        });
    };

    const handleReset = () => {
        get(route('admin.laporan'), {
            preserveState: true,
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Filter Laporan
                    </h3>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Tanggal Mulai
                            </label>
                            <input
                                type="date"
                                value={data.tanggal_mulai}
                                onChange={e => setData('tanggal_mulai', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Tanggal Selesai
                            </label>
                            <input
                                type="date"
                                value={data.tanggal_selesai}
                                onChange={e => setData('tanggal_selesai', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Program Studi
                            </label>
                            <select
                                value={data.program_studi_id}
                                onChange={e => setData('program_studi_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Semua Program Studi</option>
                                {/* Program Studi options will be rendered here */}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Gelombang
                            </label>
                            <select
                                value={data.gelombang_id}
                                onChange={e => setData('gelombang_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Semua Gelombang</option>
                                {/* Gelombang options will be rendered here */}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Semua Status</option>
                                <option value="baru">Baru</option>
                                <option value="verifikasi">Verifikasi</option>
                                <option value="diterima">Diterima</option>
                                <option value="ditolak">Ditolak</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Terapkan Filter'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 
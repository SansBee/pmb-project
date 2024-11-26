import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    isEdit?: boolean;
    metode?: {
        id: number;
        nama_metode: string;
        nomor_rekening: string;
        atas_nama: string;
        instruksi: string;
        is_active: boolean;
    };
    onClose: () => void;
}

interface FormData {
    nama_metode: string;
    nomor_rekening: string;
    atas_nama: string;
    instruksi: string;
    is_active: boolean;
}

export default function MetodeForm({ isEdit = false, metode, onClose }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        nama_metode: metode?.nama_metode || '',
        nomor_rekening: metode?.nomor_rekening || '',
        atas_nama: metode?.atas_nama || '',
        instruksi: metode?.instruksi || '',
        is_active: metode?.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit && metode) {
            put(`/admin/biaya/metode/${metode.id}`, {
                onSuccess: () => onClose(),
            });
        } else {
            post('/admin/biaya/metode', {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {isEdit ? 'Edit Metode Pembayaran' : 'Tambah Metode Pembayaran'}
                    </h3>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Nama Metode
                            </label>
                            <select
                                value={data.nama_metode}
                                onChange={e => setData('nama_metode', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Pilih Metode</option>
                                <option value="bank">Transfer Bank</option>
                                <option value="ewallet">E-Wallet</option>
                                <option value="tunai">Tunai</option>
                            </select>
                            {errors.nama_metode && (
                                <div className="text-red-500 text-sm mt-1">{errors.nama_metode}</div>
                            )}
                        </div>

                        {data.nama_metode === 'bank' && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nomor Rekening
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nomor_rekening}
                                        onChange={e => setData('nomor_rekening', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.nomor_rekening && (
                                        <div className="text-red-500 text-sm mt-1">{errors.nomor_rekening}</div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Atas Nama
                                    </label>
                                    <input
                                        type="text"
                                        value={data.atas_nama}
                                        onChange={e => setData('atas_nama', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.atas_nama && (
                                        <div className="text-red-500 text-sm mt-1">{errors.atas_nama}</div>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Instruksi Pembayaran
                            </label>
                            <textarea
                                value={data.instruksi}
                                onChange={e => setData('instruksi', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.instruksi && (
                                <div className="text-red-500 text-sm mt-1">{errors.instruksi}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Aktif</span>
                            </label>
                        </div>

                        <div className="flex justify-end gap-2">
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
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 
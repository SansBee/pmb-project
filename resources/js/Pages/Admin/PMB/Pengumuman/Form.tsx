import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    isEdit?: boolean;
    pengumuman?: {
        id: number;
        judul: string;
        isi: string;
        tanggal_publikasi: string;
        tanggal_berakhir: string | null;
        is_active: boolean;
    };
    onClose: () => void;
}

interface FormData {
    judul: string;
    isi: string;
    tanggal_publikasi: string;
    tanggal_berakhir: string;
    is_active: boolean;
}

export default function PengumumanForm({ isEdit = false, pengumuman, onClose }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        judul: pengumuman?.judul || '',
        isi: pengumuman?.isi || '',
        tanggal_publikasi: pengumuman?.tanggal_publikasi || '',
        tanggal_berakhir: pengumuman?.tanggal_berakhir || '',
        is_active: pengumuman?.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit && pengumuman) {
            put(`/admin/pengumuman/${pengumuman.id}`, {
                onSuccess: () => onClose(),
            });
        } else {
            post('/admin/pengumuman', {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {isEdit ? 'Edit Pengumuman' : 'Tambah Pengumuman'}
                    </h3>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Judul Pengumuman
                            </label>
                            <input
                                type="text"
                                value={data.judul}
                                onChange={e => setData('judul', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.judul && (
                                <div className="text-red-500 text-sm mt-1">{errors.judul}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Isi Pengumuman
                            </label>
                            <textarea
                                value={data.isi}
                                onChange={e => setData('isi', e.target.value)}
                                rows={6}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.isi && (
                                <div className="text-red-500 text-sm mt-1">{errors.isi}</div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tanggal Publikasi
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.tanggal_publikasi}
                                    onChange={e => setData('tanggal_publikasi', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.tanggal_publikasi && (
                                    <div className="text-red-500 text-sm mt-1">{errors.tanggal_publikasi}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tanggal Berakhir (Opsional)
                                </label>
                                <input
                                    type="datetime-local"
                                    value={data.tanggal_berakhir}
                                    onChange={e => setData('tanggal_berakhir', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.tanggal_berakhir && (
                                    <div className="text-red-500 text-sm mt-1">{errors.tanggal_berakhir}</div>
                                )}
                            </div>
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
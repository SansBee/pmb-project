import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    isEdit?: boolean;
    kategori?: {
        id: number;
        nama_kategori: string;
        urutan: number;
        is_active: boolean;
    };
    onClose: () => void;
}

interface FormData {
    nama_kategori: string;
    urutan: number;
    is_active: boolean;
}

export default function KategoriForm({ isEdit = false, kategori, onClose }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        nama_kategori: kategori?.nama_kategori || '',
        urutan: kategori?.urutan || 0,
        is_active: kategori?.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit && kategori) {
            put(`/admin/faq/kategori/${kategori.id}`, {
                onSuccess: () => onClose(),
            });
        } else {
            post('/admin/faq/kategori', {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {isEdit ? 'Edit Kategori FAQ' : 'Tambah Kategori FAQ'}
                    </h3>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Nama Kategori
                            </label>
                            <input
                                type="text"
                                value={data.nama_kategori}
                                onChange={e => setData('nama_kategori', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.nama_kategori && (
                                <div className="text-red-500 text-sm mt-1">{errors.nama_kategori}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Urutan
                            </label>
                            <input
                                type="number"
                                value={data.urutan}
                                onChange={e => setData('urutan', Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                min="0"
                            />
                            {errors.urutan && (
                                <div className="text-red-500 text-sm mt-1">{errors.urutan}</div>
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
import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    isEdit?: boolean;
    programStudi?: {
        id: number;
        nama: string;
        deskripsi: string;
        kuota: number;
        is_active: boolean;
    };
    onClose: () => void;
}

export default function Form({ isEdit = false, programStudi, onClose }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        nama: programStudi?.nama || '',
        deskripsi: programStudi?.deskripsi || '',
        kuota: programStudi?.kuota || 0,
        is_active: programStudi?.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit && programStudi) {
            put(route('admin.program-studi.update', programStudi.id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.error(errors);
                }
            });
        } else {
            post(route('admin.program-studi.store'), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    onClose();
                },
                onError: (errors) => {
                    console.error(errors);
                }
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {isEdit ? 'Edit Program Studi' : 'Tambah Program Studi'}
                    </h3>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Nama Program Studi
                            </label>
                            <input
                                type="text"
                                value={data.nama}
                                onChange={e => setData('nama', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                            {errors.nama && (
                                <div className="text-red-500 text-sm mt-1">{errors.nama}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.deskripsi}
                                onChange={e => setData('deskripsi', e.target.value)}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                                placeholder="Masukkan deskripsi program studi..."
                            />
                            {errors.deskripsi && (
                                <div className="text-red-500 text-sm mt-1">{errors.deskripsi}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Kuota
                            </label>
                            <input
                                type="number"
                                value={data.kuota}
                                onChange={e => setData('kuota', Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                min="0"
                                required
                            />
                            {errors.kuota && (
                                <div className="text-red-500 text-sm mt-1">{errors.kuota}</div>
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
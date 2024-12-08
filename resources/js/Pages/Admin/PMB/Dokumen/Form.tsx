import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    isEdit?: boolean;
    dokumen?: {
        id: number;
        nama_dokumen: string;
        deskripsi?: string;
        kategori: string;
        format_file: string;
        max_size: number;
        size_type: string;
        is_wajib: boolean;
        is_active: boolean;
    };
    kategori_list: Record<string, string>;
    format_list: Record<string, string>;
    size_type_list: Record<string, string>;
    onClose: () => void;
}

export default function Form({ isEdit = false, dokumen, kategori_list, format_list, size_type_list, onClose }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        nama_dokumen: dokumen?.nama_dokumen || '',
        deskripsi: dokumen?.deskripsi || '',
        kategori: dokumen?.kategori || '',
        format_file: dokumen?.format_file || '',
        max_size: dokumen?.max_size || 1,
        size_type: dokumen?.size_type || 'MB',
        is_wajib: dokumen?.is_wajib ?? true,
        is_active: dokumen?.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!data.kategori) {
            setData('kategori', '');
            return;
        }
        if (!data.format_file) {
            setData('format_file', '');
            return;
        }
        
        if (isEdit && dokumen) {
            put(route('admin.dokumen.update', dokumen.id), {
                onSuccess: () => onClose(),
            });
        } else {
            post(route('admin.dokumen.store'), {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {isEdit ? 'Edit Dokumen' : 'Tambah Dokumen'}
                    </h3>
                    
                    <form onSubmit={handleSubmit}>
                        {/* Nama Dokumen */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 required">
                                Nama Dokumen
                            </label>
                            <input
                                type="text"
                                value={data.nama_dokumen}
                                onChange={e => setData('nama_dokumen', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                            {errors.nama_dokumen && (
                                <div className="text-red-500 text-sm mt-1">{errors.nama_dokumen}</div>
                            )}
                        </div>

                        {/* Kategori */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 required">
                                Kategori
                            </label>
                            <select
                                value={data.kategori}
                                onChange={e => setData('kategori', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                {Object.entries(kategori_list).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.kategori && (
                                <div className="text-red-500 text-sm mt-1">{errors.kategori}</div>
                            )}
                        </div>

                        {/* Format File */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 required">
                                Format File
                            </label>
                            <select
                                value={data.format_file}
                                onChange={e => setData('format_file', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Pilih Format</option>
                                {Object.entries(format_list).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.format_file && (
                                <div className="text-red-500 text-sm mt-1">{errors.format_file}</div>
                            )}
                        </div>

                        {/* Ukuran File dengan Helper */}
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Ukuran Maksimal
                                </label>
                                <input
                                    type="number"
                                    value={data.max_size}
                                    onChange={e => setData('max_size', Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    min="1"
                                />
                                <div className="text-sm text-gray-500 mt-1">
                                    {`Maksimal ${data.max_size} ${data.size_type}`}
                                    {data.size_type === 'MB' && ` (${data.max_size * 1024} KB)`}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Satuan
                                </label>
                                <select
                                    value={data.size_type}
                                    onChange={e => setData('size_type', e.target.value as 'KB' | 'MB')}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    {Object.entries(size_type_list).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.deskripsi}
                                onChange={e => setData('deskripsi', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.deskripsi && (
                                <div className="text-red-500 text-sm mt-1">{errors.deskripsi}</div>
                            )}
                        </div>

                        {/* Status */}
                        <div className="mb-4 space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_wajib}
                                    onChange={e => setData('is_wajib', e.target.checked)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Dokumen Wajib</span>
                            </label>
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
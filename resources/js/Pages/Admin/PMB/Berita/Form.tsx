import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';

interface Props {
    isEdit: boolean;
    berita?: {
        id: number;
        judul: string;
        kategori: string;
        excerpt: string;
        konten: string;
        tanggal_publikasi: string;
        is_active: boolean;
    };
    kategori: Record<string, string>;
    onClose: () => void;
}

interface SubmitData {
    [key: string]: string;
}

export default function Form({ isEdit, berita, kategori, onClose }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        judul: berita?.judul || '',
        kategori: berita?.kategori || '',
        excerpt: berita?.excerpt || '',
        konten: berita?.konten || '',
        gambar: null as File | null,
        tanggal_publikasi: berita?.tanggal_publikasi || new Date().toISOString().split('T')[0],
        is_active: berita?.is_active ?? true
    });

    console.log('Form Data:', data);

    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const submitData: SubmitData = {
            judul: data.judul,
            kategori: data.kategori,
            excerpt: data.excerpt,
            konten: data.konten,
            tanggal_publikasi: data.tanggal_publikasi,
            is_active: data.is_active ? '1' : '0',
            _method: isEdit ? 'put' : 'post'
        };

        const formData = new FormData();
        
        Object.keys(submitData).forEach(key => {
            formData.append(key, submitData[key]);
        });

        if (data.gambar instanceof File) {
            formData.append('gambar', data.gambar);
        }
        
        if (isEdit && berita) {
            router.post(route('admin.berita.update', berita.id), formData, {
                onSuccess: () => {
                    onClose();
                    window.location.reload();
                },
                onFinish: () => {
                    onClose();
                }
            });
        } else {
            router.post(route('admin.berita.store'), formData, {
                onSuccess: () => {
                    onClose();
                    window.location.reload();
                },
                onFinish: () => {
                    onClose();
                }
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('gambar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <Modal show={true} onClose={onClose} maxWidth="2xl">
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium mb-4">
                    {isEdit ? 'Edit Berita' : 'Tambah Berita'}
                </h2>

                <div className="space-y-4">
                    {/* Judul */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Judul
                        </label>
                        <input
                            type="text"
                            value={data.judul}
                            onChange={e => setData('judul', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.judul && (
                            <p className="mt-1 text-sm text-red-600">{errors.judul}</p>
                        )}
                    </div>

                    {/* Kategori */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Kategori
                        </label>
                        <select
                            value={data.kategori}
                            onChange={e => setData('kategori', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Pilih Kategori</option>
                            {Object.entries(kategori).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        {errors.kategori && (
                            <p className="mt-1 text-sm text-red-600">{errors.kategori}</p>
                        )}
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Ringkasan
                        </label>
                        <textarea
                            value={data.excerpt}
                            onChange={e => setData('excerpt', e.target.value)}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.excerpt && (
                            <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                        )}
                    </div>

                    {/* Konten */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Konten
                        </label>
                        <textarea
                            value={data.konten}
                            onChange={e => setData('konten', e.target.value)}
                            rows={6}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.konten && (
                            <p className="mt-1 text-sm text-red-600">{errors.konten}</p>
                        )}
                    </div>

                    {/* Gambar */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Gambar
                            <span className="text-xs text-gray-500 ml-1">
                                (Max: 10MB, Format: JPG, JPEG, PNG)
                            </span>
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="mt-1 block w-full"
                        />
                        {errors.gambar && (
                            <p className="mt-1 text-sm text-red-600">{errors.gambar}</p>
                        )}
                        {preview && (
                            <img 
                                src={preview} 
                                alt="Preview" 
                                className="mt-2 h-32 object-cover rounded-lg"
                            />
                        )}
                    </div>

                    {/* Tanggal Publikasi */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tanggal Publikasi
                        </label>
                        <input
                            type="date"
                            value={data.tanggal_publikasi}
                            onChange={e => setData('tanggal_publikasi', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.tanggal_publikasi && (
                            <p className="mt-1 text-sm text-red-600">{errors.tanggal_publikasi}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={e => setData('is_active', e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            Aktif
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md hover:bg-gray-50"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {isEdit ? 'Update' : 'Simpan'}
                    </button>
                </div>
            </form>
        </Modal>
    );
} 
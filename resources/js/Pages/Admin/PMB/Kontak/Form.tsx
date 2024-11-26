import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    isEdit?: boolean;
    kontak?: {
        id: number;
        jenis: string;
        label: string;
        nilai: string;
        deskripsi: string | null;
        is_active: boolean;
    };
    onClose: () => void;
}

interface FormData {
    jenis: string;
    label: string;
    nilai: string;
    deskripsi: string;
    is_active: boolean;
}

export default function KontakForm({ isEdit = false, kontak, onClose }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        jenis: kontak?.jenis || '',
        label: kontak?.label || '',
        nilai: kontak?.nilai || '',
        deskripsi: kontak?.deskripsi || '',
        is_active: kontak?.is_active ?? true,
    });

    const jenisKontak = [
        { value: 'telepon', label: 'Nomor Telepon' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'email', label: 'Email' },
        { value: 'alamat', label: 'Alamat' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'youtube', label: 'YouTube' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit && kontak) {
            put(`/admin/kontak/${kontak.id}`, {
                onSuccess: () => onClose(),
            });
        } else {
            post('/admin/kontak', {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {isEdit ? 'Edit Kontak & Informasi' : 'Tambah Kontak & Informasi'}
                    </h3>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Jenis Kontak
                            </label>
                            <select
                                value={data.jenis}
                                onChange={e => setData('jenis', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Pilih Jenis Kontak</option>
                                {jenisKontak.map(jenis => (
                                    <option key={jenis.value} value={jenis.value}>
                                        {jenis.label}
                                    </option>
                                ))}
                            </select>
                            {errors.jenis && (
                                <div className="text-red-500 text-sm mt-1">{errors.jenis}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Label
                            </label>
                            <input
                                type="text"
                                value={data.label}
                                onChange={e => setData('label', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Contoh: Hotline PMB"
                            />
                            {errors.label && (
                                <div className="text-red-500 text-sm mt-1">{errors.label}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Nilai
                            </label>
                            {data.jenis === 'alamat' ? (
                                <textarea
                                    value={data.nilai}
                                    onChange={e => setData('nilai', e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            ) : (
                                <input
                                    type={data.jenis === 'email' ? 'email' : 'text'}
                                    value={data.nilai}
                                    onChange={e => setData('nilai', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder={data.jenis === 'email' ? 'email@example.com' : ''}
                                />
                            )}
                            {errors.nilai && (
                                <div className="text-red-500 text-sm mt-1">{errors.nilai}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Deskripsi (Opsional)
                            </label>
                            <textarea
                                value={data.deskripsi}
                                onChange={e => setData('deskripsi', e.target.value)}
                                rows={2}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Informasi tambahan..."
                            />
                            {errors.deskripsi && (
                                <div className="text-red-500 text-sm mt-1">{errors.deskripsi}</div>
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
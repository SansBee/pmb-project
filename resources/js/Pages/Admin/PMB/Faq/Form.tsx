import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    isEdit?: boolean;
    faq?: {
        id: number;
        kategori_id: number;
        pertanyaan: string;
        jawaban: string;
        urutan: number;
        is_active: boolean;
    };
    kategori: Array<{
        id: number;
        nama_kategori: string;
    }>;
    onClose: () => void;
}

interface FormData {
    kategori_id: number;
    pertanyaan: string;
    jawaban: string;
    urutan: number;
    is_active: boolean;
}

export default function FaqForm({ isEdit = false, faq, kategori, onClose }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<FormData>({
        kategori_id: faq?.kategori_id || kategori[0]?.id || 0,
        pertanyaan: faq?.pertanyaan || '',
        jawaban: faq?.jawaban || '',
        urutan: faq?.urutan || 0,
        is_active: faq?.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit && faq) {
            put(`/admin/faq/${faq.id}`, {
                onSuccess: () => onClose(),
            });
        } else {
            post('/admin/faq', {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {isEdit ? 'Edit FAQ' : 'Tambah FAQ'}
                    </h3>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Kategori
                            </label>
                            <select
                                value={data.kategori_id}
                                onChange={e => setData('kategori_id', Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {kategori.map(k => (
                                    <option key={k.id} value={k.id}>
                                        {k.nama_kategori}
                                    </option>
                                ))}
                            </select>
                            {errors.kategori_id && (
                                <div className="text-red-500 text-sm mt-1">{errors.kategori_id}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Pertanyaan
                            </label>
                            <input
                                type="text"
                                value={data.pertanyaan}
                                onChange={e => setData('pertanyaan', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.pertanyaan && (
                                <div className="text-red-500 text-sm mt-1">{errors.pertanyaan}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Jawaban
                            </label>
                            <textarea
                                value={data.jawaban}
                                onChange={e => setData('jawaban', e.target.value)}
                                rows={6}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.jawaban && (
                                <div className="text-red-500 text-sm mt-1">{errors.jawaban}</div>
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
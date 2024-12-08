import React from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';

interface Props {
    isEdit?: boolean;
    jalurMasuk?: {
        id: number;
        nama_jalur: string;
        deskripsi: string;
        persyaratan: string | string[];
        keuntungan: string | string[];
        biaya: number;
        kuota: number;
        is_active: boolean;
        urutan: number;
    };
    onClose: () => void;
}

export default function JalurMasukForm({ isEdit = false, jalurMasuk, onClose }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        nama_jalur: jalurMasuk?.nama_jalur || '',
        deskripsi: jalurMasuk?.deskripsi || '',
        persyaratan: jalurMasuk?.persyaratan ? 
            (typeof jalurMasuk.persyaratan === 'string' ? 
                JSON.parse(jalurMasuk.persyaratan) : jalurMasuk.persyaratan) : [''],
        keuntungan: jalurMasuk?.keuntungan ? 
            (typeof jalurMasuk.keuntungan === 'string' ? 
                JSON.parse(jalurMasuk.keuntungan) : jalurMasuk.keuntungan) : [''],
        biaya: jalurMasuk?.biaya || 0,
        kuota: jalurMasuk?.kuota || 0,
        is_active: jalurMasuk?.is_active ?? true,
        urutan: jalurMasuk?.urutan || 0
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = {
            data: {
                ...data,
                persyaratan: JSON.stringify(data.persyaratan),
                keuntungan: JSON.stringify(data.keuntungan)
            }
        };
        
        if (isEdit && jalurMasuk) {
            put(route('admin.jalur-masuk.update', jalurMasuk.id), formData);
            setTimeout(() => onClose(), 300); // Delay untuk animasi smooth
        } else {
            post(route('admin.jalur-masuk.store'), formData);
            setTimeout(() => onClose(), 300); // Delay untuk animasi smooth
        }
    };

    // Fungsi untuk menambah field persyaratan
    const addPersyaratan = () => {
        setData('persyaratan', [...data.persyaratan, '']);
    };

    // Fungsi untuk menambah field keuntungan
    const addKeuntungan = () => {
        setData('keuntungan', [...data.keuntungan, '']);
    };

    // Fungsi untuk update field persyaratan
    const updatePersyaratan = (index: number, value: string) => {
        const newPersyaratan = [...data.persyaratan];
        newPersyaratan[index] = value;
        setData('persyaratan', newPersyaratan);
    };

    // Fungsi untuk update field keuntungan
    const updateKeuntungan = (index: number, value: string) => {
        const newKeuntungan = [...data.keuntungan];
        newKeuntungan[index] = value;
        setData('keuntungan', newKeuntungan);
    };

    // Tambah fungsi untuk menghapus persyaratan
    const removePersyaratan = (index: number) => {
        const newPersyaratan = [...data.persyaratan];
        newPersyaratan.splice(index, 1);
        setData('persyaratan', newPersyaratan);
    };

    // Tambah fungsi untuk menghapus keuntungan
    const removeKeuntungan = (index: number) => {
        const newKeuntungan = [...data.keuntungan];
        newKeuntungan.splice(index, 1);
        setData('keuntungan', newKeuntungan);
    };

    return (
        <Modal show={true} onClose={onClose} maxWidth="2xl">
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-medium mb-4">
                    {isEdit ? 'Edit Jalur Masuk' : 'Tambah Jalur Masuk'}
                </h2>

                {/* Form fields */}
                <div className="space-y-4">
                    {/* Nama Jalur */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Jalur
                        </label>
                        <input
                            type="text"
                            value={data.nama_jalur}
                            onChange={e => setData('nama_jalur', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.nama_jalur && (
                            <div className="text-red-500 text-sm mt-1">{errors.nama_jalur}</div>
                        )}
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

                    {/* Persyaratan */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Persyaratan
                        </label>
                        {data.persyaratan.map((syarat: string, index: number) => (
                            <div key={index} className="mt-2 flex items-center gap-2">
                                <input
                                    type="text"
                                    value={syarat}
                                    onChange={e => updatePersyaratan(index, e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePersyaratan(index)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addPersyaratan}
                            className="mt-2 text-sm text-indigo-600 hover:text-indigo-900"
                        >
                            + Tambah Persyaratan
                        </button>
                    </div>

                    {/* Keuntungan */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Keuntungan
                        </label>
                        {data.keuntungan.map((untung: string, index: number) => (
                            <div key={index} className="mt-2 flex items-center gap-2">
                                <input
                                    type="text"
                                    value={untung}
                                    onChange={e => updateKeuntungan(index, e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeKeuntungan(index)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addKeuntungan}
                            className="mt-2 text-sm text-indigo-600 hover:text-indigo-900"
                        >
                            + Tambah Keuntungan
                        </button>
                    </div>

                    {/* Biaya */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Biaya
                        </label>
                        <input
                            type="number"
                            value={data.biaya}
                            onChange={e => setData('biaya', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.biaya && (
                            <div className="text-red-500 text-sm mt-1">{errors.biaya}</div>
                        )}
                    </div>

                    {/* Kuota */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Kuota
                        </label>
                        <input
                            type="number"
                            value={data.kuota}
                            onChange={e => setData('kuota', Number(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.kuota && (
                            <div className="text-red-500 text-sm mt-1">{errors.kuota}</div>
                        )}
                    </div>

                    {/* Status */}
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

                    {/* Tombol Submit */}
                    <div className="flex justify-end space-x-3">
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
                </div>
            </form>
        </Modal>
    );
} 
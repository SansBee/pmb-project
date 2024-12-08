import React from 'react';
import { useForm } from '@inertiajs/react';

interface ProgramStudi {
    id: number;
    nama: string;
}

interface Gelombang {
    id: number;
    nama_gelombang: string;
}

interface BiayaForm {
    program_studi_id: number | '';
    gelombang_id: number | '';
    jenis_biaya: string;
    nominal: number | '';
    keterangan?: string;
    is_active: boolean;
}

interface Props {
    isEdit?: boolean;
    biaya?: {
        id: number;
        program_studi_id: number;
        gelombang_id: number | null;
        jenis_biaya: string;
        nominal: number;
        keterangan?: string;
        is_active: boolean;
    };
    program_studi: ProgramStudi[];
    gelombang: Gelombang[];
    jenis_biaya: Record<string, string>;
    onClose: () => void;
}

export default function Form({ 
    isEdit = false, 
    biaya, 
    program_studi,
    gelombang,
    jenis_biaya,
    onClose 
}: Props) {
    const { data, setData, post, put, processing, errors } = useForm<BiayaForm>({
        program_studi_id: biaya?.program_studi_id || '',
        gelombang_id: biaya?.gelombang_id || '',
        jenis_biaya: biaya?.jenis_biaya || '',
        nominal: biaya?.nominal || '',
        keterangan: biaya?.keterangan || '',
        is_active: biaya?.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit && biaya) {
            put(route('admin.biaya.update', biaya.id), {
                onSuccess: () => onClose(),
            });
        } else {
            post(route('admin.biaya.store'), {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {isEdit ? 'Edit Biaya' : 'Tambah Biaya'}
                    </h3>
                    
                    <form onSubmit={handleSubmit}>
                        {/* Program Studi */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 required">
                                Program Studi
                            </label>
                            <select
                                value={data.program_studi_id}
                                onChange={e => setData('program_studi_id', Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Pilih Program Studi</option>
                                {program_studi.map(prodi => (
                                    <option key={prodi.id} value={prodi.id}>
                                        {prodi.nama}
                                    </option>
                                ))}
                            </select>
                            {errors.program_studi_id && (
                                <div className="text-red-500 text-sm mt-1">{errors.program_studi_id}</div>
                            )}
                        </div>

                        {/* Gelombang */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Gelombang (Opsional)
                            </label>
                            <select
                                value={data.gelombang_id}
                                onChange={e => setData('gelombang_id', e.target.value ? Number(e.target.value) : '')}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Semua Gelombang</option>
                                {gelombang.map(gel => (
                                    <option key={gel.id} value={gel.id}>
                                        {gel.nama_gelombang}
                                    </option>
                                ))}
                            </select>
                            {errors.gelombang_id && (
                                <div className="text-red-500 text-sm mt-1">{errors.gelombang_id}</div>
                            )}
                        </div>

                        {/* Jenis Biaya */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 required">
                                Jenis Biaya
                            </label>
                            <select
                                value={data.jenis_biaya}
                                onChange={e => setData('jenis_biaya', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            >
                                <option value="">Pilih Jenis Biaya</option>
                                {Object.entries(jenis_biaya).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.jenis_biaya && (
                                <div className="text-red-500 text-sm mt-1">{errors.jenis_biaya}</div>
                            )}
                        </div>

                        {/* Nominal */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 required">
                                Nominal
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">Rp</span>
                                </div>
                                <input
                                    type="number"
                                    value={data.nominal}
                                    onChange={e => setData('nominal', e.target.value ? Number(e.target.value) : '')}
                                    className="pl-12 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                    min="0"
                                />
                            </div>
                            {errors.nominal && (
                                <div className="text-red-500 text-sm mt-1">{errors.nominal}</div>
                            )}
                        </div>

                        {/* Keterangan */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Keterangan (Opsional)
                            </label>
                            <textarea
                                value={data.keterangan}
                                onChange={e => setData('keterangan', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.keterangan && (
                                <div className="text-red-500 text-sm mt-1">{errors.keterangan}</div>
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
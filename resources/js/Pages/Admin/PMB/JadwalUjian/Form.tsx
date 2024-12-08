import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    isEdit?: boolean;
    jadwal?: {
        id: number;
        gelombang_id: number;
        jenis_ujian: string;
        tanggal_ujian: string;
        lokasi: string;
        ruangan: string;
        kapasitas: number;
        is_active: boolean;
    };
    gelombang: Array<{
        id: number;
        nama_gelombang: string;
    }>;
    onClose: () => void;
}

interface FormData {
    gelombang_id: number;
    jenis_ujian: string;
    tanggal_ujian: string;
    lokasi: string;
    ruangan: string;
    kapasitas: number;
    is_active: boolean;
}

export default function JadwalForm({ isEdit = false, jadwal, gelombang, onClose }: Props) {
    const { data, setData, post, put, processing } = useForm<FormData>({
        gelombang_id: jadwal?.gelombang_id || gelombang[0]?.id || 0,
        jenis_ujian: jadwal?.jenis_ujian || '',
        tanggal_ujian: jadwal?.tanggal_ujian || '',
        lokasi: jadwal?.lokasi || '',
        ruangan: jadwal?.ruangan || '',
        kapasitas: jadwal?.kapasitas || 0,
        is_active: jadwal?.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit && jadwal) {
            put(route('admin.jadwal-ujian.update', jadwal.id), {
                onSuccess: () => onClose()
            });
        } else {
            post(route('admin.jadwal-ujian.store'), {
                onSuccess: () => onClose()
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        {isEdit ? 'Edit Jadwal Ujian' : 'Tambah Jadwal Ujian'}
                    </h3>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Gelombang PMB
                            </label>
                            <select
                                value={data.gelombang_id}
                                onChange={e => setData('gelombang_id', Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {gelombang.map(g => (
                                    <option key={g.id} value={g.id}>
                                        {g.nama_gelombang}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Jenis Ujian
                            </label>
                            <select
                                value={data.jenis_ujian}
                                onChange={e => setData('jenis_ujian', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Pilih Jenis Ujian</option>
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Tanggal & Waktu Ujian
                            </label>
                            <input
                                type="datetime-local"
                                value={data.tanggal_ujian}
                                onChange={e => setData('tanggal_ujian', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Lokasi
                            </label>
                            <input
                                type="text"
                                value={data.lokasi}
                                onChange={e => setData('lokasi', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Gedung/Kampus"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Ruangan
                            </label>
                            <input
                                type="text"
                                value={data.ruangan}
                                onChange={e => setData('ruangan', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Nomor/Nama Ruangan"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Kapasitas
                            </label>
                            <input
                                type="number"
                                value={data.kapasitas}
                                onChange={e => setData('kapasitas', Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                min="0"
                            />
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
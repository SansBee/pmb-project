import React from 'react';
import { useForm } from '@inertiajs/react';

interface Props {
    isEdit?: boolean;
    pembayaran?: {
        id: number;
        pendaftar: {
            name: string;
            email: string;
        };
        jumlah: number;
        metode_pembayaran: string;
        bukti_pembayaran: string;
        status: string;
    };
    onClose: () => void;
}

export default function Form({ isEdit = false, pembayaran, onClose }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        status: pembayaran?.status || 'pending',
        catatan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (pembayaran) {
            put(route('admin.pembayaran.update', pembayaran.id), {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Verifikasi Pembayaran
                    </h3>
                    
                    {/* Info Pembayaran */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-sm text-gray-500">Pendaftar</div>
                                <div className="font-medium">{pembayaran?.pendaftar.name}</div>
                                <div className="text-sm text-gray-500">{pembayaran?.pendaftar.email}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Jumlah Pembayaran</div>
                                <div className="font-medium">Rp {pembayaran?.jumlah.toLocaleString()}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Metode Pembayaran</div>
                                <div className="font-medium">{pembayaran?.metode_pembayaran}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Status Saat Ini</div>
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    pembayaran?.status === 'verified' 
                                    ? 'bg-green-100 text-green-800'
                                    : pembayaran?.status === 'rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {pembayaran?.status}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="text-sm text-gray-500 mb-2">Bukti Pembayaran</div>
                            <a 
                                href={pembayaran?.bukti_pembayaran}
                                target="_blank"
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                Lihat Bukti Pembayaran
                            </a>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Status Verifikasi
                            </label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="verified">Terverifikasi</option>
                                <option value="rejected">Ditolak</option>
                            </select>
                            {errors.status && (
                                <div className="text-red-500 text-sm mt-1">{errors.status}</div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Catatan (opsional)
                            </label>
                            <textarea
                                value={data.catatan}
                                onChange={e => setData('catatan', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Tambahkan catatan jika diperlukan..."
                            />
                            {errors.catatan && (
                                <div className="text-red-500 text-sm mt-1">{errors.catatan}</div>
                            )}
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
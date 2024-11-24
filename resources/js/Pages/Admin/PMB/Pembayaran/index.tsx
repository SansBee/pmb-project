import React from 'react';
import { Head } from '@inertiajs/react';

interface Pembayaran {
    id: number;
    pendaftaran_id: number;
    nama_pendaftar: string;
    jumlah: number;
    metode_pembayaran: string;
    bukti_pembayaran: string;
    status: 'pending' | 'verified' | 'rejected';
    created_at: string;
}

export default function PembayaranIndex() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [statusFilter, setStatusFilter] = React.useState('semua');

    return (
        <div className="py-12">
            <Head title="Kelola Pembayaran - Admin" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Kelola Pembayaran
                            </h2>
                            <div className="flex gap-3">
                                <button 
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    onClick={() => console.log('Export')}
                                >
                                    Export Laporan
                                </button>
                                <select 
                                    className="px-4 py-2 border rounded-lg"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="semua">Semua Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="verified">Terverifikasi</option>
                                    <option value="rejected">Ditolak</option>
                                </select>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Cari pembayaran..."
                                className="w-full px-4 py-2 border rounded-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Tabel */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID/Nama Pendaftar
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Metode
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">#123</div>
                                            <div className="text-sm text-gray-500">John Doe</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            Rp 500.000
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            Transfer Bank
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            2024-01-23
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                onClick={() => console.log('Verifikasi')}
                                            >
                                                Verifikasi
                                            </button>
                                            <button 
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                                onClick={() => console.log('Lihat Bukti')}
                                            >
                                                Bukti
                                            </button>
                                            <button 
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() => console.log('Tolak')}
                                            >
                                                Tolak
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
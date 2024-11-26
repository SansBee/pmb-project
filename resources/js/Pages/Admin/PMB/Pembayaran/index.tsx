import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import Form from './Form';

interface Pembayaran {
    id: number;
    pendaftar: {
        id: number;
        name: string;
        email: string;
    };
    jumlah: number;
    metode_pembayaran: string;
    bukti_pembayaran: string;
    status: string;
    created_at: string;
}

interface Props {
    pembayaran: {
        data: Pembayaran[];
        links: any;
        from: number;
        to: number;
        total: number;
    };
}

export default function PembayaranIndex({ pembayaran }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState<Pembayaran | null>(null);

    return (
        <AdminLayout>
            <Head title="Pembayaran - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Daftar Pembayaran</h2>
                                <div className="flex gap-2">
                                    <input 
                                        type="text"
                                        placeholder="Cari pembayaran..."
                                        className="px-4 py-2 border rounded-lg"
                                    />
                                    <select className="px-4 py-2 border rounded-lg">
                                        <option value="">Semua Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="verified">Terverifikasi</option>
                                        <option value="rejected">Ditolak</option>
                                    </select>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Pendaftar
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jumlah
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Metode
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pembayaran.data.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.pendaftar.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.pendaftar.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        Rp {item.jumlah.toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {item.metode_pembayaran}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        item.status === 'verified' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : item.status === 'rejected'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button 
                                                        onClick={() => setEditData(item)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        Verifikasi
                                                    </button>
                                                    <a 
                                                        href={item.bukti_pembayaran}
                                                        target="_blank"
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Bukti
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Showing {pembayaran.from} to {pembayaran.to} of {pembayaran.total} results
                                    </div>
                                    <div className="flex gap-1">
                                        {/* Render pagination links */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Modal */}
            {(showForm || editData) && (
                <Form 
                    isEdit={!!editData}
                    pembayaran={editData || undefined}
                    onClose={() => {
                        setShowForm(false);
                        setEditData(null);
                    }}
                />
            )}
        </AdminLayout>
    );
} 
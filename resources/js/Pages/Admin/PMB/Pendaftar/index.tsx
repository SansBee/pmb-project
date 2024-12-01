import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

interface Pendaftar {
    id: number;
    name: string;
    email: string;
    program_studi: {
        id: number;
        nama: string;
    } | null;
    status_pendaftaran: string;
    status_pembayaran: string;
    created_at: string;
}

interface Props {
    pendaftar: {
        data: Pendaftar[];
        links: any;
        from: number;
        to: number;
        total: number;
    };
    filters: {
        search: string;
        status: string;
    };
    status_list: Record<string, string>;
}

export default function PendaftarIndex({ pendaftar, filters, status_list }: Props) {
    return (
        <AdminLayout>
            <Head title="Pendaftar - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Daftar Pendaftar</h2>
                                <div className="flex gap-2">
                                    <input 
                                        type="text"
                                        placeholder="Cari pendaftar..."
                                        className="px-4 py-2 border rounded-lg"
                                    />
                                    <select className="px-4 py-2 border rounded-lg">
                                        <option value="">Semua Status</option>
                                        <option value="baru">Baru</option>
                                        <option value="verifikasi">Verifikasi</option>
                                        <option value="diterima">Diterima</option>
                                        <option value="ditolak">Ditolak</option>
                                    </select>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama/Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Program Studi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status Pendaftaran
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status Pembayaran
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal Daftar
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pendaftar.data.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.email}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {item.program_studi?.nama || 'Belum memilih prodi'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        item.status_pendaftaran === 'diterima' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : item.status_pendaftaran === 'ditolak'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {status_list[item.status_pendaftaran] || item.status_pendaftaran}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        item.status_pembayaran === 'lunas' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {item.status_pembayaran}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route('admin.pendaftar.show', item.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        Detail
                                                    </Link>
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
                                        Showing {pendaftar.from} to {pendaftar.to} of {pendaftar.total} results
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
        </AdminLayout>
    );
}
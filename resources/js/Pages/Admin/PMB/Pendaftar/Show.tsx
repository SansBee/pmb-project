import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

interface Pendaftar {
    id: number;
    name: string;
    email: string;
    program_studi: {
        nama: string;
    };
    status_pendaftaran: string;
    status_pembayaran: string;
    created_at: string;
    dokumen: Array<{
        id: number;
        nama_dokumen: string;
        file_path: string;
        status: string;
    }>;
    pembayaran: {
        id: number;
        jumlah: number;
        metode_pembayaran: string;
        bukti_pembayaran: string;
        status: string;
        created_at: string;
    };
}

interface Props {
    pendaftar: Pendaftar;
}

export default function PendaftarShow({ pendaftar }: Props) {
    return (
        <AdminLayout>
            <Head title={`Detail Pendaftar - ${pendaftar.name}`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={route('admin.pendaftar')}
                            className="text-indigo-600 hover:text-indigo-900 mb-4 inline-block"
                        >
                            ← Kembali ke Daftar Pendaftar
                        </Link>
                        <h2 className="text-2xl font-semibold">Detail Pendaftar</h2>
                    </div>

                    {/* Data Pribadi */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Data Pribadi</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-gray-500">Nama Lengkap</div>
                                    <div className="font-medium">{pendaftar.name}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Email</div>
                                    <div className="font-medium">{pendaftar.email}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Program Studi</div>
                                    <div className="font-medium">{pendaftar.program_studi.nama}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Tanggal Daftar</div>
                                    <div className="font-medium">
                                        {new Date(pendaftar.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Status Pendaftaran</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-gray-500">Status Pendaftaran</div>
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        pendaftar.status_pendaftaran === 'diterima' 
                                        ? 'bg-green-100 text-green-800'
                                        : pendaftar.status_pendaftaran === 'ditolak'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {pendaftar.status_pendaftaran}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Status Pembayaran</div>
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        pendaftar.status_pembayaran === 'lunas' 
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {pendaftar.status_pembayaran}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dokumen */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Dokumen</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Dokumen
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pendaftar.dokumen.map((dok) => (
                                            <tr key={dok.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {dok.nama_dokumen}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        dok.status === 'verified' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {dok.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <a 
                                                        href={dok.file_path} 
                                                        target="_blank"
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        Lihat
                                                    </a>
                                                    <button className="text-green-600 hover:text-green-900">
                                                        Verifikasi
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Pembayaran */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Pembayaran</h3>
                            {pendaftar.pembayaran ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-500">Jumlah</div>
                                        <div className="font-medium">
                                            Rp {pendaftar.pembayaran.jumlah.toLocaleString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Metode Pembayaran</div>
                                        <div className="font-medium">
                                            {pendaftar.pembayaran.metode_pembayaran}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Tanggal Pembayaran</div>
                                        <div className="font-medium">
                                            {new Date(pendaftar.pembayaran.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Status</div>
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            pendaftar.pembayaran.status === 'verified' 
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {pendaftar.pembayaran.status}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-sm text-gray-500 mb-2">Bukti Pembayaran</div>
                                        <a 
                                            href={pendaftar.pembayaran.bukti_pembayaran}
                                            target="_blank"
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Lihat Bukti Pembayaran
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500">Belum ada data pembayaran</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 
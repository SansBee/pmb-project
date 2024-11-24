import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Props {
    stats: {
        total_user: number;
        user_baru: number;
        user_minggu_ini: number;
        user_bulan_ini: number;
    };
    users_terbaru: Array<{
        id: number;
        name: string;
        email: string;
        created_at: string;
    }>;
    stats_prodi: Array<{
        nama: string;
        total: number;
        kuota: number;
        persentase: number;
    }>;
    status_pendaftaran: {
        aktif: boolean;
        gelombang: string;
        tanggal_mulai: string;
        tanggal_selesai: string;
        total_kuota: number;
        sisa_kuota: number;
    };
}

export default function Dashboard({ stats, users_terbaru, stats_prodi, status_pendaftaran }: Props) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Status PMB */}
                <div className="bg-white overflow-hidden shadow-sm rounded-lg mb-8">
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Status PMB</h3>
                                <p className="text-sm text-gray-500">{status_pendaftaran.gelombang}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full ${status_pendaftaran.aktif ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {status_pendaftaran.aktif ? 'Aktif' : 'Tidak Aktif'}
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500">Periode</div>
                                <div className="text-sm font-medium">
                                    {new Date(status_pendaftaran.tanggal_mulai).toLocaleDateString()} - {new Date(status_pendaftaran.tanggal_selesai).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500">Total Kuota</div>
                                <div className="text-sm font-medium">{status_pendaftaran.total_kuota}</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500">Sisa Kuota</div>
                                <div className="text-sm font-medium">{status_pendaftaran.sisa_kuota}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistik Program Studi */}
                <div className="bg-white overflow-hidden shadow-sm rounded-lg mb-8">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Statistik Program Studi</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stats_prodi.map((prodi) => (
                                <div key={prodi.nama} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-sm font-medium">{prodi.nama}</div>
                                        <div className="text-sm text-gray-500">{prodi.total}/{prodi.kuota}</div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-indigo-600 h-2 rounded-full" 
                                            style={{ width: `${prodi.persentase}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Statistik Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                        <div className="text-gray-500 text-sm">Total User</div>
                        <div className="text-2xl font-bold">{stats.total_user}</div>
                    </div>
                    
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                        <div className="text-gray-500 text-sm">User Baru Hari Ini</div>
                        <div className="text-2xl font-bold">{stats.user_baru}</div>
                    </div>
                    
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                        <div className="text-gray-500 text-sm">User Minggu Ini</div>
                        <div className="text-2xl font-bold">{stats.user_minggu_ini}</div>
                    </div>
                    
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                        <div className="text-gray-500 text-sm">User Bulan Ini</div>
                        <div className="text-2xl font-bold">{stats.user_bulan_ini}</div>
                    </div>
                </div>

                {/* Tabel User Terbaru */}
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">User Terbaru</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal Daftar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users_terbaru.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
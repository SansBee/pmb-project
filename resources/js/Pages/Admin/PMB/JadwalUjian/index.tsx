import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import JadwalForm from './Form';

interface JadwalUjian {
    id: number;
    gelombang_id: number;
    gelombang: {
        nama_gelombang: string;
    };
    jenis_ujian: string;
    tanggal_ujian: string;
    lokasi: string;
    ruangan: string;
    kapasitas: number;
    is_active: boolean;
    pendaftar?: Array<{
        id: number;
        nama: string;
    }>;
}

interface Props {
    jadwal: JadwalUjian[];
    gelombang: Array<{
        id: number;
        nama_gelombang: string;
    }>;
}

export default function JadwalUjianIndex({ jadwal, gelombang }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState<JadwalUjian | null>(null);
    const [showDaftarPeserta, setShowDaftarPeserta] = useState(false);

    return (
        <AdminLayout>
            <Head title="Jadwal Ujian - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Jadwal Ujian PMB</h2>
                                <button 
                                    onClick={() => setShowForm(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Tambah Jadwal
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Gelombang
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jenis Ujian
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Tanggal & Waktu
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Lokasi/Ruangan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jumlah Peserta
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
                                        {jadwal.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.gelombang.nama_gelombang}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {item.jenis_ujian}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(item.tanggal_ujian).toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {item.lokasi}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Ruang {item.ruangan}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {item.pendaftar?.length || 0} / {item.kapasitas}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        item.is_active 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {item.is_active ? 'Aktif' : 'Nonaktif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button 
                                                        onClick={() => setEditData(item)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => router.visit(route('admin.jadwal-ujian.peserta', item.id))}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        Lihat Peserta
                                                    </button>
                                                    <button 
                                                        onClick={() => setShowDaftarPeserta(true)}
                                                        className="text-green-600 hover:text-green-900 mr-3"
                                                    >
                                                        Daftarkan Peserta
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-900">
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Modal */}
            {(showForm || editData) && (
                <JadwalForm 
                    isEdit={!!editData}
                    jadwal={editData || undefined}
                    gelombang={gelombang}
                    onClose={() => {
                        setShowForm(false);
                        setEditData(null);
                    }}
                />
            )}
        </AdminLayout>
    );
} 
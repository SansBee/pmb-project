import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import PengumumanForm from './Form';

interface Pengumuman {
    id: number;
    judul: string;
    isi: string;
    tanggal_publikasi: string;
    tanggal_berakhir: string | null;
    is_active: boolean;
}

interface Props {
    pengumuman: Pengumuman[];
}

export default function PengumumanIndex({ pengumuman }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState<Pengumuman | null>(null);

    return (
        <AdminLayout>
            <Head title="Pengumuman - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Pengumuman PMB</h2>
                                <button 
                                    onClick={() => setShowForm(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Tambah Pengumuman
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Judul
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Periode
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
                                        {pengumuman.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.judul}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.isi.substring(0, 100)}...
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(item.tanggal_publikasi).toLocaleDateString()}
                                                    </div>
                                                    {item.tanggal_berakhir && (
                                                        <div className="text-sm text-gray-500">
                                                            s/d {new Date(item.tanggal_berakhir).toLocaleDateString()}
                                                        </div>
                                                    )}
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
                <PengumumanForm 
                    isEdit={!!editData}
                    pengumuman={editData || undefined}
                    onClose={() => {
                        setShowForm(false);
                        setEditData(null);
                    }}
                />
            )}
        </AdminLayout>
    );
} 
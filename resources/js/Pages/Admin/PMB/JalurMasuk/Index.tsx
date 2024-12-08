import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import JalurMasukForm from './Form';
import Alert from '@/Components/Alert';

interface JalurMasuk {
    id: number;
    nama_jalur: string;
    deskripsi: string;
    persyaratan: string[];
    keuntungan: string[];
    biaya: number;
    kuota: number;
    is_active: boolean;
    urutan: number;
}

interface Props {
    jalur_masuk: Array<{
        id: number;
        nama_jalur: string;
        deskripsi: string;
        persyaratan: string[];
        keuntungan: string[];
        biaya: number;
        kuota: number;
        is_active: boolean;
        urutan: number;
    }>;
    flash: {
        message?: string;
        type?: 'success' | 'error';
    };
}

export default function JalurMasukIndex({ jalur_masuk, flash }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState<JalurMasuk | null>(null);

    const handleDelete = (id: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus jalur masuk ini? Data yang sudah dihapus tidak dapat dikembalikan.')) {
            router.delete(route('admin.jalur-masuk.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Jalur Masuk - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Notifikasi */}
                    {flash.message && (
                        <div className="mb-4">
                            <Alert
                                message={flash.message}
                                type={flash.type}
                            />
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Jalur Masuk PMB</h2>
                                <button 
                                    onClick={() => setShowForm(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Tambah Jalur
                                </button>
                            </div>

                            {/* Tabel Jalur Masuk */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Jalur
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kuota
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Biaya
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
                                        {jalur_masuk.map((jalur) => (
                                            <tr key={jalur.id}>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {jalur.nama_jalur}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {jalur.deskripsi}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {jalur.kuota} orang
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        Rp {jalur.biaya.toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        jalur.is_active 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {jalur.is_active ? 'Aktif' : 'Nonaktif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button 
                                                        onClick={() => setEditData(jalur)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(jalur.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
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
                <JalurMasukForm 
                    isEdit={!!editData}
                    jalurMasuk={editData || undefined}
                    onClose={() => {
                        setShowForm(false);
                        setEditData(null);
                    }}
                />
            )}
        </AdminLayout>
    );
} 
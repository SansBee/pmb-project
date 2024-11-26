import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import Form from './Form';
import DeleteConfirmation from '@/Components/DeleteConfirmation';
import Alert from '@/Components/Alert';

interface GelombangPMB {
    id: number;
    nama_gelombang: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    kuota: number;
    biaya: number;
    is_active: boolean;
}

interface Props {
    gelombang: GelombangPMB[];
}

export default function GelombangIndex({ gelombang }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState<GelombangPMB | null>(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const { flash } = usePage().props as any;

    const handleDelete = (id: number) => {
        setItemToDelete(id);
        setDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            router.delete(route('admin.gelombang.destroy', itemToDelete), {
                onSuccess: () => {
                    setDeleteConfirmation(false);
                    setItemToDelete(null);
                }
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Gelombang PMB - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Alert Notifications */}
                    {flash?.message && (
                        <div className="mb-4">
                            <Alert
                                type="success"
                                message={flash.message}
                            />
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-4">
                            <Alert
                                type="error"
                                message={flash.error}
                            />
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Gelombang PMB</h2>
                                <button 
                                    onClick={() => setShowForm(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Tambah Gelombang
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
                                                Periode
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
                                        {gelombang.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.nama_gelombang}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(item.tanggal_mulai).toLocaleDateString()} - 
                                                        {new Date(item.tanggal_selesai).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {item.kuota}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        Rp {item.biaya.toLocaleString()}
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
                                                        onClick={() => handleDelete(item.id)}
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

            {(showForm || editData) && (
                <Form 
                    isEdit={!!editData}
                    gelombang={editData || undefined}
                    onClose={() => {
                        setShowForm(false);
                        setEditData(null);
                    }}
                />
            )}

            {/* Delete Confirmation */}
            <DeleteConfirmation
                isOpen={deleteConfirmation}
                onClose={() => {
                    setDeleteConfirmation(false);
                    setItemToDelete(null);
                }}
                onConfirm={confirmDelete}
                title="Hapus Gelombang"
                message="Apakah Anda yakin ingin menghapus gelombang ini?"
            />
        </AdminLayout>
    );
} 
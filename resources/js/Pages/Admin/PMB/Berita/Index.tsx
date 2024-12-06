import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import Form from './Form';
import DeleteConfirmation from '@/Components/DeleteConfirmation';
import Alert from '@/Components/Alert';

interface Berita {
    id: number;
    judul: string;
    kategori: string;
    excerpt: string;
    konten: string;
    tanggal_publikasi: string;
    is_active: boolean;
}

interface Props {
    berita: Berita[];
    kategori: Record<string, string>;
    flash?: { message?: string };
}

export default function BeritaIndex({ berita, kategori, flash }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState<Berita | null>(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    const confirmDelete = () => {
        if (itemToDelete) {
            router.delete(route('admin.berita.destroy', itemToDelete), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    // Tutup modal konfirmasi hapus
                    setDeleteConfirmation(false);
                    // Reset item yang akan dihapus
                    setItemToDelete(null);
                },
                onError: (errors) => {
                    console.error(errors);
                    // Jika error, tetap tutup modal
                    setDeleteConfirmation(false);
                    setItemToDelete(null);
                }
            });
        }
    };

    return (
        <AdminLayout>
            <Head title="Berita & Event - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.message && (
                        <Alert type="success" message={flash.message} />
                    )}

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Berita & Event</h2>
                        <button 
                            onClick={() => setShowForm(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Tambah Berita
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Judul
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal Publikasi
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
                                    {berita.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {item.judul}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {kategori[item.kategori]}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {item.tanggal_publikasi}
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
                                                    onClick={() => {
                                                        setItemToDelete(item.id);
                                                        setDeleteConfirmation(true);
                                                    }}
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

            {/* Form Modal */}
            {(showForm || editData) && (
                <Form 
                    isEdit={!!editData}
                    berita={editData || undefined}
                    kategori={kategori}
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
                title="Hapus Berita"
                message="Apakah Anda yakin ingin menghapus berita ini?"
            />
        </AdminLayout>
    );
} 
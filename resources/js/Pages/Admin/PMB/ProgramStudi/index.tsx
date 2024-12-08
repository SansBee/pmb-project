import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import Form from './Form';
import DeleteConfirmation from '@/Components/DeleteConfirmation';
import Alert from '@/Components/Alert';

interface ProgramStudi {
    id: number;
    nama: string;
    deskripsi: string;
    kuota: number;
    is_active: boolean;
}

interface Props {
    program_studi: ProgramStudi[];
    flash?: {
        message?: string;
        error?: string;
    };
}

export default function ProgramStudiIndex({ program_studi }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState<ProgramStudi | null>(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const { flash } = usePage().props as any;

    const handleDelete = (id: number) => {
        setItemToDelete(id);
        setDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            router.delete(route('admin.program-studi.destroy', itemToDelete));
            setDeleteConfirmation(false);
            setItemToDelete(null);
        }
    };

    return (
        <AdminLayout>
            <Head title="Program Studi - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Alert Notifications */}
                    {flash?.message && (
                        <div className="mb-4">
                            <Alert
                                type="success"
                                message={flash.message}
                                duration={5000}
                            />
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-4">
                            <Alert
                                type="error"
                                message={flash.error}
                                duration={5000}
                            />
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Program Studi</h2>
                                <button 
                                    onClick={() => setShowForm(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Tambah Program Studi
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Program Studi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Deskripsi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kuota
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
                                        {program_studi.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.nama}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">
                                                        {item.deskripsi}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {item.kuota}
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

            {/* Form Modal */}
            {(showForm || editData) && (
                <Form 
                    isEdit={!!editData}
                    programStudi={editData || undefined}
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
                title="Hapus Program Studi"
                message="Apakah Anda yakin ingin menghapus program studi ini?"
            />
        </AdminLayout>
    );
} 
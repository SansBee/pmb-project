import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import Form from './Form';
import DeleteConfirmation from '@/Components/DeleteConfirmation';
import Alert from '@/Components/Alert';

interface ProgramStudi {
    id: number;
    nama: string;
}

interface Gelombang {
    id: number;
    nama_gelombang: string;
}

interface Biaya {
    id: number;
    program_studi_id: number;
    gelombang_id: number | null;
    jenis_biaya: string;
    nominal: number;
    nominal_rupiah: string;
    keterangan?: string;
    is_active: boolean;
    program_studi: ProgramStudi;
    gelombang?: Gelombang;
}

interface Props {
    biaya: Biaya[];
    program_studi: ProgramStudi[];
    gelombang: Gelombang[];
    jenis_biaya: Record<string, string>;
}

export default function BiayaIndex({ biaya, program_studi, gelombang, jenis_biaya }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState<Biaya | null>(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const { flash } = usePage().props as any;

    // Group biaya by program studi
    const biayaByProdi = biaya.reduce((acc, item) => {
        if (!acc[item.program_studi_id]) {
            acc[item.program_studi_id] = [];
        }
        acc[item.program_studi_id].push(item);
        return acc;
    }, {} as Record<number, Biaya[]>);

    return (
        <AdminLayout>
            <Head title="Biaya Pendaftaran - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Alerts */}
                    {flash?.message && (
                        <div className="mb-4">
                            <Alert type="success" message={flash.message} />
                        </div>
                    )}

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Biaya Pendaftaran</h2>
                        <button 
                            onClick={() => setShowForm(true)}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Tambah Biaya
                        </button>
                    </div>

                    {/* Biaya List */}
                    <div className="space-y-8">
                        {program_studi.map(prodi => {
                            const biayaProdi = biayaByProdi[prodi.id] || [];
                            
                            return (
                                <div key={prodi.id} className="bg-white rounded-lg shadow">
                                    <div className="p-4 border-b">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-medium">
                                                {prodi.nama}
                                            </h3>
                                            <span className="text-sm text-gray-500">
                                                {biayaProdi.length} jenis biaya
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Jenis Biaya
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Gelombang
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Nominal
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
                                                {biayaProdi.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="px-6 py-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {jenis_biaya[item.jenis_biaya]}
                                                            </div>
                                                            {item.keterangan && (
                                                                <div className="text-sm text-gray-500">
                                                                    {item.keterangan}
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                {item.gelombang?.nama_gelombang || 'Semua Gelombang'}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {item.nominal_rupiah}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 py-1 text-xs rounded-full ${
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
                                                                onClick={() => setItemToDelete(item.id)}
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
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Form Modal */}
            {(showForm || editData) && (
                <Form 
                    isEdit={!!editData}
                    biaya={editData || undefined}
                    program_studi={program_studi}
                    gelombang={gelombang}
                    jenis_biaya={jenis_biaya}
                    onClose={() => {
                        setShowForm(false);
                        setEditData(null);
                    }}
                />
            )}

            {/* Delete Confirmation */}
            <DeleteConfirmation
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={() => {
                    if (itemToDelete) {
                        router.delete(route('admin.biaya.destroy', itemToDelete), {
                            onSuccess: () => setItemToDelete(null)
                        });
                    }
                }}
                title="Hapus Biaya"
                message="Apakah Anda yakin ingin menghapus biaya ini?"
            />
        </AdminLayout>
    );
} 
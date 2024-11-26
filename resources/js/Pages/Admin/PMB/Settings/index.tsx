import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

interface GelombangPMB {
    id: number;
    nama_gelombang: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    kuota: number;
    biaya: number;
    aktif: boolean;
}

export default function SettingsIndex() {
    return (
        <div className="py-12">
            <Head title="Pengaturan PMB - Admin" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Pengaturan Umum */}
                <div className="bg-white overflow-hidden shadow-sm rounded-lg mb-6">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Pengaturan Umum PMB
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tanggal Mulai PMB
                                </label>
                                <input 
                                    type="date" 
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tanggal Selesai PMB
                                </label>
                                <input 
                                    type="date" 
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status PMB
                                </label>
                                <select className="w-full px-4 py-2 border rounded-lg">
                                    <option value="buka">Buka</option>
                                    <option value="tutup">Tutup</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Biaya Pendaftaran Default
                                </label>
                                <input 
                                    type="number" 
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="Rp 500.000"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pengaturan Gelombang */}
                <div className="bg-white overflow-hidden shadow-sm rounded-lg mb-6">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Gelombang PMB
                            </h2>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                Tambah Gelombang
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Nama Gelombang
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Periode
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Kuota
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Biaya
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            Gelombang 1
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            1 Jan - 31 Mar 2024
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            100
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            Rp 500.000
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Aktif
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                Edit
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pengaturan Notifikasi */}
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Pengaturan Notifikasi
                        </h2>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Template Email Pendaftaran
                                </label>
                                <textarea 
                                    className="w-full px-4 py-2 border rounded-lg"
                                    rows={4}
                                    placeholder="Template email untuk pendaftar baru..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Template Pengumuman
                                </label>
                                <textarea 
                                    className="w-full px-4 py-2 border rounded-lg"
                                    rows={4}
                                    placeholder="Template pengumuman kelulusan..."
                                />
                            </div>

                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                Simpan Pengaturan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React from 'react';
import { Head } from '@inertiajs/react';

export default function LaporanIndex() {
    return (
        <div className="py-12">
            <Head title="Laporan PMB - Admin" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Filter Laporan */}
                <div className="bg-white overflow-hidden shadow-sm rounded-lg mb-6">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Generate Laporan
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jenis Laporan
                                </label>
                                <select className="w-full px-4 py-2 border rounded-lg">
                                    <option value="pendaftaran">Laporan Pendaftaran</option>
                                    <option value="keuangan">Laporan Keuangan</option>
                                    <option value="statistik">Statistik PMB</option>
                                    <option value="prodi">Laporan Per Program Studi</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Periode
                                </label>
                                <div className="flex gap-2">
                                    <input 
                                        type="date" 
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                    <input 
                                        type="date" 
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Format Export
                                </label>
                                <select className="w-full px-4 py-2 border rounded-lg">
                                    <option value="excel">Excel</option>
                                    <option value="pdf">PDF</option>
                                    <option value="csv">CSV</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                Generate Laporan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Laporan */}
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Preview Laporan
                        </h2>

                        {/* Statistik Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500">Total Pendaftar</div>
                                <div className="text-2xl font-bold">1,234</div>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500">Total Diterima</div>
                                <div className="text-2xl font-bold">890</div>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500">Total Pembayaran</div>
                                <div className="text-2xl font-bold">Rp 450.000.000</div>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-sm text-gray-500">Tingkat Kelulusan</div>
                                <div className="text-2xl font-bold">72%</div>
                            </div>
                        </div>

                        {/* Tabel Preview */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Program Studi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Pendaftar
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Diterima
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Ditolak
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Total Pembayaran
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            Teknik Informatika
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            500
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            350
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            150
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            Rp 175.000.000
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
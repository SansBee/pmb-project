import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import Filter from './Filter';

interface Statistik {
    total_pendaftar: number;
    total_diterima: number;
    total_pembayaran: number;
    per_prodi: Array<{
        nama: string;
        total: number;
        persentase: number;
    }>;
    per_gelombang: Array<{
        nama_gelombang: string;
        total: number;
        persentase: number;
    }>;
}

interface Props {
    statistik: Statistik;
    filter?: {
        tanggal_mulai?: string;
        tanggal_selesai?: string;
        program_studi_id?: number;
        gelombang_id?: number;
        status?: string;
    };
}

export default function LaporanIndex({ statistik, filter }: Props) {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <AdminLayout>
            <Head title="Laporan PMB - Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header dengan Filter dan Export */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Laporan PMB</h2>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setShowFilter(true)}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Filter
                            </button>
                            <button 
                                onClick={() => window.location.href = route('admin.laporan.export', filter)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Export Excel
                            </button>
                        </div>
                    </div>

                    {/* Statistik Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-sm text-gray-500">Total Pendaftar</div>
                            <div className="text-3xl font-bold">{statistik.total_pendaftar}</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-sm text-gray-500">Total Diterima</div>
                            <div className="text-3xl font-bold">{statistik.total_diterima}</div>
                            <div className="text-sm text-gray-500">
                                ({((statistik.total_diterima / statistik.total_pendaftar) * 100).toFixed(1)}%)
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="text-sm text-gray-500">Total Pembayaran</div>
                            <div className="text-3xl font-bold">
                                Rp {statistik.total_pembayaran.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Grafik per Program Studi */}
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                        <h3 className="text-lg font-medium mb-4">Pendaftar per Program Studi</h3>
                        <div className="space-y-4">
                            {statistik.per_prodi.map((prodi, index) => (
                                <div key={index}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{prodi.nama}</span>
                                        <span className="text-gray-500">
                                            {prodi.total} ({prodi.persentase}%)
                                        </span>
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

                    {/* Grafik per Gelombang */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-medium mb-4">Pendaftar per Gelombang</h3>
                        <div className="space-y-4">
                            {statistik.per_gelombang.map((gelombang, index) => (
                                <div key={index}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{gelombang.nama_gelombang}</span>
                                        <span className="text-gray-500">
                                            {gelombang.total} ({gelombang.persentase}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-indigo-600 h-2 rounded-full" 
                                            style={{ width: `${gelombang.persentase}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Modal */}
            {showFilter && (
                <Filter 
                    initialFilter={filter}
                    onClose={() => setShowFilter(false)}
                />
            )}
        </AdminLayout>
    );
}
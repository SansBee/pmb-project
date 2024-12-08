import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import TrendChart from '@/Components/Charts/TrendChart';

interface Props {
    stats: {
        total_user: number;
        user_baru: number;
        total_pendaftar: number;
        pendaftar_baru: number;
        pendaftar_jalur_prestasi: number;
        pendaftar_jalur_reguler: number;
        total_terverifikasi: number;
        total_diterima: number;
        total_ditolak: number;
        total_sudah_bayar: number;
        total_belum_bayar: number;
    };
    tren_pendaftaran: {
        labels: string[];
        data: number[];
    };
}

export default function Dashboard({ stats, tren_pendaftaran }: Props) {
    return (
        <AdminLayout>
            <Head title="Dashboard - Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Statistik Utama */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <StatCard title="Total Pendaftar" value={stats.total_pendaftar} />
                        <StatCard title="Pendaftar Baru" value={stats.pendaftar_baru} />
                        <StatCard title="Total Diterima" value={stats.total_diterima} />
                        <StatCard title="Total Pembayaran" value={stats.total_sudah_bayar} />
                    </div>

                    {/* Grafik Tren */}
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                        <h3 className="text-lg font-medium mb-4">Tren Pendaftaran (7 Hari Terakhir)</h3>
                        <TrendChart 
                            labels={tren_pendaftaran.labels}
                            data={tren_pendaftaran.data}
                        />
                    </div>

                    {/* Status Pendaftaran */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-medium mb-4">Status Pendaftaran</h3>
                            <div className="space-y-4">
                                <StatusBar 
                                    label="Terverifikasi" 
                                    value={stats.total_terverifikasi} 
                                    total={stats.total_pendaftar}
                                />
                                <StatusBar 
                                    label="Diterima" 
                                    value={stats.total_diterima} 
                                    total={stats.total_pendaftar}
                                />
                                <StatusBar 
                                    label="Ditolak" 
                                    value={stats.total_ditolak} 
                                    total={stats.total_pendaftar}
                                />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-medium mb-4">Status Pembayaran</h3>
                            <div className="space-y-4">
                                <StatusBar 
                                    label="Sudah Bayar" 
                                    value={stats.total_sudah_bayar} 
                                    total={stats.total_pendaftar}
                                />
                                <StatusBar 
                                    label="Belum Bayar" 
                                    value={stats.total_belum_bayar} 
                                    total={stats.total_pendaftar}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Komponen StatCard
function StatCard({ title, value }: { title: string; value: number }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
        </div>
    );
}

// Komponen StatusBar
function StatusBar({ label, value, total }: { label: string; value: number; total: number }) {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span>{value} ({percentage}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
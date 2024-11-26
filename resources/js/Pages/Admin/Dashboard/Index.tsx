import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

interface Stats {
    total_user: number;
    user_baru: number;
    total_pendaftar: number;
    pendaftar_baru: number;
}

interface StatsProdi {
    nama: string;
    total: number;
    persentase: number;
}

interface Props {
    stats: Stats;
    stats_prodi: StatsProdi[];
}

export default function Dashboard({ stats, stats_prodi }: Props) {
    return (
        <AdminLayout>
            <Head title="Dashboard Admin" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Statistik Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Total User</div>
                            <div className="text-2xl font-bold">{stats.total_user}</div>
                        </div>
                        
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                            <div className="text-gray-500 text-sm">User Baru</div>
                            <div className="text-2xl font-bold">{stats.user_baru}</div>
                        </div>
                        
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Total Pendaftar</div>
                            <div className="text-2xl font-bold">{stats.total_pendaftar}</div>
                        </div>
                        
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6">
                            <div className="text-gray-500 text-sm">Pendaftar Baru</div>
                            <div className="text-2xl font-bold">{stats.pendaftar_baru}</div>
                        </div>
                    </div>

                    {/* Statistik per Program Studi */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Statistik per Program Studi</h3>
                            <div className="space-y-4">
                                {stats_prodi.map((prodi, index) => (
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
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
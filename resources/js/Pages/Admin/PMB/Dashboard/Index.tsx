import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import StatCard from '@/Components/Admin/StatCard';
import StatusList from '@/Components/Admin/StatusList';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

interface Props {
    stats: {
        total_pendaftar: number;
        pendaftar_baru: number;
        total_diterima: number;
        total_pembayaran: number;
    };
    tren_pendaftaran: {
        labels: string[];
        data: number[];
    };
    status_pendaftaran: {
        terverifikasi: number;
        diterima: number;
        ditolak: number;
    };
    status_pembayaran: {
        belum_bayar: number;
        lunas: number;
    };
}

// Daftarkan komponen yang diperlukan
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({ stats, tren_pendaftaran, status_pendaftaran, status_pembayaran }: Props) {
    const chartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <AdminLayout>
            <Head title="Dashboard - Admin" />

            {/* Card Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <StatCard title="Total Pendaftar" value={stats.total_pendaftar} />
                <StatCard title="Pendaftar Baru" value={stats.pendaftar_baru} />
                <StatCard title="Total Diterima" value={stats.total_diterima} />
                <StatCard title="Total Pembayaran" value={stats.total_pembayaran} />
            </div>

            {/* Grafik Tren */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-lg font-medium mb-4">Tren Pendaftaran (7 Hari Terakhir)</h2>
                <Line 
                    data={{
                        labels: tren_pendaftaran.labels,
                        datasets: [{
                            label: 'Jumlah Pendaftar',
                            data: tren_pendaftaran.data,
                            borderColor: '#4F46E5',
                            tension: 0.1
                        }]
                    }}
                    options={chartOptions}
                />
            </div>

            {/* Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-medium mb-4">Status Pendaftaran</h2>
                    <StatusList items={[
                        { label: 'Terverifikasi', value: status_pendaftaran.terverifikasi },
                        { label: 'Diterima', value: status_pendaftaran.diterima },
                        { label: 'Ditolak', value: status_pendaftaran.ditolak }
                    ]} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-medium mb-4">Status Pembayaran</h2>
                    <StatusList items={[
                        { label: 'Belum Bayar', value: status_pembayaran.belum_bayar },
                        { label: 'Lunas', value: status_pembayaran.lunas }
                    ]} />
                </div>
            </div>
        </AdminLayout>
    );
} 
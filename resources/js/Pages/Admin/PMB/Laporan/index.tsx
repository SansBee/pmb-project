import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { ErrorBoundary } from 'react-error-boundary';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface LaporanData {
    total_pendaftar: number;
    total_pembayaran: number;
    pendaftar_per_prodi: {
        nama_prodi: string;
        total: number;
    }[];
    pendaftar_per_gelombang: {
        nama_gelombang: string;
        total: number;
    }[];
}

interface Props {
    laporan?: LaporanData;
}

const defaultLaporan: LaporanData = {
    total_pendaftar: 0,
    total_pembayaran: 0,
    pendaftar_per_prodi: [],
    pendaftar_per_gelombang: []
};

function ErrorFallback({ error }: { error: Error }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
        </div>
    );
}

// Fungsi format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export default function LaporanIndex({ laporan = defaultLaporan }: Props) {
    const data = laporan || defaultLaporan;

    const chartDataProdi = {
        labels: data.pendaftar_per_prodi.map(item => item.nama_prodi),
        datasets: [
            {
                label: 'Jumlah Pendaftar',
                data: data.pendaftar_per_prodi.map(item => item.total),
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1,
            },
        ],
    };

    const chartDataGelombang = {
        labels: data.pendaftar_per_gelombang.map(item => item.nama_gelombang),
        datasets: [
            {
                label: 'Jumlah Pendaftar',
                data: data.pendaftar_per_gelombang.map(item => item.total),
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                borderColor: 'rgb(16, 185, 129)',
                borderWidth: 1,
            },
        ],
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(16);
        doc.text('Laporan Penerimaan Mahasiswa Baru', 14, 15);
        doc.setFontSize(11);
        doc.text(`Tanggal: ${new Date().toLocaleDateString('id-ID')}`, 14, 25);

        // Add statistics
        doc.text(`Total Pendaftar: ${data.total_pendaftar}`, 14, 35);
        doc.text(`Total Pembayaran: ${formatCurrency(data.total_pembayaran)}`, 14, 45);

        // Add Program Studi table
        autoTable(doc, {
            head: [['Program Studi', 'Jumlah Pendaftar']],
            body: data.pendaftar_per_prodi.map(item => [
                item.nama_prodi,
                item.total
            ]),
            startY: 55
        });

        // Add Gelombang table
        autoTable(doc, {
            head: [['Gelombang', 'Jumlah Pendaftar']],
            body: data.pendaftar_per_gelombang.map(item => [
                item.nama_gelombang,
                item.total
            ]),
            startY: doc.lastAutoTable.finalY + 10
        });

        // Save PDF
        doc.save('laporan-pmb.pdf');
    };

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AdminLayout>
                <Head title="Laporan - Admin" />
                
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Laporan PMB</h2>
                            <button
                                onClick={handleExportPDF}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                                Export PDF
                            </button>
                        </div>

                        {/* Statistik Umum */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-700">Total Pendaftar</h3>
                                    <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm">
                                        Aktif
                                    </span>
                                </div>
                                <p className="text-3xl font-bold mt-4 text-gray-900">{data.total_pendaftar}</p>
                                <p className="text-sm text-gray-500 mt-2">Total pendaftar saat ini</p>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-700">Total Pembayaran</h3>
                                    <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">
                                        Terverifikasi
                                    </span>
                                </div>
                                <p className="text-3xl font-bold mt-4 text-gray-900">
                                    {formatCurrency(data.total_pembayaran)}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">Total pembayaran terverifikasi</p>
                            </div>
                        </div>

                        {/* Grafik atau Tabel */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Pendaftar per Program Studi</h3>
                                <div className="space-y-3">
                                    {data.pendaftar_per_prodi.map((item) => (
                                        <div key={item.nama_prodi} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">{item.nama_prodi}</span>
                                            <span className="font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                                                {item.total}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Pendaftar per Gelombang</h3>
                                <div className="space-y-3">
                                    {data.pendaftar_per_gelombang.map((item) => (
                                        <div key={item.nama_gelombang} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">{item.nama_gelombang}</span>
                                            <span className="font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                                {item.total}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-4">Grafik Program Studi</h3>
                                <Bar data={chartDataProdi} />
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h3 className="text-lg font-semibold mb-4">Grafik Gelombang</h3>
                                <Bar data={chartDataGelombang} />
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </ErrorBoundary>
    );
}
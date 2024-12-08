import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from './Components/StatusBadge';
import UpdateStatusForm from './Components/UpdateStatusForm';

interface Props {
    jadwalUjian: {
        id: number;
        jenis_ujian: string;
        tanggal_ujian: string;
        lokasi: string;
        ruangan: string;
        pendaftar: Array<{
            id: number;
            pendaftar: {
                nama_lengkap: string;
                program_studi: {
                    nama: string;
                };
            };
            status: string;
            nilai?: number;
        }>;
    };
}

export default function Peserta({ jadwalUjian }: Props) {
    return (
        <AdminLayout>
            <Head title="Peserta Ujian" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            {/* Info Jadwal */}
                            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-medium mb-4">Informasi Ujian</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Jenis Ujian</p>
                                        <p className="font-medium">{jadwalUjian.jenis_ujian}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Tanggal & Waktu</p>
                                        <p className="font-medium">
                                            {new Date(jadwalUjian.tanggal_ujian).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Lokasi</p>
                                        <p className="font-medium">{jadwalUjian.lokasi}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Ruangan</p>
                                        <p className="font-medium">{jadwalUjian.ruangan}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tabel Peserta */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Nama Peserta
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Program Studi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Nilai
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {jadwalUjian.pendaftar.map((peserta) => (
                                            <tr key={peserta.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {peserta.pendaftar.nama_lengkap}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {peserta.pendaftar.program_studi.nama}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge status={peserta.status} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {peserta.nilai || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <UpdateStatusForm peserta={peserta} />
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
        </AdminLayout>
    );
} 
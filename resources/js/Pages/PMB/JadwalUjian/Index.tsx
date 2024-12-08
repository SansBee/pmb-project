import React from 'react';
import { Head } from '@inertiajs/react';
import PMBLayout from '@/Layouts/PMBLayout';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    jadwal_ujian?: Array<{
        id: number;
        gelombang: {
            nama_gelombang: string;
        };
        jenis_ujian: string;
        tanggal_ujian: string;
        lokasi: string;
        ruangan: string;
        kapasitas: number;
    }>;
}

export default function JadwalUjian({ auth, jadwal_ujian }: Props) {
    return (
        <PMBLayout user={auth.user}>
            <Head title="Jadwal Ujian PMB" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Jadwal Ujian PMB</h2>
                            
                            {jadwal_ujian && jadwal_ujian.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Gelombang
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Jenis Ujian
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tanggal & Waktu
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Lokasi
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ruangan
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Kapasitas
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {jadwal_ujian.map((jadwal) => (
                                                <tr key={jadwal.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {jadwal.gelombang.nama_gelombang}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {jadwal.jenis_ujian}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {new Date(jadwal.tanggal_ujian).toLocaleDateString('id-ID', {
                                                            weekday: 'long',
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {jadwal.lokasi}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {jadwal.ruangan}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {jadwal.kapasitas} orang
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    Belum ada jadwal ujian yang tersedia
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PMBLayout>
    );
} 
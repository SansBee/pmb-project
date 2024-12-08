import React from 'react';
import PMBLayout from '@/Layouts/PMBLayout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import ProgressSteps from '@/Components/PMB/ProgressSteps';

interface Props {
    auth: { user: any };
    pendaftaran?: {
        nama_lengkap: string;
        jalur_masuk: {
            nama_jalur: string;
        };
        program_studi: {
            nama: string;
        };
        gelombang: {
            nama_gelombang: string;
            tanggal_mulai: string;
            tanggal_selesai: string;
        };
        status_pendaftaran: string;
        status_pembayaran: string;
    };
    gelombang_aktif?: {
        nama_gelombang: string;
        tanggal_mulai: string;
        tanggal_selesai: string;
    };
}

export default function Dashboard({ auth, pendaftaran, gelombang_aktif }: Props) {
    const getSteps = () => {
        if (!pendaftaran) return [];
        
        const steps = [
            {
                label: 'Pendaftaran',
                status: 'complete' as const
            },
            {
                label: 'Upload Dokumen',
                status: pendaftaran.status_pendaftaran === 'menunggu_dokumen' ? 'current' as const : 
                       pendaftaran.status_pendaftaran === 'draft' ? 'pending' as const : 'complete' as const
            },
            {
                label: 'Pembayaran',
                status: pendaftaran.status_pembayaran === 'belum_bayar' ? 'pending' as const : 'complete' as const
            }
        ];

        // Tambah step ujian untuk jalur reguler
        if (pendaftaran.jalur_masuk.nama_jalur === 'Reguler') {
            steps.push({
                label: 'Ujian',
                status: pendaftaran.status_pendaftaran === 'menunggu_ujian' ? 'current' as const :
                       pendaftaran.status_pendaftaran === 'selesai_ujian' ? 'complete' as const : 'pending' as const
            });
        }

        return steps;
    };

    return (
        <PMBLayout user={auth.user}>
            <Head title="Dashboard PMB" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {!pendaftaran ? (
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6">
                                <div className="text-center">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Selamat Datang di PMB Online
                                    </h3>
                                    {gelombang_aktif ? (
                                        <>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <p>Gelombang Pendaftaran Aktif:</p>
                                                <p className="font-medium">{gelombang_aktif.nama_gelombang}</p>
                                                <p className="text-xs">
                                                    {new Date(gelombang_aktif.tanggal_mulai).toLocaleDateString()} - 
                                                    {new Date(gelombang_aktif.tanggal_selesai).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="mt-6">
                                                <Link
                                                    href={route('pmb.register')}
                                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700"
                                                >
                                                    Daftar Sekarang
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Mohon maaf, belum ada gelombang pendaftaran yang aktif.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Progress Steps */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-medium mb-4">Progress Pendaftaran</h2>
                                <ProgressSteps steps={getSteps()} />
                            </div>

                            {/* Info Pendaftar */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-medium mb-4">Informasi Pendaftaran</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Nama Lengkap</p>
                                        <p className="font-medium">{pendaftaran.nama_lengkap}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Program Studi</p>
                                        <p className="font-medium">{pendaftaran.program_studi.nama}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Jalur Masuk</p>
                                        <p className="font-medium">{pendaftaran.jalur_masuk.nama_jalur}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Gelombang</p>
                                        <p className="font-medium">{pendaftaran.gelombang.nama_gelombang}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(pendaftaran.gelombang.tanggal_mulai).toLocaleDateString()} - 
                                            {new Date(pendaftaran.gelombang.tanggal_selesai).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Status & Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Status Pendaftaran */}
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h2 className="text-lg font-medium mb-4">Status</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                {pendaftaran.status_pendaftaran === 'diterima' ? (
                                                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                                                ) : pendaftaran.status_pendaftaran === 'ditolak' ? (
                                                    <XCircleIcon className="h-8 w-8 text-red-500" />
                                                ) : (
                                                    <ClockIcon className="h-8 w-8 text-yellow-500" />
                                                )}
                                                <span className="ml-2">Status Pendaftaran</span>
                                            </div>
                                            <Link
                                                href={route('pmb.status')}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Detail
                                            </Link>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                {pendaftaran.status_pembayaran === 'lunas' ? (
                                                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                                                ) : (
                                                    <ClockIcon className="h-8 w-8 text-yellow-500" />
                                                )}
                                                <span className="ml-2">Pembayaran</span>
                                            </div>
                                            <Link
                                                href={route('pmb.pembayaran')}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                {pendaftaran.status_pembayaran === 'lunas' ? 'Detail' : 'Bayar'}
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h2 className="text-lg font-medium mb-4">Menu Cepat</h2>
                                    <div className="space-y-3">
                                        <Link
                                            href={route('pmb.dokumen')}
                                            className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                                        >
                                            <div className="font-medium">Upload Dokumen</div>
                                            <div className="text-sm text-gray-500">
                                                Upload dan kelola dokumen pendaftaran Anda
                                            </div>
                                        </Link>

                                        {pendaftaran.jalur_masuk.nama_jalur === 'Reguler' && (
                                            <Link
                                                href={route('pmb.jadwal')}
                                                className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                                            >
                                                <div className="font-medium">Jadwal Ujian</div>
                                                <div className="text-sm text-gray-500">
                                                    Lihat jadwal dan informasi ujian
                                                </div>
                                            </Link>
                                        )}

                                        <Link
                                            href={route('pmb.pengumuman')}
                                            className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                                        >
                                            <div className="font-medium">Pengumuman</div>
                                            <div className="text-sm text-gray-500">
                                                Lihat pengumuman terkait PMB
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PMBLayout>
    );
} 
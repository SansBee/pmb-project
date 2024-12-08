import React from 'react';
import { Head } from '@inertiajs/react';
import PMBLayout from '@/Layouts/PMBLayout';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import ProgressSteps from '@/Components/PMB/ProgressSteps';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    pendaftaran?: {
        status: string;
        jalur_masuk?: {
            nama: string;
        };
        program_studi?: {
            nama: string;
        };
        dokumen?: Array<{
            nama: string;
            status: 'pending' | 'verified' | 'rejected';
        }>;
        pembayaran?: {
            status: 'pending' | 'verified' | 'rejected';
            jumlah: number;
        };
    };
}

export default function Status({ auth, pendaftaran }: Props) {
    const getSteps = (pendaftar: any) => {
        const steps = [
            {
                label: 'Pendaftaran',
                status: 'complete' as const
            },
            {
                label: 'Upload Dokumen',
                status: pendaftar.status_pendaftaran === 'menunggu_dokumen' ? 'current' as const : 
                       pendaftar.status_pendaftaran === 'draft' ? 'pending' as const : 'complete' as const
            },
            {
                label: 'Pembayaran',
                status: pendaftar.status_pendaftaran === 'menunggu_bayar' ? 'current' as const :
                       ['draft', 'menunggu_dokumen'].includes(pendaftar.status_pendaftaran) ? 'pending' as const : 'complete' as const
            }
        ];

        // Tambahkan step ujian jika jalur reguler
        if (pendaftar.jalur_masuk?.nama_jalur === 'Reguler') {
            steps.push({
                label: 'Ujian',
                status: pendaftar.status_pendaftaran === 'menunggu_ujian' ? 'current' as const :
                       ['draft', 'menunggu_dokumen', 'menunggu_bayar'].includes(pendaftar.status_pendaftaran) ? 'pending' as const : 'complete' as const
            });
        }

        return steps;
    };

    return (
        <PMBLayout user={auth.user}>
            <Head title="Status Pendaftaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {!pendaftaran ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">
                                Silakan melakukan pendaftaran terlebih dahulu.
                            </p>
                            <Link
                                href={route('pmb.register')}
                                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Daftar Sekarang
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Status Overview */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h2 className="text-lg font-medium mb-4">Status Pendaftaran</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <StatusCard
                                        title="Jalur Masuk"
                                        value={pendaftaran.jalur_masuk?.nama || '-'}
                                    />
                                    <StatusCard
                                        title="Program Studi"
                                        value={pendaftaran.program_studi?.nama || '-'}
                                    />
                                    <StatusCard
                                        title="Status"
                                        value={pendaftaran.status}
                                    />
                                </div>
                            </div>

                            {/* Dokumen Status */}
                            {pendaftaran.dokumen && (
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h3 className="text-lg font-medium mb-4">Status Dokumen</h3>
                                    <div className="space-y-4">
                                        {pendaftaran.dokumen.map((doc, index) => (
                                            <DocumentStatus key={index} {...doc} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Payment Status */}
                            {pendaftaran.pembayaran && (
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h3 className="text-lg font-medium mb-4">Status Pembayaran</h3>
                                    <PaymentStatus {...pendaftaran.pembayaran} />
                                </div>
                            )}

                            <div className="bg-white p-6 rounded-lg shadow mb-6">
                                <h2 className="text-lg font-medium mb-4">Progress Pendaftaran</h2>
                                <ProgressSteps steps={getSteps(pendaftaran)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PMBLayout>
    );
}

// Komponen pendukung
const StatusCard = ({ title, value }: { title: string; value: string }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-600">{title}</div>
        <div className="font-medium mt-1">{value}</div>
    </div>
);

const DocumentStatus = ({ nama, status }: { nama: string; status: 'pending' | 'verified' | 'rejected' }) => {
    const getStatusIcon = () => {
        switch(status) {
            case 'verified':
                return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
            case 'rejected':
                return <XCircleIcon className="w-5 h-5 text-red-500" />;
            default:
                return <ClockIcon className="w-5 h-5 text-yellow-500" />;
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span>{nama}</span>
            <div className="flex items-center">
                {getStatusIcon()}
                <span className="ml-2 text-sm capitalize">{status}</span>
            </div>
        </div>
    );
};

const PaymentStatus = ({ status, jumlah }: { status: string; jumlah: number }) => (
    <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
            <div>
                <div className="text-sm text-gray-600">Total Pembayaran</div>
                <div className="font-medium">Rp {jumlah.toLocaleString()}</div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                status === 'verified' ? 'bg-green-100 text-green-800' :
                status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
            }`}>
                {status}
            </span>
        </div>
    </div>
); 
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PMBLayout from '@/Layouts/PMBLayout';
import StatusBadge, { StatusType } from '@/Components/PMB/StatusBadge';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    gelombang?: {
        id: number;
        nama_gelombang: string;
        tanggal_mulai: string;
        tanggal_selesai: string;
    };
    has_active_gelombang: boolean;
}

export default function Dashboard({ auth, gelombang, has_active_gelombang }: Props) {
    return (
        <PMBLayout user={auth.user}>
            <Head title="Dashboard PMB" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-semibold mb-6">Selamat Datang di PMB Online</h2>

                    {!has_active_gelombang ? (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                            <p className="text-yellow-700">
                                Belum ada gelombang pendaftaran yang aktif
                            </p>
                        </div>
                    ) : gelombang && (
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6">
                                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                    <h3 className="font-medium text-blue-800">
                                        {gelombang.nama_gelombang}
                                    </h3>
                                    <p className="text-sm text-blue-600 mt-1">
                                        Periode: {new Date(gelombang.tanggal_mulai).toLocaleDateString()} - 
                                        {new Date(gelombang.tanggal_selesai).toLocaleDateString()}
                                    </p>
                                </div>

                                <Link
                                    href={route('pmb.register')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Mulai Pendaftaran
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PMBLayout>
    );
} 
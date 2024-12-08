import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

interface Notifikasi {
    id: number;
    judul: string;
    pesan: string;
    tipe: string;
    dibaca: boolean;
    created_at: string;
}

interface Props {
    notifikasi: Notifikasi[];
}

export default function Index({ notifikasi }: Props) {
    return (
        <AdminLayout>
            <Head title="Notifikasi" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">Notifikasi</h2>
                                {notifikasi.some(n => !n.dibaca) && (
                                    <Link
                                        href={route('notifikasi.readAll')}
                                        method="post"
                                        as="button"
                                        className="text-sm text-indigo-600 hover:text-indigo-900"
                                    >
                                        Tandai Semua Dibaca
                                    </Link>
                                )}
                            </div>

                            <div className="space-y-4">
                                {notifikasi.map((item) => (
                                    <div 
                                        key={item.id} 
                                        className={`p-4 rounded-lg border ${
                                            !item.dibaca ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{item.judul}</h3>
                                                <p className="text-gray-600 mt-1">{item.pesan}</p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            {!item.dibaca && (
                                                <Link
                                                    href={route('notifikasi.read', item.id)}
                                                    method="post"
                                                    as="button"
                                                    className="text-sm text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Tandai Dibaca
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {notifikasi.length === 0 && (
                                    <div className="text-center text-gray-500 py-8">
                                        Tidak ada notifikasi
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 
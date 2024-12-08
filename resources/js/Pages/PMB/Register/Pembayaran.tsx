import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PMBLayout from '@/Layouts/PMBLayout';
import { toast } from 'react-hot-toast';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    pendaftar: {
        id: number;
        status_pembayaran: string;
        pembayaran?: {
            id: number;
            metode_pembayaran: string;
            jumlah: number;
            bukti_pembayaran: string;
            status: string;
            catatan?: string;
        };
    };
    biaya: {
        jumlah: number;
        keterangan: string;
        jenis_biaya: string;
        program_studi: string;
        gelombang: string;
    };
    metode_pembayaran: Array<{
        id: string;
        nama: string;
        nomor_rekening: string;
        atas_nama: string;
    }>;
}

export default function Pembayaran({ auth, pendaftar, biaya, metode_pembayaran }: Props) {
    const [selectedMethod, setSelectedMethod] = useState('');

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedMethod) {
            toast.error('Pilih metode pembayaran terlebih dahulu');
            return;
        }

        if (!e.target.files?.length) return;

        const formData = new FormData();
        formData.append('metode_pembayaran', selectedMethod);
        formData.append('bukti_pembayaran', e.target.files[0]);

        router.post(route('pmb.pembayaran.upload'), formData, {
            onSuccess: () => {
                toast.success('Bukti pembayaran berhasil diupload');
            },
            onError: () => {
                toast.error('Gagal mengupload bukti pembayaran');
            }
        });
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            verified: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };
        return badges[status as keyof typeof badges] || badges.pending;
    };

    return (
        <PMBLayout user={auth.user}>
            <Head title="Pembayaran PMB" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <h2 className="text-lg font-medium mb-6">Informasi Pembayaran</h2>

                            {/* Informasi Biaya */}
                            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                                <h3 className="font-medium text-blue-800">Informasi Biaya</h3>
                                <div className="text-2xl font-bold text-blue-900 mt-1">
                                    Rp {biaya.jumlah.toLocaleString()}
                                </div>
                                <div className="text-sm text-blue-600 mt-1">
                                    <p>Jenis: {biaya.jenis_biaya}</p>
                                    <p>Program Studi: {biaya.program_studi}</p>
                                    <p>Gelombang: {biaya.gelombang}</p>
                                    <p className="mt-2">{biaya.keterangan}</p>
                                </div>
                            </div>

                            {pendaftar.pembayaran ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <h4 className="font-medium">Bukti Pembayaran</h4>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    Metode: {pendaftar.pembayaran.metode_pembayaran}
                                                </p>
                                                <div className="flex items-center space-x-2">
                                                    <a 
                                                        href={`/storage/${pendaftar.pembayaran.bukti_pembayaran}`}
                                                        target="_blank"
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        Lihat Bukti Pembayaran
                                                    </a>
                                                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(pendaftar.pembayaran.status)}`}>
                                                        {pendaftar.pembayaran.status.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {pendaftar.pembayaran.status === 'rejected' && (
                                            <p className="text-sm text-red-600">
                                                {pendaftar.pembayaran.catatan}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Metode Pembayaran */}
                                    <div className="space-y-4 mb-6">
                                        <h3 className="font-medium">Pilih Metode Pembayaran</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {metode_pembayaran.map((metode) => (
                                                <div 
                                                    key={metode.id}
                                                    className={`border rounded-lg p-4 cursor-pointer ${
                                                        selectedMethod === metode.id 
                                                        ? 'border-blue-500 bg-blue-50' 
                                                        : 'hover:border-gray-300'
                                                    }`}
                                                    onClick={() => setSelectedMethod(metode.id)}
                                                >
                                                    <h4 className="font-medium">{metode.nama}</h4>
                                                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                                                        <p>No. Rekening: {metode.nomor_rekening}</p>
                                                        <p>Atas Nama: {metode.atas_nama}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Upload Bukti */}
                                    <div>
                                        <h3 className="font-medium mb-2">Upload Bukti Pembayaran</h3>
                                        <input
                                            type="file"
                                            onChange={handleUpload}
                                            accept="image/*,.pdf"
                                            className="block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-medium
                                                file:bg-blue-50 file:text-blue-700
                                                hover:file:bg-blue-100"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PMBLayout>
    );
} 
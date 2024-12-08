import React from 'react';
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
        pembayaran?: {
            id: number;
            bukti_pembayaran: string;
            status: string;
            catatan?: string;
        };
    };
}

export default function Pembayaran({ auth, pendaftar }: Props) {
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const formData = new FormData();
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

    return (
        <PMBLayout user={auth.user}>
            <Head title="Upload Bukti Pembayaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <h2 className="text-lg font-medium mb-4">Upload Bukti Pembayaran</h2>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">
                                    Bukti Pembayaran
                                </label>
                                <input
                                    type="file"
                                    onChange={handleUpload}
                                    className="mt-1 block w-full"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                />
                            </div>

                            {pendaftar.pembayaran && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">
                                        Status: {pendaftar.pembayaran.status}
                                    </p>
                                    {pendaftar.pembayaran.catatan && (
                                        <p className="text-sm text-red-600">
                                            Catatan: {pendaftar.pembayaran.catatan}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PMBLayout>
    );
} 
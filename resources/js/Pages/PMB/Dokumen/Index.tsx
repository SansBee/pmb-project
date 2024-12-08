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
        dokumen: Array<{
            id: number;
            nama_dokumen: string;
            file_path: string;
            status: string;
            catatan?: string;
        }>;
    };
}

export default function Dokumen({ auth, pendaftar }: Props) {
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, jenisDokumen: string) => {
        if (!e.target.files?.length) return;

        const formData = new FormData();
        formData.append('jenis_dokumen', jenisDokumen);
        formData.append('file', e.target.files[0]);

        router.post(route('pmb.dokumen.upload'), formData, {
            onSuccess: () => {
                toast.success('Dokumen berhasil diupload');
            },
            onError: () => {
                toast.error('Gagal mengupload dokumen');
            }
        });
    };

    return (
        <PMBLayout user={auth.user}>
            <Head title="Upload Dokumen" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <h2 className="text-lg font-medium mb-4">Upload Dokumen</h2>

                            {/* Form Upload KTP */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">
                                    KTP
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleUpload(e, 'ktp')}
                                    className="mt-1 block w-full"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                />
                            </div>

                            {/* Form Upload Ijazah */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">
                                    Ijazah
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleUpload(e, 'ijazah')}
                                    className="mt-1 block w-full"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                />
                            </div>

                            {/* Form Upload Foto */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700">
                                    Pas Foto
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => handleUpload(e, 'foto')}
                                    className="mt-1 block w-full"
                                    accept=".jpg,.jpeg,.png"
                                />
                            </div>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => router.visit(route('pmb.pembayaran'))}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Lanjut ke Pembayaran
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PMBLayout>
    );
} 
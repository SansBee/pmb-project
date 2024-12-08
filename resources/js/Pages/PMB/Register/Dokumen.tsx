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
            persyaratan_dokumen_id: number;
            nama_dokumen: string;
            file_path: string;
            status: string;
            catatan?: string;
        }>;
    };
    required_docs: Array<{
        id: number;
        nama_dokumen: string;
        deskripsi: string;
        format_file: string;
        required: boolean;
    }>;
}

export default function Dokumen({ auth, pendaftar, required_docs }: Props) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, dokumenId: number) => {
        if (!e.target.files?.length) return;

        const formData = new FormData();
        formData.append('dokumen_id', dokumenId.toString());
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
                            <h2 className="text-lg font-medium mb-4">Upload Dokumen Persyaratan</h2>

                            <div className="mb-4 text-sm text-gray-600">
                                Format: .pdf,jpg,jpeg,png
                            </div>

                            <div className="space-y-4">
                                {required_docs.map((doc, index) => {
                                    const uploadedDoc = pendaftar.dokumen.find(
                                        d => d.persyaratan_dokumen_id === doc.id
                                    );

                                    return (
                                        <div key={index} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <h3 className="font-medium">{doc.nama_dokumen}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {doc.deskripsi}
                                                    </p>
                                                    {uploadedDoc && (
                                                        <span className={`text-sm ${
                                                            uploadedDoc.status === 'pending' ? 'text-yellow-600' :
                                                            uploadedDoc.status === 'verified' ? 'text-green-600' :
                                                            'text-red-600'
                                                        }`}>
                                                            Status: {uploadedDoc.status}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {!uploadedDoc && (
                                                <div>
                                                    <input
                                                        type="file"
                                                        onChange={(e) => handleFileChange(e, doc.id)}
                                                        accept={doc.format_file}
                                                        className="block w-full text-sm text-gray-500
                                                            file:mr-4 file:py-2 file:px-4
                                                            file:rounded-md file:border-0
                                                            file:text-sm file:font-medium
                                                            file:bg-blue-50 file:text-blue-700
                                                            hover:file:bg-blue-100"
                                                    />
                                                </div>
                                            )}

                                            {uploadedDoc && (
                                                <div className="flex items-center space-x-2">
                                                    <a 
                                                        href={`/storage/${uploadedDoc.file_path}`}
                                                        target="_blank"
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        Lihat Dokumen
                                                    </a>
                                                    {uploadedDoc.status === 'rejected' && (
                                                        <span className="text-red-600 text-sm">
                                                            {uploadedDoc.catatan}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => router.visit(route('pmb.pembayaran'))}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
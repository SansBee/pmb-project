import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import PMBLayout from '@/Layouts/PMBLayout';
import axios from 'axios';
import { usePage } from '@inertiajs/react';

interface PersyaratanDokumen {
    id: number;
    nama_dokumen: string;
    deskripsi: string;
    kategori: string;
    format_file: string;
    max_size: number;
    size_type: string;
    format_helper: string;
    is_wajib: boolean;
}

export default function DokumenIndex() {
    const { auth } = usePage().props;
    const [dokumen, setDokumen] = useState<PersyaratanDokumen[]>([]);
    const [uploadStatus, setUploadStatus] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        axios.get('/api/persyaratan-dokumen')
            .then(response => {
                setDokumen(response.data);
            });
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, dokumenId: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('persyaratan_dokumen_id', dokumenId.toString());
        formData.append('file', file);

        try {
            setUploadStatus(prev => ({ ...prev, [dokumenId]: 'uploading' }));
            await axios.post('/api/upload-dokumen', formData);
            setUploadStatus(prev => ({ ...prev, [dokumenId]: 'success' }));
        } catch (error) {
            setUploadStatus(prev => ({ ...prev, [dokumenId]: 'error' }));
            console.error('Upload error:', error);
        }
    };

    return (
        <PMBLayout user={auth.user}>
            <Head title="Upload Dokumen" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-6">Upload Dokumen Persyaratan</h2>
                            
                            {/* Grup dokumen berdasarkan kategori */}
                            {Object.entries(
                                dokumen.reduce((acc, doc) => {
                                    acc[doc.kategori] = [...(acc[doc.kategori] || []), doc];
                                    return acc;
                                }, {} as { [key: string]: PersyaratanDokumen[] })
                            ).map(([kategori, dokumenList]) => (
                                <div key={kategori} className="mb-8">
                                    <h3 className="text-md font-medium mb-4">{kategori}</h3>
                                    <div className="space-y-4">
                                        {dokumenList.map(doc => (
                                            <div key={doc.id} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {doc.nama_dokumen}
                                                            {doc.is_wajib && <span className="text-red-500 ml-1">*</span>}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">{doc.deskripsi}</p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            Format: {doc.format_file} 
                                                            {doc.max_size && ` (Maks. ${doc.max_size} ${doc.size_type})`}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="file"
                                                            id={`dokumen-${doc.id}`}
                                                            className="hidden"
                                                            onChange={(e) => handleUpload(e, doc.id)}
                                                        />
                                                        <label
                                                            htmlFor={`dokumen-${doc.id}`}
                                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                                                        >
                                                            Upload
                                                        </label>
                                                    </div>
                                                </div>
                                                {uploadStatus[doc.id] && (
                                                    <div className="mt-2">
                                                        {uploadStatus[doc.id] === 'uploading' && (
                                                            <p className="text-yellow-600">Sedang mengupload...</p>
                                                        )}
                                                        {uploadStatus[doc.id] === 'success' && (
                                                            <p className="text-green-600">Upload berhasil</p>
                                                        )}
                                                        {uploadStatus[doc.id] === 'error' && (
                                                            <p className="text-red-600">Gagal upload</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PMBLayout>
    );
} 
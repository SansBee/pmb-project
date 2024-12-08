import React, { useState, useEffect } from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import axios from 'axios';

interface JalurMasuk {
    id: number;
    nama_jalur: string;
}

interface PersyaratanDokumen {
    id: number;
    nama_dokumen: string;
    deskripsi: string | null;
    kategori: string;
    urutan: number;
    format_file: string | null;
    max_size: number | null;
    size_type: string;
    format_helper: string | null;
    is_wajib: boolean;
    is_active: boolean;
}

interface Props {
    data: any;
    onChange: (data: any) => void;
    jalurMasuk: Array<{
        id: number;
        nama_jalur: string;
    }>;
    programStudi: Array<{
        id: number;
        nama: string;
    }>;
    gelombang: {
        id: number;
        nama_gelombang: string;
        tanggal_mulai: string;
        tanggal_selesai: string;
    };
    onNext: (data: any) => void;
    onPrev: () => void;
}

export default function DataProgramForm({ 
    data, 
    onChange, 
    jalurMasuk = [],
    programStudi = [],
    gelombang,
    onNext, 
    onPrev 
}: Props) {
    const [persyaratanDokumen, setPersyaratanDokumen] = useState<PersyaratanDokumen[]>([]);
    const [dokumenFiles, setDokumenFiles] = useState<{ [key: number]: File }>({});
    const [uploadStatus, setUploadStatus] = useState<{ [key: number]: string }>({});
    
    useEffect(() => {
        // Ambil data persyaratan dokumen dari backend
        axios.get('/api/persyaratan-dokumen')
            .then(response => setPersyaratanDokumen(response.data));
    }, []);

    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.jalur_masuk_id || !data.program_studi_id) {
            return;
        }
        
        const programData = {
            ...data,
            gelombang_id: gelombang.id
        };
        
        onNext({ program: programData });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, dokumenId: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('persyaratan_dokumen_id', dokumenId.toString());
        formData.append('file', file);

        try {
            setUploadStatus(prev => ({ ...prev, [dokumenId]: 'uploading' }));
            const response = await axios.post('/api/upload-dokumen', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setUploadStatus(prev => ({ ...prev, [dokumenId]: 'success' }));
            setDokumenFiles(prev => ({ ...prev, [dokumenId]: file }));
        } catch (error) {
            setUploadStatus(prev => ({ ...prev, [dokumenId]: 'error' }));
            console.error('Upload error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                {/* Gelombang Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800">
                        {gelombang.nama_gelombang}
                    </h3>
                    <p className="text-sm text-blue-600 mt-1">
                        Periode: {new Date(gelombang.tanggal_mulai).toLocaleDateString()} - 
                        {new Date(gelombang.tanggal_selesai).toLocaleDateString()}
                    </p>
                </div>

                {/* Jalur Masuk */}
                <div>
                    <InputLabel htmlFor="jalur_masuk_id" value="Jalur Masuk" />
                    <select
                        id="jalur_masuk_id"
                        value={data.jalur_masuk_id}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => handleChange('jalur_masuk_id', e.target.value)}
                        required
                    >
                        <option value="">Pilih Jalur Masuk</option>
                        {jalurMasuk.map((jalur) => (
                            <option key={jalur.id} value={jalur.id}>
                                {jalur.nama_jalur}
                            </option>
                        ))}
                    </select>
                    <InputError message="" className="mt-2" />
                </div>

                {/* Program Studi */}
                <div>
                    <InputLabel htmlFor="program_studi_id" value="Program Studi" />
                    <select
                        id="program_studi_id"
                        value={data.program_studi_id}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => handleChange('program_studi_id', e.target.value)}
                        required
                    >
                        <option value="">Pilih Program Studi</option>
                        {programStudi.map((prodi) => (
                            <option key={prodi.id} value={prodi.id}>
                                {prodi.nama}
                            </option>
                        ))}
                    </select>
                    <InputError message="" className="mt-2" />
                </div>

                {/* Tombol Navigasi */}
                <div className="flex justify-between">
                    <SecondaryButton type="button" onClick={onPrev}>
                        Sebelumnya
                    </SecondaryButton>
                    <PrimaryButton type="submit">
                        Selanjutnya
                    </PrimaryButton>
                </div>

                {/* Dokumen Persyaratan */}
                <div className="mt-6">
                    <h3 className="text-lg font-medium">Dokumen Persyaratan</h3>
                    <div className="mt-4 space-y-4">
                        {persyaratanDokumen.map((dokumen) => (
                            <div key={dokumen.id} className="border p-4 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-medium">
                                            {dokumen.nama_dokumen}
                                            {dokumen.is_wajib && <span className="text-red-500 ml-1">*</span>}
                                        </h4>
                                        <p className="text-sm text-gray-500">{dokumen.deskripsi}</p>
                                        {dokumen.format_helper && (
                                            <p className="text-xs text-gray-400 mt-1">
                                                {dokumen.format_helper}
                                                {dokumen.format_file && ` (${dokumen.format_file})`}
                                                {dokumen.max_size && ` max ${dokumen.max_size}${dokumen.size_type}`}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="file"
                                            className="hidden"
                                            id={`dokumen-${dokumen.id}`}
                                            onChange={(e) => handleFileUpload(e, dokumen.id)}
                                        />
                                        <label
                                            htmlFor={`dokumen-${dokumen.id}`}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Upload
                                        </label>
                                    </div>
                                </div>
                                {uploadStatus[dokumen.id] && (
                                    <div className="mt-2">
                                        {uploadStatus[dokumen.id] === 'uploading' && (
                                            <p className="text-yellow-600">Sedang mengupload...</p>
                                        )}
                                        {uploadStatus[dokumen.id] === 'success' && (
                                            <p className="text-green-600">Upload berhasil</p>
                                        )}
                                        {uploadStatus[dokumen.id] === 'error' && (
                                            <p className="text-red-600">Gagal upload</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
} 
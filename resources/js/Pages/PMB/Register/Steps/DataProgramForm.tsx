import React from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface JalurMasuk {
    id: number;
    nama_jalur: string;
}

interface Props {
    data: any;
    onChange: (data: any) => void;
    jalurMasuk: JalurMasuk[];
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
    onNext: () => void;
    onPrev: () => void;
}

export default function DataProgramForm({ 
    data, 
    jalurMasuk, 
    programStudi, 
    gelombang,
    onChange, 
    onNext, 
    onPrev 
}: Props) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.jalur_masuk_id || !data.program_studi_id) {
            return;
        }
        onNext();
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
            </div>
        </form>
    );
} 
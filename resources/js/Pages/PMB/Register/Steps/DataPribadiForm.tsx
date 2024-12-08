import React from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

interface Props {
    data: any;
    onChange: (data: any) => void;
    onNext: (data: any) => void;
    onPrev: () => void;
}

export default function DataPribadiForm({ data, onChange, onNext, onPrev }: Props) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validasi
        if (!data.nama_lengkap || !data.nik || !data.tempat_lahir || !data.tanggal_lahir || !data.jenis_kelamin) {
            return;
        }
        onNext(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                {/* Nama Lengkap */}
                <div>
                    <InputLabel htmlFor="nama_lengkap" value="Nama Lengkap" />
                    <TextInput
                        id="nama_lengkap"
                        type="text"
                        value={data.nama_lengkap}
                        className="mt-1 block w-full"
                        onChange={(e) => handleChange('nama_lengkap', e.target.value)}
                        required
                    />
                    <InputError message="" className="mt-2" />
                </div>

                {/* NIK */}
                <div>
                    <InputLabel htmlFor="nik" value="Nomor Induk Kependudukan (NIK)" />
                    <TextInput
                        id="nik"
                        type="text"
                        value={data.nik}
                        className="mt-1 block w-full"
                        onChange={(e) => handleChange('nik', e.target.value)}
                        required
                    />
                    <InputError message="" className="mt-2" />
                </div>

                {/* Tempat Lahir */}
                <div>
                    <InputLabel htmlFor="tempat_lahir" value="Tempat Lahir" />
                    <TextInput
                        id="tempat_lahir"
                        type="text"
                        value={data.tempat_lahir}
                        className="mt-1 block w-full"
                        onChange={(e) => handleChange('tempat_lahir', e.target.value)}
                        required
                    />
                    <InputError message="" className="mt-2" />
                </div>

                {/* Tanggal Lahir */}
                <div>
                    <InputLabel htmlFor="tanggal_lahir" value="Tanggal Lahir" />
                    <TextInput
                        id="tanggal_lahir"
                        type="date"
                        value={data.tanggal_lahir}
                        className="mt-1 block w-full"
                        onChange={(e) => handleChange('tanggal_lahir', e.target.value)}
                        required
                    />
                    <InputError message="" className="mt-2" />
                </div>

                {/* Jenis Kelamin */}
                <div>
                    <InputLabel htmlFor="jenis_kelamin" value="Jenis Kelamin" />
                    <select
                        id="jenis_kelamin"
                        value={data.jenis_kelamin}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => handleChange('jenis_kelamin', e.target.value)}
                        required
                    >
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                    <InputError message="" className="mt-2" />
                </div>

                {/* Tombol Next */}
                <div className="flex justify-end">
                    <PrimaryButton type="submit">
                        Selanjutnya
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
} 
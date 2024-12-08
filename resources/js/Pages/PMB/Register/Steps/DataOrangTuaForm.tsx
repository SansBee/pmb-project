import React from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface Props {
    data: any;
    onChange: (data: any) => void;
    onSubmit: (data: any) => void;
    onPrev: () => void;
}

export default function DataOrangTuaForm({ data, onChange, onPrev, onSubmit }: Props) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.nama_ayah || !data.pekerjaan_ayah || !data.nama_ibu || !data.pekerjaan_ibu || !data.penghasilan_ortu) {
            return;
        }
        onSubmit(data);
    };

    const pekerjaan = [
        'PNS',
        'TNI/POLRI',
        'Pegawai Swasta',
        'Wiraswasta',
        'Petani',
        'Nelayan',
        'Buruh',
        'Pensiunan',
        'Lainnya'
    ];

    const penghasilan = [
        { value: '1', label: 'Kurang dari Rp. 1.000.000' },
        { value: '2', label: 'Rp. 1.000.000 - Rp. 3.000.000' },
        { value: '3', label: 'Rp. 3.000.000 - Rp. 5.000.000' },
        { value: '4', label: 'Rp. 5.000.000 - Rp. 10.000.000' },
        { value: '5', label: 'Lebih dari Rp. 10.000.000' }
    ];

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                {/* Data Ayah */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <h3 className="font-medium text-gray-900">Data Ayah</h3>
                    
                    <div>
                        <InputLabel htmlFor="nama_ayah" value="Nama Ayah" />
                        <TextInput
                            id="nama_ayah"
                            type="text"
                            value={data.nama_ayah}
                            className="mt-1 block w-full"
                            onChange={(e) => handleChange('nama_ayah', e.target.value)}
                            required
                        />
                        <InputError message="" className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="pekerjaan_ayah" value="Pekerjaan Ayah" />
                        <select
                            id="pekerjaan_ayah"
                            value={data.pekerjaan_ayah}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => handleChange('pekerjaan_ayah', e.target.value)}
                            required
                        >
                            <option value="">Pilih Pekerjaan</option>
                            {pekerjaan.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <InputError message="" className="mt-2" />
                    </div>
                </div>

                {/* Data Ibu */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                    <h3 className="font-medium text-gray-900">Data Ibu</h3>
                    
                    <div>
                        <InputLabel htmlFor="nama_ibu" value="Nama Ibu" />
                        <TextInput
                            id="nama_ibu"
                            type="text"
                            value={data.nama_ibu}
                            className="mt-1 block w-full"
                            onChange={(e) => handleChange('nama_ibu', e.target.value)}
                            required
                        />
                        <InputError message="" className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="pekerjaan_ibu" value="Pekerjaan Ibu" />
                        <select
                            id="pekerjaan_ibu"
                            value={data.pekerjaan_ibu}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => handleChange('pekerjaan_ibu', e.target.value)}
                            required
                        >
                            <option value="">Pilih Pekerjaan</option>
                            {pekerjaan.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <InputError message="" className="mt-2" />
                    </div>
                </div>

                {/* Penghasilan Orang Tua */}
                <div>
                    <InputLabel htmlFor="penghasilan_ortu" value="Penghasilan Orang Tua per Bulan" />
                    <select
                        id="penghasilan_ortu"
                        value={data.penghasilan_ortu}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => handleChange('penghasilan_ortu', e.target.value)}
                        required
                    >
                        <option value="">Pilih Penghasilan</option>
                        {penghasilan.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
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
                        Selesai & Daftar
                    </PrimaryButton>
                </div>
            </div>
        </form>
    );
} 
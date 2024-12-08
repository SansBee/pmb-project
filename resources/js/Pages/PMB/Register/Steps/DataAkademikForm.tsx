import React from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

interface Props {
    data: any;
    onChange: (data: any) => void;
    onNext: (data: any) => void;
    onPrev: () => void;
}

export default function DataAkademikForm({ data, onChange, onNext, onPrev }: Props) {
    const handleChange = (key: string, value: string) => {
        onChange({ ...data, [key]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.asal_sekolah || !data.jurusan_sekolah || !data.tahun_lulus || !data.nilai_rata_rata) {
            return;
        }
        onNext(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-6">
                {/* Asal Sekolah */}
                <div>
                    <InputLabel htmlFor="asal_sekolah" value="Asal Sekolah" />
                    <TextInput
                        id="asal_sekolah"
                        type="text"
                        value={data.asal_sekolah}
                        className="mt-1 block w-full"
                        onChange={(e) => handleChange('asal_sekolah', e.target.value)}
                        required
                    />
                    <InputError message="" className="mt-2" />
                </div>

                {/* Jurusan Sekolah */}
                <div>
                    <InputLabel htmlFor="jurusan_sekolah" value="Jurusan Sekolah" />
                    <select
                        id="jurusan_sekolah"
                        value={data.jurusan_sekolah}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => handleChange('jurusan_sekolah', e.target.value)}
                        required
                    >
                        <option value="">Pilih Jurusan</option>
                        <option value="IPA">IPA</option>
                        <option value="IPS">IPS</option>
                        <option value="BAHASA">Bahasa</option>
                        <option value="TKJ">Teknik Komputer Jaringan</option>
                        <option value="RPL">Rekayasa Perangkat Lunak</option>
                        <option value="LAINNYA">Lainnya</option>
                    </select>
                    <InputError message="" className="mt-2" />
                </div>

                {/* Tahun Lulus */}
                <div>
                    <InputLabel htmlFor="tahun_lulus" value="Tahun Lulus" />
                    <TextInput
                        id="tahun_lulus"
                        type="number"
                        min="2000"
                        max={new Date().getFullYear()}
                        value={data.tahun_lulus}
                        className="mt-1 block w-full"
                        onChange={(e) => handleChange('tahun_lulus', e.target.value)}
                        required
                    />
                    <InputError message="" className="mt-2" />
                </div>

                {/* Nilai Rata-rata */}
                <div>
                    <InputLabel htmlFor="nilai_rata_rata" value="Nilai Rata-rata Rapor" />
                    <TextInput
                        id="nilai_rata_rata"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={data.nilai_rata_rata}
                        className="mt-1 block w-full"
                        onChange={(e) => handleChange('nilai_rata_rata', e.target.value)}
                        required
                    />
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
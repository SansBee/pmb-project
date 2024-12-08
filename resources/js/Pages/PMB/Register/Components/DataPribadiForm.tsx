import React from 'react';
import Input from '@/Components/Input';
import Select from '@/Components/Select';

interface Props {
    data: {
        nama_lengkap: string;
        nik: string;
        tempat_lahir: string;
        tanggal_lahir: string;
        jenis_kelamin: string;
        agama: string;
        alamat: string;
    };
    setData: (key: string, value: string) => void;
}

export default function DataPribadiForm({ data, setData }: Props) {
    const agamaOptions = [
        { value: 'islam', label: 'Islam' },
        { value: 'kristen', label: 'Kristen' },
        { value: 'katolik', label: 'Katolik' },
        { value: 'hindu', label: 'Hindu' },
        { value: 'buddha', label: 'Buddha' },
        { value: 'konghucu', label: 'Konghucu' }
    ];

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium">Data Pribadi</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Nama Lengkap"
                    value={data.nama_lengkap}
                    onChange={(e) => setData('nama_lengkap', e.target.value)}
                    required
                />
                
                <Input
                    label="NIK"
                    value={data.nik}
                    onChange={(e) => setData('nik', e.target.value)}
                    maxLength={16}
                    required
                />

                <Input
                    label="Tempat Lahir"
                    value={data.tempat_lahir}
                    onChange={(e) => setData('tempat_lahir', e.target.value)}
                    required
                />

                <Input
                    type="date"
                    label="Tanggal Lahir"
                    value={data.tanggal_lahir}
                    onChange={(e) => setData('tanggal_lahir', e.target.value)}
                    required
                />

                <Select
                    label="Jenis Kelamin"
                    value={data.jenis_kelamin}
                    onChange={(e) => setData('jenis_kelamin', e.target.value)}
                    options={[
                        { value: 'L', label: 'Laki-laki' },
                        { value: 'P', label: 'Perempuan' }
                    ]}
                    required
                />

                <Select
                    label="Agama"
                    value={data.agama}
                    onChange={(e) => setData('agama', e.target.value)}
                    options={agamaOptions}
                    required
                />
            </div>

            <div>
                <Input
                    type="textarea"
                    label="Alamat Lengkap"
                    value={data.alamat}
                    onChange={(e) => setData('alamat', e.target.value)}
                    required
                />
            </div>
        </div>
    );
}
import React from 'react';
import Select from '@/Components/Select';

interface Props {
    data: {
        jalur_masuk_id: string;
        program_studi_id: string;
    };
    setData: (key: string, value: string) => void;
    jalur_masuk: Array<{
        id: number;
        nama: string;
    }>;
    program_studi: Array<{
        id: number;
        nama: string;
    }>;
}

export default function DataProgramForm({ data, setData, jalur_masuk, program_studi }: Props) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium">Pilihan Program</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <Select
                    label="Jalur Masuk"
                    value={data.jalur_masuk_id}
                    onChange={(e) => setData('jalur_masuk_id', e.target.value)}
                    options={jalur_masuk.map(j => ({
                        value: j.id.toString(),
                        label: j.nama
                    }))}
                    required
                />
                
                <Select
                    label="Program Studi"
                    value={data.program_studi_id}
                    onChange={(e) => setData('program_studi_id', e.target.value)}
                    options={program_studi.map(p => ({
                        value: p.id.toString(),
                        label: p.nama
                    }))}
                    required
                />
            </div>
        </div>
    );
} 
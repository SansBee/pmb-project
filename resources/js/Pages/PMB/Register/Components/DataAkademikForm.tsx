import React from 'react';
import Input from '@/Components/Input';

interface Props {
    data: {
        asal_sekolah: string;
        tahun_lulus: string;
        nilai_rata_rata: string;
    };
    setData: (key: string, value: string) => void;
}

export default function DataAkademikForm({ data, setData }: Props) {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-medium">Data Akademik</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Asal Sekolah"
                    value={data.asal_sekolah}
                    onChange={(e) => setData('asal_sekolah', e.target.value)}
                    required
                />
                
                <Input
                    label="Tahun Lulus"
                    type="number"
                    value={data.tahun_lulus}
                    onChange={(e) => setData('tahun_lulus', e.target.value)}
                    min={2000}
                    max={new Date().getFullYear()}
                    required
                />

                <Input
                    label="Nilai Rata-rata Rapor"
                    type="number"
                    value={data.nilai_rata_rata}
                    onChange={(e) => setData('nilai_rata_rata', e.target.value)}
                    step="0.01"
                    min={0}
                    max={100}
                    required
                />
            </div>
        </div>
    );
} 
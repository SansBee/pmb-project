import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
    peserta: {
        id: number;
        status: string;
        nilai?: number;
    };
}

export default function UpdateStatusForm({ peserta }: Props) {
    const [status, setStatus] = useState(peserta.status);
    const [nilai, setNilai] = useState(peserta.nilai?.toString() || '');

    const handleSubmit = () => {
        router.post(route('admin.jadwal-ujian.update-peserta', peserta.id), {
            status,
            nilai: status === 'hadir' ? Number(nilai) : undefined
        }, {
            preserveScroll: true,
            onSuccess: () => toast.success('Status berhasil diupdate'),
            onError: () => toast.error('Gagal mengupdate status')
        });
    };

    return (
        <div className="flex items-center space-x-2">
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
                <option value="terdaftar">Terdaftar</option>
                <option value="hadir">Hadir</option>
                <option value="tidak_hadir">Tidak Hadir</option>
            </select>

            {status === 'hadir' && (
                <input
                    type="number"
                    value={nilai}
                    onChange={(e) => setNilai(e.target.value)}
                    placeholder="Nilai"
                    className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    min="0"
                    max="100"
                />
            )}

            <button
                onClick={handleSubmit}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
                Simpan
            </button>
        </div>
    );
} 
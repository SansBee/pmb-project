import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
    jadwalId: number;
    onClose: () => void;
}

export default function DaftarPesertaModal({ jadwalId, onClose }: Props) {
    const [pendaftar, setPendaftar] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ambil daftar pendaftar yang belum terdaftar ujian
        fetch(route('admin.pendaftar.available'))
            .then(res => res.json())
            .then(data => {
                setPendaftar(data);
                setLoading(false);
            });
    }, []);

    const handleDaftar = (pendaftarId: number) => {
        router.post(route('admin.jadwal-ujian.daftar-peserta', jadwalId), {
            pendaftar_id: pendaftarId
        }, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Peserta berhasil didaftarkan');
                onClose();
            },
            onError: () => toast.error('Gagal mendaftarkan peserta')
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium mb-4">Daftarkan Peserta Ujian</h3>
                
                {loading ? (
                    <p>Loading...</p>
                ) : pendaftar.length === 0 ? (
                    <p>Tidak ada pendaftar yang tersedia</p>
                ) : (
                    <div className="space-y-2">
                        {pendaftar.map((p: any) => (
                            <div key={p.id} className="flex justify-between items-center p-2 border rounded">
                                <div>
                                    <p className="font-medium">{p.nama_lengkap}</p>
                                    <p className="text-sm text-gray-500">{p.program_studi.nama}</p>
                                </div>
                                <button
                                    onClick={() => handleDaftar(p.id)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Daftar
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-4">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
} 
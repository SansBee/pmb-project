import React from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'react-hot-toast';

interface Props {
    jadwalUjian: {
        id: number;
        jenis_ujian: string;
        tanggal_ujian: string;
        lokasi: string;
        ruangan: string;
        peserta: Array<{
            id: number;
            pendaftar: {
                nama_lengkap: string;
                program_studi: {
                    nama: string;
                };
            };
            status: string;
            nilai?: number;
        }>;
    };
    onClose: () => void;
}

export default function PesertaModal({ jadwalUjian, onClose }: Props) {
    const handleUpdateStatus = (pesertaId: number, status: string, nilai?: number) => {
        router.post(route('admin.jadwal-ujian.update-peserta', pesertaId), {
            status,
            nilai
        }, {
            preserveScroll: true,
            onSuccess: () => toast.success('Status berhasil diupdate')
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium mb-4">Daftar Peserta Ujian</h3>
                    
                    {/* Info Jadwal */}
                    <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Jenis Ujian</p>
                                <p className="font-medium">{jadwalUjian.jenis_ujian}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Tanggal & Waktu</p>
                                <p className="font-medium">
                                    {new Date(jadwalUjian.tanggal_ujian).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Lokasi</p>
                                <p className="font-medium">{jadwalUjian.lokasi}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Ruangan</p>
                                <p className="font-medium">{jadwalUjian.ruangan}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabel Peserta */}
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Nama</th>
                                <th className="px-4 py-2">Program Studi</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Nilai</th>
                                <th className="px-4 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jadwalUjian.peserta.map(peserta => (
                                <tr key={peserta.id}>
                                    <td className="px-4 py-2">{peserta.pendaftar.nama_lengkap}</td>
                                    <td className="px-4 py-2">{peserta.pendaftar.program_studi.nama}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            peserta.status === 'hadir' ? 'bg-green-100 text-green-800' :
                                            peserta.status === 'tidak_hadir' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {peserta.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">{peserta.nilai || '-'}</td>
                                    <td className="px-4 py-2">
                                        <select
                                            value={peserta.status}
                                            onChange={(e) => handleUpdateStatus(
                                                peserta.id,
                                                e.target.value,
                                                e.target.value === 'hadir' ? peserta.nilai : undefined
                                            )}
                                            className="rounded border-gray-300"
                                        >
                                            <option value="terdaftar">Terdaftar</option>
                                            <option value="hadir">Hadir</option>
                                            <option value="tidak_hadir">Tidak Hadir</option>
                                        </select>
                                        {peserta.status === 'hadir' && (
                                            <input
                                                type="number"
                                                value={peserta.nilai || ''}
                                                onChange={(e) => handleUpdateStatus(
                                                    peserta.id,
                                                    'hadir',
                                                    Number(e.target.value)
                                                )}
                                                className="ml-2 w-20 rounded border-gray-300"
                                                placeholder="Nilai"
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 
import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { toast } from 'react-hot-toast';
import VerificationModal from '@/Components/VerificationModal';
import { DocumentIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

interface PersyaratanDokumen {
  id: number;
  nama_dokumen: string;
}

interface Dokumen {
  id: number;
  status: string;
  path: string;
  catatan?: string;
  persyaratan_dokumen: PersyaratanDokumen;
}

interface Pendaftar {
  id: number;
  name: string;
  email: string;
  program_studi: {
    id: number;
    nama: string;
  } | null;
  gelombang: {
    id: number;
    nama_gelombang: string;
  } | null;
  dokumen: Dokumen[];
  pembayaran: {
    id: number;
    jumlah: number;
    bukti_pembayaran: string;
    status: 'pending' | 'verified' | 'rejected';
    catatan?: string;
  };
  status: string;
  status_pendaftaran: string;
  status_pembayaran: string;
  created_at: string;
}

export default function Show({ pendaftar: initialPendaftar }: { pendaftar: Pendaftar }) {
    const [pendaftar, setPendaftar] = useState<Pendaftar>(initialPendaftar);
    const [verifyingDokumen, setVerifyingDokumen] = React.useState<number | null>(null);
    const [verifyingPembayaran, setVerifyingPembayaran] = React.useState<number | null>(null);

    const handleVerifyDokumen = (dokumenId: number, status: string, catatan: string = '') => {
        router.post(route('admin.pendaftar.verifikasi-dokumen', pendaftar.id), {
            dokumen_id: dokumenId,
            status,
            catatan
        }, {
            onSuccess: () => {
                toast.success('Dokumen berhasil diverifikasi');
                setVerifyingDokumen(null);
            },
            onError: () => toast.error('Gagal memverifikasi dokumen')
        });
    };

    const handleVerifyPembayaran = (pembayaranId: number, status: string, catatan: string = '') => {
        router.post(route('admin.pendaftar.verifikasi-pembayaran', pendaftar.id), {
            pembayaran_id: pembayaranId,
            status,
            catatan
        }, {
            onSuccess: () => {
                toast.success('Pembayaran berhasil diverifikasi');
                setVerifyingPembayaran(null);
            },
            onError: () => toast.error('Gagal memverifikasi pembayaran')
        });
    };

    const handleLihatDokumen = (path: string) => {
        console.log('Document path:', path);
        window.open(`/storage/${path}`, '_blank');
    };

    const handleLihatBuktiPembayaran = (buktiPath: string) => {
        console.log('Original buktiPath:', buktiPath);
        
        // Hapus prefix 'pembayaran/' jika ada
        const cleanPath = buktiPath.replace(/^pembayaran\//, '');
        console.log('Clean path:', cleanPath);
        
        const url = `/storage/public/pembayaran/${cleanPath}`;
        console.log('Final URL:', url);
        
        window.open(url, '_blank');
    };

    const handleVerifikasiDokumen = async (dokumenId: number, status: 'verified' | 'rejected') => {
        try {
            await axios.post(`/admin/pendaftar/dokumen/${dokumenId}/verifikasi`, { status });
            // Update state setelah verifikasi berhasil
            setPendaftar((prev: Pendaftar) => ({
                ...prev,
                dokumen: prev.dokumen.map((dok: Dokumen) => 
                    dok.id === dokumenId ? { ...dok, status } : dok
                )
            }));
        } catch (error) {
            console.error('Error verifying document:', error);
        }
    };

    const handleVerifikasiPembayaran = async (pembayaranId: number, status: 'verified' | 'rejected') => {
        try {
            router.post(route('admin.pendaftar.verifikasi-pembayaran', pendaftar.id), {
                pembayaran_id: pembayaranId,
                status: status
            }, {
                onSuccess: () => {
                    setPendaftar(prev => ({
                        ...prev,
                        pembayaran: {
                            ...prev.pembayaran,
                            status: status
                        },
                        status_pembayaran: status,
                        status: status === 'verified' ? 'menunggu_ujian' : prev.status
                    }));
                    toast.success('Pembayaran berhasil diverifikasi');
                },
                onError: () => {
                    toast.error('Gagal memverifikasi pembayaran');
                }
            });
        } catch (error) {
            console.error('Error verifying payment:', error);
            toast.error('Gagal memverifikasi pembayaran');
        }
    };

    return (
        <AdminLayout>
            <Head title={`Detail Pendaftar - ${pendaftar.name}`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Info Pendaftar */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Informasi Pendaftar</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm text-gray-600">Nama Lengkap</label>
                                            <p className="font-medium">{pendaftar.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Email</label>
                                            <p className="font-medium">{pendaftar.email}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Program Studi</label>
                                            <p className="font-medium">{pendaftar.program_studi?.nama || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Status Pendaftaran</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm text-gray-600">Gelombang</label>
                                            <p className="font-medium">{pendaftar.gelombang?.nama_gelombang || '-'}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Status</label>
                                            <StatusBadge status={pendaftar.status_pendaftaran} />
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Tanggal Daftar</label>
                                            <p className="font-medium">{new Date(pendaftar.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dokumen */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Dokumen</h3>
                            <div className="divide-y">
                                {pendaftar.dokumen.map(doc => (
                                    <div key={doc.id} className="py-4 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{doc.persyaratan_dokumen.nama_dokumen}</p>
                                            <div className="mt-1 flex items-center space-x-2">
                                                <StatusBadge status={doc.status} />
                                                {doc.catatan && (
                                                    <p className="text-sm text-gray-500">{doc.catatan}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <button 
                                                onClick={() => handleLihatDokumen(doc.path)}
                                                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                            >
                                                <DocumentIcon className="h-4 w-4 mr-1.5" />
                                                Lihat
                                            </button>
                                            {doc.status === 'pending' && (
                                                <div className="flex space-x-2">
                                                    <button 
                                                        onClick={() => handleVerifikasiDokumen(doc.id, 'verified')}
                                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-800"
                                                    >
                                                        <CheckIcon className="h-4 w-4 mr-1.5" />
                                                        Terima
                                                    </button>
                                                    <button 
                                                        onClick={() => handleVerifikasiDokumen(doc.id, 'rejected')}
                                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800"
                                                    >
                                                        <XMarkIcon className="h-4 w-4 mr-1.5" />
                                                        Tolak
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pembayaran */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Pembayaran</h3>
                            {pendaftar.pembayaran ? (
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <div>
                                            <label className="text-sm text-gray-600">Jumlah Pembayaran</label>
                                            <p className="font-medium">Rp {pendaftar.pembayaran.jumlah.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Status</label>
                                            <div className="flex items-center space-x-2">
                                                <StatusBadge status={pendaftar.pembayaran.status} />
                                                {pendaftar.pembayaran.catatan && (
                                                    <p className="text-sm text-gray-500">{pendaftar.pembayaran.catatan}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button 
                                            onClick={() => handleLihatBuktiPembayaran(pendaftar.pembayaran.bukti_pembayaran)}
                                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                                        >
                                            <DocumentIcon className="h-4 w-4 mr-1.5" />
                                            Lihat Bukti
                                        </button>
                                        {pendaftar.pembayaran.status === 'pending' && (
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleVerifikasiPembayaran(pendaftar.pembayaran.id, 'verified')}
                                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-green-600 hover:text-green-800"
                                                >
                                                    <CheckIcon className="h-4 w-4 mr-1.5" />
                                                    Terima
                                                </button>
                                                <button 
                                                    onClick={() => handleVerifikasiPembayaran(pendaftar.pembayaran.id, 'rejected')}
                                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800"
                                                >
                                                    <XMarkIcon className="h-4 w-4 mr-1.5" />
                                                    Tolak
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>Belum ada pembayaran</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Verifikasi Dokumen */}
            {verifyingDokumen && (
                <VerificationModal
                    isOpen={true}
                    onClose={() => setVerifyingDokumen(null)}
                    onVerify={(status, catatan) => handleVerifyDokumen(verifyingDokumen, status, catatan)}
                    title="Verifikasi Dokumen"
                />
            )}

            {/* Modal Verifikasi Pembayaran */}
            {verifyingPembayaran && (
                <VerificationModal
                    isOpen={true}
                    onClose={() => setVerifyingPembayaran(null)}
                    onVerify={(status, catatan) => handleVerifyPembayaran(verifyingPembayaran, status, catatan)}
                    title="Verifikasi Pembayaran"
                />
            )}
        </AdminLayout>
    );
}

function StatusBadge({ status }: { status: string }) {
    const getColor = () => {
        switch(status) {
            case 'verified':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <span className={`${getColor()} px-2 py-1 text-xs rounded-full font-medium`}>
            {status}
        </span>
    );
} 

import React from 'react';
import PMBLayout from '@/Layouts/PMBLayout';
import { Link } from '@inertiajs/react';

export default function Index() {
    return (
        <PMBLayout title="Penerimaan Mahasiswa Baru">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card Pendaftaran */}
                        <Link href="/pmb/register" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Pendaftaran Online</h5>
                            <p className="font-normal text-gray-700">
                                Daftar sekarang untuk menjadi bagian dari kampus kami.
                            </p>
                        </Link>

                        {/* Card Pengumuman */}
                        <Link href="/pmb/pengumuman" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Pengumuman</h5>
                            <p className="font-normal text-gray-700">
                                Lihat pengumuman dan informasi terkini seputar PMB.
                            </p>
                        </Link>

                        {/* Card Bantuan */}
                        <Link href="/pmb/bantuan" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Bantuan</h5>
                            <p className="font-normal text-gray-700">
                                Punya pertanyaan? Dapatkan bantuan di sini.
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </PMBLayout>
    );
}
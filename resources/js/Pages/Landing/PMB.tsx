import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function PMBLanding() {
    const timelinePMB = [
        {
            gelombang: 'Gelombang 1',
            periode: 'Januari - Februari 2024',
            status: 'active',
            kegiatan: [
                { nama: 'Pendaftaran Online', tanggal: '1 Jan - 28 Feb 2024' },
                { nama: 'Ujian Masuk', tanggal: '3 Maret 2024' },
                { nama: 'Pengumuman', tanggal: '10 Maret 2024' }
            ]
        },
        {
            gelombang: 'Gelombang 2',
            periode: 'Maret - April 2024',
            status: 'upcoming',
            kegiatan: [
                { nama: 'Pendaftaran Online', tanggal: '1 Mar - 30 Apr 2024' },
                { nama: 'Ujian Masuk', tanggal: '5 Mei 2024' },
                { nama: 'Pengumuman', tanggal: '12 Mei 2024' }
            ]
        }
    ];

    const programStudi = [
        {
            nama: 'Teknik Informatika',
            deskripsi: 'Program studi unggulan dengan fokus pada pengembangan software dan teknologi informasi',
            akreditasi: 'A',
            keunggulan: [
                'Kurikulum berbasis industri',
                'Lab komputer modern',
                'Kerjasama dengan perusahaan IT'
            ]
        },
        // ... program studi lainnya
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Penerimaan Mahasiswa Baru 2024
                        </h1>
                        <p className="text-xl md:text-2xl mb-8">
                            Mulai langkah pertama menuju masa depan cerah bersama kami
                        </p>
                        <Link
                            href={route('register')}
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:text-lg"
                        >
                            Daftar Sekarang
                        </Link>
                    </motion.div>
                </div>
                
                {/* Wave SVG */}
                <div className="absolute bottom-0 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#f3f4f6" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            {/* Timeline Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900">
                            Jadwal PMB 2024
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Pilih waktu pendaftaran yang sesuai dengan Anda
                        </p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {timelinePMB.map((gelombang, index) => (
                            <motion.div
                                key={gelombang.gelombang}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                                    <h3 className="text-xl font-bold">{gelombang.gelombang}</h3>
                                    <p className="text-indigo-100">{gelombang.periode}</p>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {gelombang.kegiatan.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center">
                                                <span className="text-gray-900 font-medium">
                                                    {item.nama}
                                                </span>
                                                <span className="text-gray-600">
                                                    {item.tanggal}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Program Studi Section */}
            <section className="py-16 bg-gray-50">
                {/* ... konten program studi ... */}
            </section>

            {/* Biaya Kuliah Section */}
            <section className="py-16">
                {/* ... konten biaya kuliah ... */}
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-indigo-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white"
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            Siap Bergabung dengan Kami?
                        </h2>
                        <p className="text-xl mb-8">
                            Daftar sekarang dan mulai perjalanan akademik Anda
                        </p>
                        <Link
                            href={route('register')}
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:text-lg"
                        >
                            Daftar Sekarang
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
} 
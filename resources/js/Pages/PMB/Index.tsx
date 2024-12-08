import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingLayout from '@/Layouts/LandingLayout';

export default function Index() {
    const [activeTab, setActiveTab] = useState('info');

    const pmbData = {
        info: {
            title: 'Penerimaan Mahasiswa Baru 2024/2025',
            description: 'Universitas Langit Timur membuka pendaftaran mahasiswa baru untuk tahun akademik 2024/2025.',
            highlights: [
                'Program Studi Terakreditasi A',
                'Fasilitas Modern',
                'Beasiswa Prestasi',
                'Kerjasama Industri'
            ]
        },
        timeline: [
            {
                period: 'Januari - Maret 2024',
                events: [
                    'Pendaftaran Jalur Prestasi',
                    'Seleksi Berkas',
                    'Pengumuman Hasil'
                ]
            },
            {
                period: 'April - Juni 2024',
                events: [
                    'Pendaftaran Gelombang 1',
                    'Tes Seleksi',
                    'Pengumuman'
                ]
            },
            {
                period: 'Juli - Agustus 2024',
                events: [
                    'Pendaftaran Gelombang 2',
                    'Tes Seleksi',
                    'Pengumuman Final'
                ]
            }
        ],
        jalurMasuk: [
            {
                name: 'Jalur Prestasi',
                description: 'Untuk calon mahasiswa dengan prestasi akademik/non-akademik',
                benefits: ['Beasiswa 50%', 'Prioritas Pemilihan Kelas'],
                requirements: ['Nilai Rapor ≥ 8.0', 'Sertifikat Prestasi']
            },
            {
                name: 'Jalur Reguler',
                description: 'Jalur umum melalui tes seleksi',
                benefits: ['Beasiswa berdasarkan hasil tes', 'Program orientasi lengkap'],
                requirements: ['Lulus SMA/SMK/MA', 'Lulus Tes Seleksi']
            }
        ],
        biaya: {
            pendaftaran: 'Rp 300.000',
            daftarUlang: 'Rp 5.000.000',
            spp: [
                { prodi: 'Teknik Informatika', biaya: 'Rp 8.500.000/semester' },
                { prodi: 'Sistem Informasi', biaya: 'Rp 8.000.000/semester' },
                { prodi: 'Manajemen Informatika', biaya: 'Rp 7.500.000/semester' },
                { prodi: 'Komputerisasi Akuntansi', biaya: 'Rp 7.500.000/semester' }
            ]
        },
        beasiswa: [
            {
                name: 'Beasiswa Prestasi',
                coverage: 'Hingga 100% SPP',
                criteria: ['Nilai UN/Rapor ≥ 9.0', 'Prestasi Nasional/Internasional']
            },
            {
                name: 'Beasiswa KIP Kuliah',
                coverage: '100% Biaya Kuliah',
                criteria: ['Peserta KIP', 'Lulus Seleksi']
            }
        ],
        faq: [
            {
                question: 'Bagaimana cara mendaftar?',
                answer: 'Pendaftaran dapat dilakukan secara online melalui website PMB atau langsung ke kampus.'
            },
            {
                question: 'Apa saja syarat pendaftaran?',
                answer: 'Syarat utama meliputi: Ijazah/SKL, rapor, KTP, Kartu Keluarga, dan pas foto terbaru.'
            },
            {
                question: 'Kapan pengumuman hasil seleksi?',
                answer: 'Pengumuman akan disampaikan maksimal 1 minggu setelah tes seleksi.'
            }
        ]
    };

    return (
        <LandingLayout>
            <Head title="PMB - Universitas Langit Timur" />

            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/pmb/hero-bg.jpg"
                        alt="PMB Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
                </div>
                <div className="text-center">
                    <motion.h1>
                        Penerimaan Mahasiswa Baru
                        <br />
                        <span>2024/2025</span>
                    </motion.h1>
                    <motion.p>
                        Wujudkan mimpimu menjadi profesional IT bersama kami
                    </motion.p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="sticky top-16 z-10 bg-white dark:bg-gray-900 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto py-4 space-x-4">
                        {[
                            { id: 'info', name: 'Informasi', icon: 'ℹ️' },
                            { id: 'timeline', name: 'Timeline', icon: '📅' },
                            { id: 'jalur', name: 'Jalur Masuk', icon: '🎓' },
                            { id: 'biaya', name: 'Biaya', icon: '💰' },
                            { id: 'beasiswa', name: 'Beasiswa', icon: '🏆' },
                            { id: 'faq', name: 'FAQ', icon: '❓' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                    activeTab === tab.id
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="py-12 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode='wait'>
                        {/* Informasi Section */}
                        {activeTab === 'info' && (
                            <motion.div
                                key="info"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid gap-8"
                            >
                                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        {pmbData.info.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        {pmbData.info.description}
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {pmbData.info.highlights.map((highlight, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
                                            >
                                                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Timeline Section */}
                        {activeTab === 'timeline' && (
                            <motion.div
                                key="timeline"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
                            >
                                <div className="space-y-8">
                                    {pmbData.timeline.map((item, index) => (
                                        <div key={index} className="relative pl-8">
                                            <div className="absolute left-0 top-0 h-full w-0.5 bg-indigo-200 dark:bg-indigo-900"></div>
                                            <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600"></div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                {item.period}
                                            </h3>
                                            <ul className="space-y-2">
                                                {item.events.map((event, eventIndex) => (
                                                    <li
                                                        key={eventIndex}
                                                        className="text-gray-600 dark:text-gray-300"
                                                    >
                                                        {event}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Jalur Masuk Section */}
                        {activeTab === 'jalur' && (
                            <motion.div
                                key="jalur"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {pmbData.jalurMasuk.map((jalur, index) => (
                                    <div
                                        key={jalur.name}
                                        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
                                    >
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                            {jalur.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                                            {jalur.description}
                                        </p>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                    Keuntungan:
                                                </h4>
                                                <ul className="space-y-2">
                                                    {jalur.benefits.map((benefit, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center text-gray-600 dark:text-gray-300"
                                                        >
                                                            <svg className="w-4 h-4 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            {benefit}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                    Persyaratan:
                                                </h4>
                                                <ul className="space-y-2">
                                                    {jalur.requirements.map((req, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center text-gray-600 dark:text-gray-300"
                                                        >
                                                            <svg className="w-4 h-4 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {req}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* Biaya Section */}
                        {activeTab === 'biaya' && (
                            <motion.div
                                key="biaya"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                            Biaya Pendaftaran
                                        </h3>
                                        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                            {pmbData.biaya.pendaftaran}
                                        </p>
                                    </div>
                                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                            Biaya Daftar Ulang
                                        </h3>
                                        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                            {pmbData.biaya.daftarUlang}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                        Biaya SPP per Program Studi
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {pmbData.biaya.spp.map((item) => (
                                            <div
                                                key={item.prodi}
                                                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl"
                                            >
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                    {item.prodi}
                                                </h4>
                                                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                                    {item.biaya}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Beasiswa Section */}
                        {activeTab === 'beasiswa' && (
                            <motion.div
                                key="beasiswa"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {pmbData.beasiswa.map((beasiswa, index) => (
                                    <div
                                        key={beasiswa.name}
                                        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
                                    >
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {beasiswa.name}
                                        </h3>
                                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
                                            {beasiswa.coverage}
                                        </p>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                Kriteria:
                                            </h4>
                                            <ul className="space-y-2">
                                                {beasiswa.criteria.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center text-gray-600 dark:text-gray-300"
                                                    >
                                                        <svg className="w-4 h-4 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* FAQ Section */}
                        {activeTab === 'faq' && (
                            <motion.div
                                key="faq"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
                            >
                                <div className="space-y-6">
                                    {pmbData.faq.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                {item.question}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {item.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-white mb-8"
                    >
                        Siap Bergabung dengan Kami?
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
                    >
                        <a
                            href="/contact"
                            className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors duration-300"
                        >
                            Hubungi Kami
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </div>
        </LandingLayout>
    );
}
import React, { useState, useEffect } from 'react';
import PMBLayout from '@/Layouts/PMBLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const cards = [
        {
            title: 'Daftar PMB',
            description: 'Mulai pendaftaran mahasiswa baru Anda di sini',
            href: '/pmb/register',
            icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
            color: 'from-indigo-500 to-purple-600'
        },
        {
            title: 'Status Pendaftaran',
            description: 'Pantau proses pendaftaran Anda',
            href: '/pmb/status',
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
            color: 'from-emerald-500 to-teal-600'
        },
        {
            title: 'Upload Dokumen',
            description: 'Unggah dokumen persyaratan PMB',
            href: '/pmb/documents',
            icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
            color: 'from-orange-500 to-red-600'
        },
        {
            title: 'Pembayaran',
            description: 'Informasi dan konfirmasi pembayaran',
            href: '/pmb/payment',
            icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            title: 'Jadwal Ujian',
            description: 'Informasi jadwal dan lokasi ujian',
            href: '/pmb/exam',
            icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
            color: 'from-purple-500 to-pink-600'
        },
        {
            title: 'Pengumuman',
            description: 'Lihat pengumuman kelulusan',
            href: '/pmb/announcement',
            icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
            color: 'from-yellow-500 to-amber-600'
        },
    ];

    return (
        <PMBLayout title="Dashboard PMB">
            {/* Mengubah padding untuk mobile */}
            <div className="py-6 sm:py-12 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 overflow-hidden relative"
                    >
                        {/* Menyesuaikan jam digital untuk mobile */}
                        <div className="absolute top-0 right-0 p-4 sm:p-6 text-gray-400 text-sm sm:text-base">
                            {currentTime.toLocaleTimeString()}
                        </div>
                        
                        {/* Menyesuaikan header untuk mobile */}
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 mt-2 sm:mt-0">
                            Selamat Datang di Portal PMB
                        </h2>
                        
                        {/* Grid cards dengan spacing yang lebih baik untuk mobile */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {cards.map((card, index) => (
                                <motion.div
                                    key={card.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Link 
                                        href={card.href}
                                        className={`block p-4 sm:p-6 bg-gradient-to-br ${card.color} rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 sm:hover:scale-105 group overflow-hidden relative`}
                                    >
                                        {/* Menyesuaikan ukuran dekorasi untuk mobile */}
                                        <div className="absolute -right-8 -bottom-8 sm:-right-10 sm:-bottom-10 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full transform rotate-45 group-hover:scale-150 transition-transform duration-500"></div>
                                        
                                        {/* Menyesuaikan ukuran ikon untuk mobile */}
                                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 bg-white/20 rounded-lg sm:rounded-xl group-hover:bg-white/30 transition-colors duration-300">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon} />
                                            </svg>
                                        </div>
                                        
                                        {/* Menyesuaikan ukuran teks untuk mobile */}
                                        <h5 className="mb-1 sm:mb-2 text-lg sm:text-xl font-bold text-white">
                                            {card.title}
                                        </h5>
                                        <p className="text-sm sm:text-base text-white/80 group-hover:text-white transition-colors duration-300">
                                            {card.description}
                                        </p>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Informasi Penting dengan spacing yang lebih baik untuk mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl sm:rounded-2xl shadow-inner"
                        >
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                Informasi Penting
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {/* Item Informasi dengan ukuran yang disesuaikan */}
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center">
                                            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm sm:text-base font-semibold text-gray-900">Batas Akhir Pendaftaran</h4>
                                        <p className="text-xs sm:text-sm text-gray-600">30 April 2024 pukul 23:59 WIB</p>
                                    </div>
                                </div>
                                {/* ... item informasi lainnya ... */}
                            </div>
                        </motion.div>

                        {/* Kontak Bantuan dengan spacing yang lebih baik untuk mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl sm:rounded-2xl shadow-inner"
                        >
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                Butuh Bantuan?
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <a href="tel:+6281234567890" className="flex items-center space-x-3 text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm sm:text-base font-medium">0812-3456-7890</span>
                                </a>
                                <a href="mailto:pmb@kampus.ac.id" className="flex items-center space-x-3 text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm sm:text-base font-medium">pmb@kampus.ac.id</span>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </PMBLayout>
    );
}
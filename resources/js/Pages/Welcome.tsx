import React from 'react';
import { Link } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';

export default function Welcome() {
    const facilities = [
        {
            icon: '🖥️',
            name: 'Lab Komputer',
            description: 'Dilengkapi komputer terbaru dan software industri'
        },
        {
            icon: '📚',
            name: 'Perpustakaan Digital',
            description: 'Akses ke ribuan buku dan jurnal online'
        },
        {
            icon: '📡',
            name: 'WiFi Kampus',
            description: 'Koneksi internet cepat di seluruh area kampus'
        }
    ];

    const achievements = [
        {
            number: 'A',
            title: 'Akreditasi',
            description: 'Terakreditasi BAN-PT'
        },
        {
            number: '100+',
            title: 'Kerjasama Industri',
            description: 'Partner perusahaan nasional & internasional'
        },
        {
            number: '90%',
            title: 'Alumni Bekerja',
            description: 'Tingkat penyerapan kerja tinggi'
        }
    ];

    return (
        <LandingLayout>
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90"></div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Selamat Datang di Kampus Kami
                    </h1>
                    <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
                        Membangun masa depan cemerlang melalui pendidikan berkualitas
                    </p>
                    <div className="mt-10 flex space-x-4">
                        <Link
                            href="/login"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-300"
                        >
                            Daftar Sekarang
                        </Link>
                        <a
                            href="#facilities"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition-colors duration-300"
                        >
                            Pelajari Lebih Lanjut
                        </a>
                    </div>
                </div>
                        </div>

            {/* Fasilitas Section */}
            <div id="facilities" className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Fasilitas Kampus</h2>
                        <p className="mt-4 text-xl text-gray-500">
                            Fasilitas modern untuk mendukung kegiatan belajar mengajar
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {facilities.map((facility, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="p-8">
                                    <div className="text-center text-4xl mb-4">{facility.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 text-center">{facility.name}</h3>
                                    <p className="mt-4 text-gray-500 text-center">{facility.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Prestasi Kampus</h2>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white transform transition-all duration-300 hover:scale-105">
                                <div className="text-4xl font-bold mb-2">{achievement.number}</div>
                                <div className="text-xl font-semibold mb-2">{achievement.title}</div>
                                <div className="text-indigo-100">{achievement.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Siap untuk bergabung?</span>
                        <span className="block text-indigo-200">Daftar sekarang dan wujudkan mimpimu.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <Link
                            href="/pmb/register"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
                        >
                            Daftar PMB
                        </Link>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
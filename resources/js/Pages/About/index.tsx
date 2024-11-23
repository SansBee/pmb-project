import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LandingLayout from '@/Layouts/LandingLayout';

export default function About() {
    const aboutData = {
        vision: 'Menjadi universitas terkemuka yang menghasilkan lulusan berkualitas dan berdaya saing global di bidang teknologi informasi dan komputerisasi.',
        mission: [
            'Menyelenggarakan pendidikan berkualitas yang berfokus pada teknologi informasi',
            'Melakukan penelitian dan pengembangan di bidang teknologi terkini',
            'Melaksanakan pengabdian masyarakat berbasis teknologi',
            'Menjalin kerjasama dengan industri dan institusi pendidikan global'
        ],
        history: {
            title: 'Sejarah Kampus',
            content: 'Didirikan pada tahun 2010, Universitas Langit Timur telah berkembang menjadi salah satu institusi pendidikan tinggi terkemuka di bidang teknologi informasi. Bermula dari sebuah akademi komputer, kini telah berkembang menjadi universitas dengan berbagai program studi unggulan.',
            milestones: [
                {
                    year: '2010',
                    event: 'Pendirian kampus dengan 2 program studi'
                },
                {
                    year: '2015',
                    event: 'Akreditasi A untuk semua program studi'
                },
                {
                    year: '2018',
                    event: 'Pembukaan program studi baru dan perluasan kampus'
                },
                {
                    year: '2020',
                    event: 'Pencapaian status sebagai Cyber University'
                }
            ]
        },
        achievements: [
            {
                title: 'Kampus Digital Terbaik',
                year: '2023',
                organizer: 'Kemenristekdikti',
                icon: '🏆'
            },
            {
                title: 'Penelitian Terbaik',
                year: '2022',
                organizer: 'LLDIKTI',
                icon: '🎯'
            },
            {
                title: 'Inovasi Teknologi',
                year: '2023',
                organizer: 'IEEE Indonesia',
                icon: '💡'
            }
        ],
        leadership: [
            {
                name: 'Prof. Dr. Budi Santoso',
                position: 'Rektor',
                image: '/images/leadership/rektor.jpg',
                quote: 'Komitmen kami adalah menghasilkan lulusan yang siap menghadapi era digital'
            },
            {
                name: 'Dr. Sarah Wijaya',
                position: 'Wakil Rektor Akademik',
                image: '/images/leadership/warek1.jpg',
                quote: 'Inovasi dan kualitas adalah kunci keberhasilan pendidikan'
            },
            {
                name: 'Dr. Ahmad Rahman',
                position: 'Wakil Rektor Kemahasiswaan',
                image: '/images/leadership/warek2.jpg',
                quote: 'Pengembangan soft skill mahasiswa adalah prioritas kami'
            }
        ],
        values: [
            {
                title: 'Inovasi',
                description: 'Selalu mengembangkan ide dan solusi baru',
                icon: '💡'
            },
            {
                title: 'Integritas',
                description: 'Menjunjung tinggi kejujuran dan etika',
                icon: '🎯'
            },
            {
                title: 'Kolaborasi',
                description: 'Bekerja sama untuk hasil yang lebih baik',
                icon: '🤝'
            },
            {
                title: 'Keunggulan',
                description: 'Berkomitmen pada kualitas terbaik',
                icon: '⭐'
            }
        ]
    };

    return (
        <LandingLayout>
            <Head title="Tentang Kami - Universitas Langit Timur" />

            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/about/hero-bg.jpg"
                        alt="Campus"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
                </div>
                <div className="relative h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
                        >
                            Tentang Kami
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto"
                        >
                            Membangun Generasi Digital untuk Masa Depan
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Vision & Mission Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Visi
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                {aboutData.vision}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Misi
                            </h2>
                            <ul className="space-y-4">
                                {aboutData.mission.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start text-gray-600 dark:text-gray-300"
                                    >
                                        <svg className="w-5 h-5 text-indigo-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {aboutData.history.title}
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            {aboutData.history.content}
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {aboutData.history.milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.year}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg"
                            >
                                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                    {milestone.year}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {milestone.event}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Pimpinan Universitas
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {aboutData.leadership.map((leader, index) => (
                            <motion.div
                                key={leader.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                            >
                                <div className="aspect-w-3 aspect-h-4">
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                        {leader.name}
                                    </h3>
                                    <p className="text-indigo-600 dark:text-indigo-400 mb-4">
                                        {leader.position}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 italic">
                                        "{leader.quote}"
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Nilai-Nilai Kami
                    </motion.h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {aboutData.values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Pencapaian Terbaru
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {aboutData.achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl"
                            >
                                <div className="text-4xl mb-4">{achievement.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {achievement.title}
                                </h3>
                                <p className="text-indigo-600 dark:text-indigo-400">
                                    {achievement.year}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {achievement.organizer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
} 
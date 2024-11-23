import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import LandingLayout from '@/Layouts/LandingLayout';
import Header from '@/Components/Prodi/Header';

export default function TeknikInformatika() {
    const prodiData = {
        name: 'Teknik Informatika',
        description: 'Membentuk ahli teknologi informasi yang inovatif, adaptif, dan siap menghadapi era digital',
        image: '/images/prodi/ti-hero.jpg',
        stats: [
            { label: 'Akreditasi', value: 'A', icon: '🏆' },
            { label: 'Mahasiswa Aktif', value: '500+', icon: '👨‍🎓' },
            { label: 'Dosen', value: '20+', icon: '👨‍🏫' },
            { label: 'Partner Industri', value: '50+', icon: '🤝' }
        ],
        highlights: [
            {
                title: 'Program Unggulan',
                items: [
                    'AI & Machine Learning Track',
                    'Full-Stack Development',
                    'Cloud Computing',
                    'Mobile App Development',
                    'Cyber Security'
                ]
            },
            {
                title: 'Sertifikasi',
                items: [
                    'AWS Certified Solutions Architect',
                    'Google Associate Android Developer',
                    'Oracle Certified Professional',
                    'CompTIA Security+',
                    'Microsoft Azure Developer'
                ]
            }
        ],
        facilities: [
            {
                name: 'AI & Machine Learning Lab',
                description: 'Lab khusus untuk pengembangan AI dan machine learning dengan GPU server terbaru',
                icon: '🤖'
            },
            {
                name: 'Innovation Hub',
                description: 'Ruang kolaborasi untuk pengembangan startup dan proyek inovatif',
                icon: '💡'
            },
            {
                name: 'Cloud Computing Center',
                description: 'Pusat pembelajaran cloud computing dengan akses ke berbagai platform',
                icon: '☁️'
            },
            {
                name: 'Cyber Security Lab',
                description: 'Laboratorium keamanan siber dengan peralatan forensik digital',
                icon: '🔒'
            }
        ],
        testimonials: [
            {
                name: 'Ahmad Rizki',
                role: 'Software Engineer at Google',
                image: '/images/testimonials/1.jpg',
                quote: 'Kurikulum yang up-to-date dan dosen yang berpengalaman sangat membantu karir saya di industri teknologi.'
            },
            {
                name: 'Sarah Putri',
                role: 'AI Engineer at Microsoft',
                image: '/images/testimonials/2.jpg',
                quote: 'Program AI & Machine Learning track memberi saya fondasi kuat untuk berkarir di bidang AI.'
            }
        ],
        researchGroups: [
            {
                name: 'Artificial Intelligence Research Group',
                projects: ['Computer Vision', 'Natural Language Processing', 'Robotics'],
                publications: 15
            },
            {
                name: 'Cyber Security Research Group',
                projects: ['Network Security', 'Cryptography', 'Digital Forensics'],
                publications: 12
            },
            {
                name: 'Software Engineering Research Group',
                projects: ['Software Architecture', 'DevOps', 'Agile Methodology'],
                publications: 18
            }
        ]
    };

    return (
        <LandingLayout>
            <Head title="Teknik Informatika - Universitas Langit Timur" />
            
            {/* Hero Section dengan Parallax Effect */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-screen"
            >
                <div className="absolute inset-0">
                    <img
                        src={prodiData.image}
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
                </div>
                <div className="relative h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
                        >
                            Program Studi<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Teknik Informatika
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
                        >
                            {prodiData.description}
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <a
                                href="#learn-more"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Pelajari Lebih Lanjut
                                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Stats dengan Animasi Counter */}
            <div className="bg-white dark:bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {prodiData.stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="text-4xl mb-3">{stat.icon}</div>
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Program Unggulan dengan Card Hover Effect */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12">
                        {prodiData.highlights.map((highlight, index) => (
                            <motion.div
                                key={highlight.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    {highlight.title}
                                </h3>
                                <ul className="space-y-4">
                                    {highlight.items.map((item, itemIndex) => (
                                        <motion.li
                                            key={item}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: itemIndex * 0.1 }}
                                            className="flex items-center text-gray-600 dark:text-gray-300"
                                        >
                                            <svg className="w-5 h-5 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fasilitas dengan Hover Card */}
            <div className="bg-white dark:bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Fasilitas Modern
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {prodiData.facilities.map((facility, index) => (
                            <motion.div
                                key={facility.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                            >
                                <div className="text-4xl mb-4">{facility.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                    {facility.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {facility.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Research Groups dengan Timeline */}
            <div className="bg-gray-50 dark:bg-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Grup Riset
                    </motion.h2>
                    <div className="space-y-12">
                        {prodiData.researchGroups.map((group, index) => (
                            <motion.div
                                key={group.name}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                            {group.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {group.projects.map((project) => (
                                                <span
                                                    key={project}
                                                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full text-sm"
                                                >
                                                    {project}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                            {group.publications}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Publikasi
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials dengan Card Carousel */}
            <div className="bg-white dark:bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    >
                        Testimoni Alumni
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {prodiData.testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg"
                            >
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-indigo-600 dark:text-indigo-400">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 italic">
                                    "{testimonial.quote}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
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
                        Siap Bergabung dengan Teknik Informatika?
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <a
                            href="/pmb"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition-colors duration-300"
                        >
                            Daftar Sekarang
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </div>
        </LandingLayout>
    );
} 
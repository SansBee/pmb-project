import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingLayout from '@/Layouts/LandingLayout';

export default function Facilities() {
    const [activeTab, setActiveTab] = useState('academic');

    const facilities = {
        academic: [
            {
                name: 'Smart Classroom',
                description: 'Ruang kelas modern dengan teknologi pembelajaran terkini',
                image: '/images/facilities/classroom.jpg',
                features: [
                    'Interactive Smart Board',
                    'High-Speed Internet',
                    'Multimedia System',
                    'Ergonomic Furniture'
                ],
                icon: '🎓'
            },
            {
                name: 'Digital Library',
                description: 'Perpustakaan modern dengan akses ke ribuan sumber digital',
                image: '/images/facilities/library.jpg',
                features: [
                    'E-Books Collection',
                    'Online Journals',
                    'Digital Archives',
                    'Study Pods'
                ],
                icon: '📚'
            },
            {
                name: 'Research Center',
                description: 'Pusat penelitian dengan peralatan modern',
                image: '/images/facilities/research.jpg',
                features: [
                    'Research Labs',
                    'Collaboration Space',
                    'Data Center',
                    'Conference Room'
                ],
                icon: '🔬'
            }
        ],
        laboratory: [
            {
                name: 'Computer Lab',
                description: 'Lab komputer dengan spesifikasi tinggi',
                image: '/images/facilities/computer-lab.jpg',
                features: [
                    'High-End Workstations',
                    'Development Tools',
                    'Design Software',
                    'VR Equipment'
                ],
                icon: '💻'
            },
            {
                name: 'Networking Lab',
                description: 'Fasilitas praktikum jaringan komputer',
                image: '/images/facilities/network-lab.jpg',
                features: [
                    'Cisco Equipment',
                    'Server Room',
                    'Security Tools',
                    'IoT Devices'
                ],
                icon: '🌐'
            },
            {
                name: 'Innovation Lab',
                description: 'Lab untuk pengembangan inovasi teknologi',
                image: '/images/facilities/innovation-lab.jpg',
                features: [
                    '3D Printers',
                    'Robotics Kit',
                    'AI Tools',
                    'Project Space'
                ],
                icon: '🚀'
            }
        ],
        student: [
            {
                name: 'Student Center',
                description: 'Pusat kegiatan dan kreativitas mahasiswa',
                image: '/images/facilities/student-center.jpg',
                features: [
                    'Co-working Space',
                    'Meeting Rooms',
                    'Event Hall',
                    'Creative Studio'
                ],
                icon: '👥'
            },
            {
                name: 'Sports Complex',
                description: 'Fasilitas olahraga lengkap',
                image: '/images/facilities/sports.jpg',
                features: [
                    'Indoor Court',
                    'Fitness Center',
                    'Swimming Pool',
                    'Futsal Field'
                ],
                icon: '⚽'
            },
            {
                name: 'Student Lounge',
                description: 'Area santai dan diskusi mahasiswa',
                image: '/images/facilities/lounge.jpg',
                features: [
                    'Cafe Area',
                    'Discussion Pods',
                    'Gaming Zone',
                    'Relaxation Space'
                ],
                icon: '☕'
            }
        ],
        support: [
            {
                name: 'Health Center',
                description: 'Fasilitas kesehatan untuk civitas akademika',
                image: '/images/facilities/health.jpg',
                features: [
                    'Medical Services',
                    'Counseling',
                    'Emergency Care',
                    'Pharmacy'
                ],
                icon: '🏥'
            },
            {
                name: 'Career Development Center',
                description: 'Pusat pengembangan karir mahasiswa',
                image: '/images/facilities/career.jpg',
                features: [
                    'Career Counseling',
                    'Industry Network',
                    'Job Portal',
                    'Training Center'
                ],
                icon: '💼'
            },
            {
                name: 'International Office',
                description: 'Pusat layanan internasional',
                image: '/images/facilities/international.jpg',
                features: [
                    'Exchange Programs',
                    'Global Network',
                    'Visa Services',
                    'Cultural Events'
                ],
                icon: '🌏'
            }
        ]
    };

    const tabs = [
        { id: 'academic', name: 'Akademik', icon: '🎓' },
        { id: 'laboratory', name: 'Laboratorium', icon: '🔬' },
        { id: 'student', name: 'Mahasiswa', icon: '👥' },
        { id: 'support', name: 'Pendukung', icon: '🏢' }
    ];

    return (
        <LandingLayout>
            <Head title="Fasilitas - Universitas Langit Timur" />

            {/* Hero Section with Parallax */}
            <div className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/facilities/hero-bg.jpg"
                        alt="Campus Facilities"
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
                            Fasilitas Kampus
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-3xl mx-auto"
                        >
                            Fasilitas modern dan lengkap untuk mendukung kegiatan akademik dan pengembangan mahasiswa
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="sticky top-16 z-10 bg-white dark:bg-gray-900 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto py-4 space-x-4">
                        {tabs.map((tab) => (
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

            {/* Facilities Grid */}
            <div className="py-12 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatePresence mode='wait'>
                            <motion.div
                            key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {facilities[activeTab as keyof typeof facilities].map((facility, index) => (
                            <motion.div
                                key={facility.name}
                                initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                    className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                    <div className="relative h-48 overflow-hidden">
                                <img
                                    src={facility.image}
                                    alt={facility.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <div className="text-3xl mb-1">{facility.icon}</div>
                                            <h3 className="text-xl font-bold">{facility.name}</h3>
                                        </div>
                                    </div>
                                <div className="p-6">
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {facility.description}
                                    </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {facility.features.map((feature) => (
                                            <div
                                                key={feature}
                                                    className="bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2 rounded-lg text-sm text-indigo-600 dark:text-indigo-400"
                                            >
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                            </motion.div>
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
                        Ingin Melihat Fasilitas Kami Secara Langsung?
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <a
                            href="/contact"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition-colors duration-300"
                        >
                            Jadwalkan Kunjungan
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
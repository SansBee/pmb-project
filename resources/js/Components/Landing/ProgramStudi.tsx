import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function ProgramStudi() {
    const programs = [
        {
            name: 'Teknik Informatika',
            description: 'Program studi yang fokus pada pengembangan software, artificial intelligence, dan teknologi informasi',
            icon: '💻',
            href: '/prodi/ti',
            features: ['Software Development', 'Artificial Intelligence', 'Cloud Computing']
        },
        {
            name: 'Sistem Informasi',
            description: 'Mempelajari analisis, perancangan dan implementasi sistem informasi untuk kebutuhan bisnis',
            icon: '🔍',
            href: '/prodi/si',
            features: ['Business Analysis', 'Database Management', 'System Design']
        },
        {
            name: 'Manajemen Informatika',
            description: 'Mempersiapkan profesional IT yang mampu mengelola sistem informasi dan teknologi dalam organisasi',
            icon: '🖥️',
            href: '/prodi/mi',
            features: ['IT Management', 'Network Administration', 'Digital Business']
        },
        {
            name: 'Komputerisasi Akuntansi',
            description: 'Mengintegrasikan ilmu akuntansi dengan teknologi informasi untuk pengelolaan keuangan modern',
            icon: '📊',
            href: '/prodi/ka',
            features: ['Financial Software', 'Digital Accounting', 'Business Intelligence']
        }
    ];

    return (
        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur-xl group-hover:blur"></div>
                    <Link href={program.href}>
                        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 transition-all duration-300 hover:-translate-y-2">
                            {/* Icon Container */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                                    {program.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="mt-8 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {program.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    {program.description}
                                </p>

                                {/* Features List */}
                                <div className="space-y-3">
                                    {program.features.map((feature, idx) => (
                                        <div 
                                            key={idx}
                                            className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300"
                                        >
                                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                {/* Action Button */}
                                <div className="mt-8">
                                    <span className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300">
                                        Pelajari Lebih Lanjut
                                        <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
} 
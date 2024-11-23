import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AcademicCalendar() {
    const [selectedMonth, setSelectedMonth] = useState('Juni 2024');
    
    const events = {
        'Juni 2024': [
            {
                date: '1 Juni 2024',
                title: 'Pembukaan PMB',
                description: 'Pendaftaran mahasiswa baru gelombang pertama dimulai',
                time: '08:00 WIB',
                location: 'Online & Kampus',
                type: 'pmb',
                link: '/pmb/register'
            },
            {
                date: '15 Juni 2024',
                title: 'Info Session Program Studi',
                description: 'Pengenalan program studi untuk calon mahasiswa',
                time: '13:00 WIB',
                location: 'Aula Utama',
                type: 'seminar',
                link: '/events/info-session'
            }
        ],
        'Juli 2024': [
            {
                date: '5 Juli 2024',
                title: 'Tes Seleksi',
                description: 'Pelaksanaan ujian masuk dan wawancara',
                time: '07:30 WIB',
                location: 'Gedung A & B',
                type: 'test',
                link: '/pmb/test-schedule'
            }
        ],
        'Agustus 2024': [
            {
                date: '20 Agustus 2024',
                title: 'Orientasi Mahasiswa',
                description: 'Program pengenalan kampus untuk mahasiswa baru',
                time: '08:00 WIB',
                location: 'Kampus',
                type: 'orientation',
                link: '/student/orientation'
            }
        ],
        'September 2024': [
            {
                date: '4 September 2024',
                title: 'Awal Perkuliahan',
                description: 'Dimulainya kegiatan akademik semester ganjil',
                time: '07:00 WIB',
                location: 'Seluruh Kampus',
                type: 'academic',
                link: '/academic/schedule'
            }
        ]
    };

    const months = Object.keys(events);

    const getEventTypeStyle = (type: string) => {
        const styles = {
            pmb: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            seminar: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            test: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            orientation: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            academic: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };
        return styles[type as keyof typeof styles] || styles.academic;
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-800 py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Kalender Akademik
                    </h2>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                        Jadwal kegiatan penting tahun akademik 2024/2025
                    </p>
                </div>

                {/* Month Selector */}
                <div className="flex justify-center space-x-4 mb-8">
                    {months.map((month) => (
                        <motion.button
                            key={month}
                            onClick={() => setSelectedMonth(month)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                selectedMonth === month
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-600'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {month}
                        </motion.button>
                    ))}
                </div>

                {/* Events Display */}
                <motion.div
                    key={selectedMonth}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    {events[selectedMonth as keyof typeof events].map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeStyle(event.type)}`}>
                                        {event.date}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">{event.time}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {event.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {event.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        📍 {event.location}
                                    </span>
                                    <motion.a
                                        href={event.link}
                                        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                                        whileHover={{ x: 5 }}
                                    >
                                        Detail Event
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
} 
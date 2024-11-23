import { motion } from 'framer-motion';

export default function Features() {
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

    return (
        <div id="facilities" className="bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Fasilitas Kampus
                    </h2>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                        Fasilitas modern untuk mendukung kegiatan belajar mengajar
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {facilities.map((facility, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500" />
                            <div className="p-6">
                                <div className="text-3xl mb-4">{facility.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {facility.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {facility.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

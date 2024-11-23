import { useState } from 'react';
import { motion } from 'framer-motion';

export default function News() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const news = [
        {
            title: 'Penerimaan Mahasiswa Baru 2024',
            category: 'pmb',
            date: '2024-03-15',
            image: '/images/news/pmb.jpg',
            excerpt: 'Pendaftaran mahasiswa baru tahun akademik 2024/2025 telah dibuka.'
        },
        {
            title: 'Prestasi Mahasiswa di Kompetisi Nasional',
            category: 'prestasi',
            date: '2024-03-10',
            image: '/images/news/prestasi.jpg',
            excerpt: 'Tim mahasiswa meraih juara dalam kompetisi programming nasional.'
        }
    ];

    const categories = [
        { id: 'all', name: 'Semua' },
        { id: 'pmb', name: 'PMB' },
        { id: 'prestasi', name: 'Prestasi' },
        { id: 'akademik', name: 'Akademik' }
    ];

    return (
        <div className="bg-white dark:bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Berita & Event
                    </h2>
                    <div className="mt-6 flex justify-center space-x-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                    selectedCategory === category.id
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news
                        .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
                        .map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">
                                        {item.date}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {item.excerpt}
                                    </p>
                                    <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500">
                                        Baca selengkapnya →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </div>
        </div>
    );
} 
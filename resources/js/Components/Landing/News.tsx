import { useState } from 'react';
import { motion } from 'framer-motion';

interface Berita {
    title: string;
    category: string;
    date: string;
    image: string;
    excerpt: string;
}

interface Props {
    berita: Berita[];
    kategori_berita: Record<string, string>;
}

export default function News({ berita = [], kategori_berita = {} }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';
    
    const categories = [
        { id: 'all', name: 'Semua' },
        ...Object.entries(kategori_berita || {}).map(([id, name]) => ({ id, name }))
    ];

    return (
        <div className="bg-white dark:bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Berita & Event
                    </h2>
                    <div className="mt-6 flex justify-center space-x-4 flex-wrap gap-y-2">
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
                    {berita.length > 0 ? (
                        berita
                            .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
                            .map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group"
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        <img 
                                            src={item.image || PLACEHOLDER_IMAGE}
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src = PLACEHOLDER_IMAGE;
                                            }}
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-indigo-600 dark:text-indigo-400">
                                                {item.date}
                                            </span>
                                            <span className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                            {item.excerpt}
                                        </p>
                                        <button className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 inline-flex items-center group">
                                            Baca selengkapnya 
                                            <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                    ) : (
                        <div className="col-span-3 text-center text-gray-500 py-12">
                            Belum ada berita
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 
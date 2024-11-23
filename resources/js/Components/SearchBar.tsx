import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const searchRef = useRef<HTMLDivElement>(null);

    const searchResults = [
        {
            category: 'Program Studi',
            items: [
                { title: 'Teknik Informatika', href: '/prodi/ti' },
                { title: 'Sistem Informasi', href: '/prodi/si' }
            ]
        },
        {
            category: 'Berita',
            items: [
                { title: 'Info PMB 2024', href: '/news/pmb-2024' },
                { title: 'Prestasi Mahasiswa', href: '/news/prestasi' }
            ]
        }
    ];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative z-10" ref={searchRef}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full bg-white dark:bg-gray-800 rounded-lg pl-12 pr-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Cari informasi..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                    />
                    <div className="absolute left-4 top-3.5">
                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && query && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                        >
                            <div className="p-4">
                                {searchResults.map((group, index) => (
                                    <div key={index} className="mb-4 last:mb-0">
                                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                            {group.category}
                                        </h3>
                                        <div className="space-y-2">
                                            {group.items.map((item, itemIndex) => (
                                                <a
                                                    key={itemIndex}
                                                    href={item.href}
                                                    className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <div className="text-sm text-gray-900 dark:text-gray-100">
                                                        {item.title}
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
} 
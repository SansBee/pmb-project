import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Stats() {
    const stats = [
        { 
            label: 'Mahasiswa Aktif', 
            value: 1000,
            suffix: '+',
            icon: '👨‍🎓'
        },
        { 
            label: 'Dosen', 
            value: 50,
            suffix: '+',
            icon: '👨‍🏫'
        },
        { 
            label: 'Penelitian', 
            value: 100,
            suffix: '+',
            icon: '📚'
        },
        { 
            label: 'Partner Industri', 
            value: 25,
            suffix: '+',
            icon: '🤝'
        }
    ];

    // Animasi counter
    const [counts, setCounts] = useState(stats.map(() => 0));

    useEffect(() => {
        stats.forEach((stat, index) => {
            const timer = setInterval(() => {
                setCounts(prev => {
                    const newCounts = [...prev];
                    if (newCounts[index] < stat.value) {
                        newCounts[index] += Math.ceil(stat.value / 50);
                        if (newCounts[index] > stat.value) {
                            newCounts[index] = stat.value;
                        }
                    }
                    return newCounts;
                });
            }, 50);

            return () => clearInterval(timer);
        });
    }, []);

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl transform transition-transform group-hover:scale-105 group-hover:shadow-xl"></div>
                            <div className="relative p-6 text-center">
                                <motion.div 
                                    className="text-5xl mb-4"
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {stat.icon}
                                </motion.div>
                                <motion.div 
                                    className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    {counts[index]}{stat.suffix}
                                </motion.div>
                                <div className="mt-2 text-gray-600 dark:text-gray-300 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
} 
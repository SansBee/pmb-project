import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function Achievements() {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const achievements = [
        {
            number: 'A',
            title: 'Akreditasi',
            description: 'Terakreditasi BAN-PT',
            icon: '🏆'
        },
        {
            number: '100+',
            title: 'Kerjasama Industri',
            description: 'Partner perusahaan nasional & internasional',
            icon: '🤝'
        },
        {
            number: '90%',
            title: 'Alumni Bekerja',
            description: 'Tingkat penyerapan kerja tinggi',
            icon: '👨‍🎓'
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 20,
            scale: 0.8 
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Prestasi Kampus
                    </h2>
                </div>

                <motion.div 
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="mt-12 grid gap-8 md:grid-cols-3"
                >
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="relative overflow-hidden"
                        >
                            <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-20" />
                                <div className="relative">
                                    <motion.div 
                                        className="text-5xl mb-4"
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {achievement.icon}
                                    </motion.div>
                                    <motion.div 
                                        className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5 + index * 0.2 }}
                                    >
                                        {achievement.number}
                                    </motion.div>
                                    <div className="text-xl font-semibold text-gray-900 dark:text-white mt-2">
                                        {achievement.title}
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-300 mt-2">
                                        {achievement.description}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
} 
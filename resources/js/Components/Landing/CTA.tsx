import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function CTA() {
    return (
        <div className="relative bg-indigo-600 py-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-extrabold text-white sm:text-4xl"
                    >
                        Siap Untuk Bergabung?
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-xl text-indigo-100"
                    >
                        Daftar sekarang dan wujudkan mimpimu bersama kami
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex justify-center space-x-4"
                    >
                        <Link
                            href="/login"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-300"
                        >
                            Daftar PMB
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition-all duration-300"
                        >
                            Hubungi Kami
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
} 
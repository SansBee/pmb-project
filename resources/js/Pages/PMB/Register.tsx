import React from 'react';
import PMBLayout from '@/Layouts/PMBLayout';
import RegistrationForm from '@/Components/PMB/RegistrationForm';
import { motion } from 'framer-motion';

export default function Register() {
    return (
        <PMBLayout title="Pendaftaran Mahasiswa Baru">
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Form Pendaftaran Mahasiswa Baru
                            </h1>
                            <p className="mt-2 text-gray-600">
                                Lengkapi data diri Anda dengan benar untuk proses pendaftaran
                            </p>
                        </div>
                        <RegistrationForm />
                    </div>
                </motion.div>
            </div>
        </PMBLayout>
    );
}
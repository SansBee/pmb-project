import React, { Fragment, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Transition } from '@headlessui/react';
import LandingLayout from '@/Layouts/LandingLayout';

export default function Contact() {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                reset();
                setToastMessage('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
                setToastType('success');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            },
            onError: () => {
                setToastMessage('Terjadi kesalahan. Silakan coba lagi.');
                setToastType('error');
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        });
    };

    const contactInfo = {
        address: 'Jl. Pendidikan No. 123, Jakarta',
        phone: '(021) 1234-5678',
        email: 'info@kampus.ac.id',
        whatsapp: '+62812-3456-7890',
        socialMedia: {
            facebook: 'facebook.com/kampus',
            instagram: 'instagram.com/kampus',
            twitter: 'twitter.com/kampus'
        },
        operationalHours: [
            { day: 'Senin - Jumat', hours: '08:00 - 16:00' },
            { day: 'Sabtu', hours: '08:00 - 12:00' },
            { day: 'Minggu', hours: 'Tutup' }
        ]
    };

    return (
        <LandingLayout>
            <Head title="Hubungi Kami - Universitas Langit Timur" />

            {/* Toast Notification */}
            <Transition
                show={showToast}
                as={Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed top-4 right-4 z-50">
                    <div className={`rounded-lg shadow-lg p-4 ${
                        toastType === 'success' 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                            : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                    }`}>
                        <div className="flex items-center space-x-2">
                            {toastType === 'success' ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                            <p className="font-medium">{toastMessage}</p>
                        </div>
                    </div>
                </div>
            </Transition>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
                        >
                            Hubungi Kami
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 text-xl text-indigo-100"
                        >
                            Kami siap membantu menjawab pertanyaan Anda
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Contact Form & Info */}
            <div className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Kirim Pesan
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                                        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                                        dark:bg-gray-800 dark:text-gray-100 
                                        placeholder-gray-400 dark:placeholder-gray-500"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                                        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                                        dark:bg-gray-800 dark:text-gray-100 
                                        placeholder-gray-400 dark:placeholder-gray-500"
                                        placeholder="Masukkan email"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Subjek
                                    </label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={e => setData('subject', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                                        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                                        dark:bg-gray-800 dark:text-gray-100 
                                        placeholder-gray-400 dark:placeholder-gray-500"
                                        placeholder="Masukkan subjek"
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Pesan
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                                        shadow-sm focus:border-indigo-500 focus:ring-indigo-500 
                                        dark:bg-gray-800 dark:text-gray-100 
                                        placeholder-gray-400 dark:placeholder-gray-500"
                                        placeholder="Tulis pesan Anda di sini"
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent 
                                    rounded-md shadow-sm text-sm font-medium text-white 
                                    bg-indigo-600 hover:bg-indigo-700 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                                    disabled:opacity-50 transition-colors duration-200"
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Pesan'}
                                </button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            {/* Address */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Alamat Kampus
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {contactInfo.address}
                                </p>
                            </motion.div>

                            {/* Contact Details */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Kontak
                                </h3>
                                <div className="space-y-4">
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        {contactInfo.phone}
                                    </p>
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {contactInfo.email}
                                    </p>
                                    <p className="flex items-center text-gray-600 dark:text-gray-300">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                        </svg>
                                        {contactInfo.whatsapp}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Operating Hours */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Jam Operasional
                                </h3>
                                <div className="space-y-2">
                                    {contactInfo.operationalHours.map((schedule) => (
                                        <div
                                            key={schedule.day}
                                            className="flex justify-between text-gray-600 dark:text-gray-300"
                                        >
                                            <span>{schedule.day}</span>
                                            <span>{schedule.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="h-96 bg-gray-200 dark:bg-gray-700">
                {/* Tambahkan Google Maps atau peta lainnya di sini */}
                <div className="w-full h-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=YOUR_MAP_EMBED_URL"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            </div>
        </LandingLayout>
    );
} 
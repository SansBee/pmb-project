import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Footer from '@/Components/Landing/Footer';
import ScrollToTop from '@/Components/ScrollToTop';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('darkMode');
            return savedMode ? JSON.parse(savedMode) : false;
        }
        return false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const navigation = [
        { name: 'Beranda', href: '/' },
        { 
            name: 'Program Studi', 
            href: '#prodi',
            dropdownItems: [
                { name: 'Teknik Informatika', href: '/prodi/ti' },
                { name: 'Sistem Informasi', href: '/prodi/si' },
                { name: 'Manajemen Informatika', href: '/prodi/mi' },
                { name: 'Komputerisasi Akuntansi', href: '/prodi/ka' }
            ]
        },
        { name: 'Fasilitas', href: '/facilities' },
        { name: 'Tentang Kami', href: '/about' },
        { name: 'PMB', href: '/pmb' },
        { name: 'Contact', href: route('contact') }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Head>
                <title>Universitas Langit Timur - Kampus Teknologi Terdepan</title>
                <meta name="description" content="Universitas Langit Timur - Institusi pendidikan tinggi yang berfokus pada teknologi informasi dan komputerisasi" />
                
                {/* Favicon Tags */}
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/logo/apple-touch-icon.png" />
                <link rel="manifest" href="/images/logo/site.webmanifest" />
                
                <meta name="theme-color" content="#4f46e5" />
            </Head>

            <nav className="fixed w-full z-50 bg-white dark:bg-gray-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo dan Nama Kampus */}
                        <div className="flex-shrink-0 flex items-center space-x-3">
                            <Link href="/" className="flex items-center group">
                                <div className="relative transform transition-all duration-300 group-hover:scale-105">
                                    <img 
                                        src="/images/logo.png" 
                                        alt="Logo" 
                                        className="h-8 w-auto sm:h-10 object-contain transform transition-transform duration-300 group-hover:rotate-3" 
                                    />
                                </div>
                                <div className="ml-2 sm:ml-3 flex flex-col">
                                    <span className="text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent truncate max-w-[120px] sm:max-w-[200px] lg:max-w-none">
                                        Universitas Langit Timur
                                    </span>
                                    <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-300 hidden sm:block">
                                        Menggapai Mimpi di Ufuk Timur
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation Links dan Login Button */}
                        <div className="hidden sm:flex sm:items-center sm:justify-between flex-1">
                            {/* Navigation Links */}
                            <div className="flex items-center space-x-6 ml-16">
                                {navigation.map((item) => (
                                    <div key={item.name} className="relative group">
                                        <Link
                                            href={item.href}
                                            className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                        >
                                            {item.name}
                                            {item.dropdownItems && (
                                                <svg className="ml-1 w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                        </Link>
                                        {item.dropdownItems && (
                                            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                                <div className="py-1">
                                                    {item.dropdownItems.map((dropdownItem) => (
                                                        <Link
                                                            key={dropdownItem.name}
                                                            href={dropdownItem.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                        >
                                                            {dropdownItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Right Side - Dark Mode & Login */}
                            <div className="flex items-center space-x-4 mr-4">
                                {/* Dark Mode Toggle */}
                                <button
                                    onClick={() => setDarkMode(prev => !prev)}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                    {darkMode ? (
                                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                        </svg>
                                    )}
                                </button>

                                {/* Login Button */}
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Login
                                </Link>
                            </div>
                        </div>

                        {/* Dark mode toggle and mobile menu button */}
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="sm:hidden ml-3 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg
                                    className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <div key={item.name}>
                                <Link
                                    href={item.href}
                                    className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    {item.name}
                                </Link>
                                {item.dropdownItems && (
                                    <div className="pl-6">
                                        {item.dropdownItems.map((dropdownItem) => (
                                            <Link
                                                key={dropdownItem.name}
                                                href={dropdownItem.href}
                                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                {dropdownItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            <main>{children}</main>
            <Footer />
            <ScrollToTop />
        </div>
    );
}
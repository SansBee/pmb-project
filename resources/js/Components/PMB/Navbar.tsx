import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { 
            name: 'Beranda', 
            href: '/dashboard', 
            icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        },
        { 
            name: 'Pendaftaran', 
            href: '/pmb/register', 
            icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        },
        { 
            name: 'Status', 
            href: '/pmb/status', 
            icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
        },
        { 
            name: 'Pengumuman', 
            href: '/pmb/pengumuman', 
            icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
        },
    ];

    const profileMenuItems = [
        {
            name: 'Profil Saya',
            href: '/profile',
            icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        },
        {
            name: 'Pengaturan',
            href: '/settings',
            icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
        },
        {
            name: 'Keluar',
            href: '/logout',
            icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
            className: 'text-red-600 hover:bg-red-50'
        }
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-gradient-to-r from-cyan-500 to-teal-500'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <motion.div 
                        className="flex-shrink-0 flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="flex items-center space-x-3">
                            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
                            <span className={`text-xl font-bold transition-colors duration-300 ${
                                scrolled ? 'text-gray-900' : 'text-white'
                            }`}>
                                Nama Kampus
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    className={`group relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                        scrolled 
                                        ? 'text-gray-600 hover:text-cyan-600' 
                                        : 'text-white/90 hover:text-white'
                                    }`}
                                >
                                    <span>{item.name}</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </Link>
                            </motion.div>
                        ))}

                        {/* Profile Menu */}
                        <div className="relative ml-3">
                            <motion.button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                                    scrolled
                                    ? 'hover:bg-gray-100'
                                    : 'hover:bg-white/10'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="relative">
                                    <img
                                        src="/images/avatar-placeholder.jpg"
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                                    />
                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></div>
                                </div>
                                <svg
                                    className={`w-4 h-4 transition-all duration-300 ${
                                        showProfileMenu ? 'rotate-180' : ''
                                    } ${
                                        scrolled ? 'text-gray-600' : 'text-white'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </motion.button>

                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
                                    >
                                        {profileMenuItems.map((item, index) => (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={`group flex items-center px-4 py-2 text-sm ${
                                                        item.className || 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <svg
                                                        className="mr-3 h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                    </svg>
                                                    {item.name}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden inline-flex items-center justify-center p-2 rounded-md ${
                            scrolled 
                            ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                            : 'text-white hover:text-white hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg
                            className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`md:hidden overflow-hidden ${
                            scrolled ? 'bg-white' : 'bg-gradient-to-r from-cyan-500 to-teal-500'
                        }`}
                    >
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={`flex items-center px-3 py-2 rounded-lg text-base font-medium ${
                                            scrolled
                                            ? 'text-gray-600 hover:bg-gray-50 hover:text-cyan-600'
                                            : 'text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Profile section in mobile menu */}
                            <div className="pt-4 pb-3 border-t border-gray-200/20">
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-10 w-10 rounded-full ring-2 ring-white"
                                            src="/images/avatar-placeholder.jpg"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <div className={`text-base font-medium ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                                            Nama Pengguna
                                        </div>
                                        <div className={`text-sm font-medium ${scrolled ? 'text-gray-500' : 'text-gray-300'}`}>
                                            user@example.com
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    {profileMenuItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: (index + navItems.length) * 0.1 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className={`flex items-center px-4 py-2 text-base font-medium ${
                                                    item.className || 
                                                    (scrolled ? 'text-gray-600 hover:bg-gray-50' : 'text-white hover:bg-white/10')
                                                }`}
                                            >
                                                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                </svg>
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
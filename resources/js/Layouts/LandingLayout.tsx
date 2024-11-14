import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Navbar items
    const navItems = [
        { name: 'Beranda', href: '/' },
        {
            name: 'Program Studi',
            href: '#',
            dropdownItems: [
                { name: 'Teknik Informatika', href: '/prodi/ti' },
                { name: 'Sistem Informasi', href: '/prodi/si' },
                { name: 'Manajemen Informatika', href: '/prodi/mi' }
            ]
        },
        { name: 'Fasilitas', href: '#facilities' },
        { name: 'Berita', href: '/berita' },
        { name: 'PMB', href: '/pmb' },
    ];

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center space-x-2">
                                <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
                                <span className={`text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
                                    Nama Kampus
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-8">
                            {navItems.map((item) => (
                                <div key={item.name} className="relative group">
                                    <Link
                                        href={item.href}
                                        className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>

                                    {/* Dropdown untuk Program Studi */}
                                    {item.dropdownItems && (
                                        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                            <div className="py-1">
                                                {item.dropdownItems.map((dropItem) => (
                                                    <Link
                                                        key={dropItem.name}
                                                        href={dropItem.href}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                                                    >
                                                        {dropItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Login Button */}
                            <Link
                                href="/login"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                            >
                                Login
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white border-b`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navItems.map((item) => (
                            <React.Fragment key={item.name}>
                                <Link
                                    href={item.href}
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                                >
                                    {item.name}
                                </Link>
                                {item.dropdownItems && (
                                    <div className="pl-4">
                                        {item.dropdownItems.map((dropItem) => (
                                            <Link
                                                key={dropItem.name}
                                                href={dropItem.href}
                                                className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                                            >
                                                {dropItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                        <Link
                            href="/login"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-16">{children}</main>
        </div>
    );
}
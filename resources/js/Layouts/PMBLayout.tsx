import React, { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

interface PMBLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function PMBLayout({ children, title }: PMBLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Navbar */}
            <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/">
                                    <img 
                                        className="h-8 w-auto" 
                                        src="/images/logo.png" 
                                        alt="Logo" 
                                    />
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
                                >
                                    Dashboard
                                </Link>
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main>
                {title && (
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {title}
                            </h1>
                        </div>
                    </header>
                )}
                <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
} 
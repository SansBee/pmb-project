import React from 'react';
import { Link, usePage } from '@inertiajs/react';

interface Props {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-indigo-700">
                <div className="flex items-center justify-center h-16 bg-indigo-800">
                    <span className="text-white text-2xl font-bold">Admin PMB</span>
                </div>
                
                <nav className="mt-5 px-2">
                    <Link
                        href={route('admin.dashboard')}
                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </Link>

                    <Link
                        href={route('admin.pendaftar')}
                        className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Pendaftar
                    </Link>

                    <Link
                        href={route('admin.pembayaran')}
                        className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Pembayaran
                    </Link>

                    <Link
                        href={route('admin.settings')}
                        className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Pengaturan
                    </Link>

                    <Link
                        href={route('admin.laporan')}
                        className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Laporan
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="pl-64">
                {/* Navbar */}
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <h1 className="text-xl font-semibold text-gray-900">
                                        Admin Panel PMB
                                    </h1>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <span className="text-gray-700 mr-4">
                                        {auth.user.name}
                                    </span>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="text-sm text-red-600 hover:text-red-800"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
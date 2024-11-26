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
                        href={route('admin.prodi')}
                        className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Program Studi
                    </Link>

                    <Link
                        href={route('admin.gelombang')}
                        className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Gelombang PMB
                    </Link>

                    <Link
                        href={route('admin.dokumen')}
                        className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Dokumen
                    </Link>

                    <Link
                        href={route('admin.biaya')}
                        className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Biaya & Pembayaran
                    </Link>

                    <Link
                        href={route('admin.pengumuman')}
                        className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                        Pengumuman
                    </Link>

                    <Link
                        href={route('admin.jadwal')}
                        className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Jadwal Ujian
                    </Link>

                    <Link
                        href={route('admin.faq')}
                        className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-white hover:bg-indigo-600"
                    >
                        <svg className="mr-4 h-6 w-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        FAQ
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="pl-64">
                {/* Header */}
                <header className="bg-white shadow">
                    <div className="flex justify-between items-center px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Admin Panel PMB
                        </h1>
                        
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">{auth.user.name}</span>
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
                </header>

                {/* Page Content */}
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
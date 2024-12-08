import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from './AuthenticatedLayout';

interface Props {
    user: any;
    children: React.ReactNode;
}

export default function PMBLayout({ user, children }: Props) {
    return (
        <AuthenticatedLayout user={user}>
            {/* Navigation PMB */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        <Link
                            href={route('pmb.dashboard')}
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                route().current('pmb.dashboard') 
                                ? 'border-indigo-500 text-gray-900' 
                                : 'border-transparent text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            Dashboard PMB
                        </Link>
                        
                        <Link
                            href={route('pmb.register')}
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                route().current('pmb.register') 
                                ? 'border-indigo-500 text-gray-900' 
                                : 'border-transparent text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            Form Pendaftaran
                        </Link>

                        <Link
                            href={route('pmb.dokumen')}
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                route().current('pmb.dokumen') 
                                ? 'border-indigo-500 text-gray-900' 
                                : 'border-transparent text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            Upload Dokumen
                        </Link>

                        <Link
                            href={route('pmb.pembayaran')}
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                route().current('pmb.pembayaran') 
                                ? 'border-indigo-500 text-gray-900' 
                                : 'border-transparent text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            Pembayaran
                        </Link>

                        <Link
                            href={route('pmb.status-pendaftaran')}
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                route().current('pmb.status-pendaftaran') 
                                ? 'border-indigo-500 text-gray-900' 
                                : 'border-transparent text-gray-500 hover:border-gray-300'
                            }`}
                        >
                            Status
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main>{children}</main>
        </AuthenticatedLayout>
    );
} 
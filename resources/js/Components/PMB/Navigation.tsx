import { Link } from '@inertiajs/react';

export default function Navigation() {
    const navItems = [
        { name: 'Dashboard', href: '/pmb/dashboard' },
        { name: 'Pendaftaran', href: '/pmb/register' },
        { name: 'Dokumen', href: '/pmb/documents' },
        { name: 'Pembayaran', href: '/pmb/payment' },
        { name: 'Pengumuman', href: '/pmb/announcement' }
    ];

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
} 
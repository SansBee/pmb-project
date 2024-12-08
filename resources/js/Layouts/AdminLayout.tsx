import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import NotificationDropdown from '@/Components/NotificationDropdown';
import { 
    HomeIcon, 
    UserGroupIcon,
    DocumentTextIcon,
    AcademicCapIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    BellIcon,
    QuestionMarkCircleIcon,
    ChatBubbleLeftIcon,
    NewspaperIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

interface Props {
    children: React.ReactNode;
}

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            notifications: Array<{
                id: string;
                type: string;
                data: {
                    type: string;
                    message: string;
                };
                read_at: string | null;
                created_at: string;
            }>;
        };
    };
    [key: string]: any;
}

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Program Studi', href: '/admin/program-studi', icon: AcademicCapIcon },
    { name: 'Gelombang PMB', href: '/admin/gelombang', icon: CalendarIcon },
    { name: 'Jalur Masuk', href: '/admin/jalur-masuk', icon: DocumentTextIcon },
    { name: 'Dokumen', href: '/admin/dokumen', icon: DocumentTextIcon },
    { name: 'Biaya', href: '/admin/biaya', icon: CurrencyDollarIcon },
    { name: 'Pengumuman', href: '/admin/pengumuman', icon: BellIcon },
    { name: 'Jadwal Ujian', href: '/admin/jadwal-ujian', icon: CalendarIcon },
    { name: 'FAQ', href: '/admin/faq', icon: QuestionMarkCircleIcon },
    { name: 'Pendaftar', href: '/admin/pendaftar', icon: UserGroupIcon },
    { name: 'Pembayaran', href: '/admin/pembayaran', icon: CurrencyDollarIcon },
    { name: 'Laporan', href: '/admin/laporan', icon: ChartBarIcon },
    { name: 'Berita & Event', href: '/admin/berita', icon: NewspaperIcon },
];

export default function AdminLayout({ children }: Props) {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/">
                                    <h1 className="text-xl font-bold">Admin PMB</h1>
                                </Link>
                            </div>
                        </div>

                        {/* Right section */}
                        <div className="flex items-center space-x-4">
                            {/* Notifications */}
                            <NotificationDropdown notifications={auth.user.notifications} />

                            {/* Profile dropdown */}
                            <div className="flex items-center">
                                <span className="text-gray-700">{auth.user.name}</span>
                                <Link 
                                    href={route('logout')} 
                                    method="post" 
                                    as="button"
                                    className="ml-4 text-sm text-red-600 hover:text-red-900"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-sm min-h-screen">
                    <nav className="mt-5 px-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                        route().current(item.href)
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Main content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
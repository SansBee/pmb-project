import { Link } from '@inertiajs/react';

export default function Hero() {
    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90 dark:opacity-80"></div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-white dark:text-gray-100 sm:text-5xl lg:text-6xl">
                    Selamat Datang di Kampus Kami
                </h1>
                <p className="mt-6 text-xl text-indigo-100 dark:text-indigo-50 max-w-3xl">
                    Membangun masa depan cemerlang melalui pendidikan berkualitas
                </p>
                <div className="mt-10 flex space-x-4">
                    <Link
                        href="/pmb"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                    >
                        Daftar PMB
                    </Link>
                    <a
                        href="#facilities"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400"
                    >
                        Pelajari Lebih Lanjut
                    </a>
                </div>
            </div>
        </div>
    );
}

import Navbar from '@/Components/PMB/Navbar';

export default function PMBLayout({ children, title }: { children: React.ReactNode, title?: string }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Page Title */}
            <header className="pt-16">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-white">
                        {title}
                    </h1>
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
}
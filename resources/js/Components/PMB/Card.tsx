import { Link } from '@inertiajs/react';

interface CardProps {
    title: string;
    description: string;
    href: string;
    icon?: string;
    gradient?: string;
}

export default function Card({ title, description, href, icon, gradient = "from-indigo-500 to-purple-600" }: CardProps) {
    return (
        <Link 
            href={href}
            className={`block p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${gradient}`}
        >
            {icon && (
                <div className="w-12 h-12 mb-4 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                </div>
            )}
            <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
            <p className="font-normal text-white/80">
                {description}
            </p>
        </Link>
    );
} 
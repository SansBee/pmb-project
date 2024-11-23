import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CompanyName = 'google' | 'tokopedia' | 'gojek';

interface Testimonial {
    name: string;
    role: string;
    image: string;
    quote: string;
    year: string;
    company: CompanyName;
}

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const companyLogos: Record<CompanyName, JSX.Element> = {
        google: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
        ),
        tokopedia: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-.5 4C9.567 6 8 7.567 8 9.5v5c0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5v-5C15 7.567 13.433 6 11.5 6zm0 2c.827 0 1.5.673 1.5 1.5v5c0 .827-.673 1.5-1.5 1.5S10 15.327 10 14.5v-5c0-.827.673-1.5 1.5-1.5z"/>
            </svg>
        ),
        gojek: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 14.12c-.387 2.08-2.147 3.72-4.294 3.72-2.147 0-3.907-1.64-4.294-3.72-.147-.8.387-1.48 1.147-1.48h6.294c.76 0 1.294.68 1.147 1.48zm-9.641-4.84c0-1.16.947-2.12 2.107-2.12 1.16 0 2.107.96 2.107 2.12 0 1.16-.947 2.12-2.107 2.12-1.16 0-2.107-.96-2.107-2.12zm7.534 0c0-1.16.947-2.12 2.107-2.12 1.16 0 2.107.96 2.107 2.12 0 1.16-.947 2.12-2.107 2.12-1.16 0-2.107-.96-2.107-2.12z"/>
            </svg>
        )
    };

    const testimonials: Testimonial[] = [
        {
            name: "Ahmad Fajar",
            role: "Software Engineer at Google",
            image: "/images/testimonials/alumni1.jpg",
            quote: "Pendidikan yang saya dapat di kampus ini sangat membantu karir saya di industri teknologi.",
            year: "2023",
            company: "google"
        },
        {
            name: "Sarah Amalia",
            role: "Data Analyst at Tokopedia",
            image: "/images/testimonials/alumni2.jpg",
            quote: "Fasilitas laboratorium yang lengkap dan modern membuat saya siap menghadapi dunia kerja.",
            year: "2022",
            company: "tokopedia"
        },
        {
            name: "Budi Santoso",
            role: "IT Consultant",
            image: "/images/testimonials/alumni3.jpg",
            quote: "Program magang dan kerjasama industri membantu saya mendapatkan pekerjaan impian.",
            year: "2023",
            company: "gojek"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Kisah Sukses Alumni
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
                        >
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                <div className="relative">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden">
                                        <img 
                                            src={testimonials[currentIndex].image} 
                                            alt={testimonials[currentIndex].name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-3 -right-3 bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm">
                                        {testimonials[currentIndex].year}
                                    </div>
                                </div>
                                
                                <div className="flex-1 text-center md:text-left">
                                    <svg className="w-10 h-10 text-indigo-500/20 mb-4" fill="currentColor" viewBox="0 0 32 32">
                                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                    </svg>
                                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
                                        {testimonials[currentIndex].quote}
                                    </p>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {testimonials[currentIndex].name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-600 dark:text-gray-400">
                                                {companyLogos[testimonials[currentIndex].company]}
                                            </span>
                                            <p className="text-indigo-500 dark:text-indigo-400">
                                                {testimonials[currentIndex].role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    index === currentIndex 
                                        ? 'bg-indigo-500 scale-125' 
                                        : 'bg-gray-300 hover:bg-indigo-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 
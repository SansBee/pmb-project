import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const images = [
        {
            url: '/images/campus1.jpg',
            title: 'Gedung Utama',
            description: 'Fasilitas modern untuk kenyamanan belajar'
        },
        {
            url: '/images/campus2.jpg',
            title: 'Perpustakaan',
            description: 'Pusat pembelajaran digital'
        },
        {
            url: '/images/campus3.jpg',
            title: 'Laboratorium',
            description: 'Lab komputer dengan teknologi terkini'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[300px] overflow-hidden rounded-xl mb-8">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <img
                        src={images[currentIndex].url}
                        alt={images[currentIndex].title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                        <h3 className="text-xl font-bold text-white">{images[currentIndex].title}</h3>
                        <p className="text-white/80">{images[currentIndex].description}</p>
                    </div>
                </motion.div>
            </AnimatePresence>
            
            {/* Navigation Dots */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
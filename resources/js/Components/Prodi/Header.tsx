import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
    title: string;
    description: string;
    image: string;
}

export default function Header({ title, description, image }: HeaderProps) {
    return (
        <div className="relative bg-gray-900 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    className="w-full h-full object-cover"
                    src={image}
                    alt={title}
                />
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 text-xl text-gray-300 max-w-3xl"
                >
                    {description}
                </motion.p>
            </div>
        </div>
    );
} 
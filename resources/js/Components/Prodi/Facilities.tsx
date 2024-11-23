import React from 'react';
import { motion } from 'framer-motion';

interface Facility {
    name: string;
    description: string;
    image: string;
}

interface FacilitiesProps {
    data: Facility[];
}

export default function Facilities({ data }: FacilitiesProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((facility, index) => (
                <motion.div
                    key={facility.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                    <div className="aspect-w-16 aspect-h-9">
                        <img
                            className="w-full h-full object-cover"
                            src={facility.image}
                            alt={facility.name}
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {facility.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {facility.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
} 
import React from 'react';
import { motion } from 'framer-motion';

interface CareerProps {
    careers: string[];
}

export default function Career({ careers }: CareerProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career, index) => (
                <motion.div
                    key={career}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6"
                >
                    <div className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                        {career}
                    </div>
                </motion.div>
            ))}
        </div>
    );
} 
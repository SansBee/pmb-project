import React from 'react';
import { motion } from 'framer-motion';

interface Course {
    code: string;
    name: string;
    sks: number;
}

interface Semester {
    semester: number;
    courses: Course[];
}

interface CurriculumProps {
    data: Semester[];
}

export default function Curriculum({ data }: CurriculumProps) {
    return (
        <div className="space-y-12">
            {data.map((semester, index) => (
                <motion.div
                    key={semester.semester}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                    <div className="px-6 py-4 bg-indigo-600">
                        <h3 className="text-lg font-semibold text-white">
                            Semester {semester.semester}
                        </h3>
                    </div>
                    <div className="p-6">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="text-left text-sm font-semibold text-gray-900 dark:text-white">Kode</th>
                                    <th className="text-left text-sm font-semibold text-gray-900 dark:text-white">Mata Kuliah</th>
                                    <th className="text-center text-sm font-semibold text-gray-900 dark:text-white">SKS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {semester.courses.map((course) => (
                                    <tr key={course.code}>
                                        <td className="py-4 text-sm text-gray-500 dark:text-gray-400">{course.code}</td>
                                        <td className="py-4 text-sm text-gray-900 dark:text-white">{course.name}</td>
                                        <td className="py-4 text-sm text-center text-gray-500 dark:text-gray-400">{course.sks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            ))}
        </div>
    );
} 
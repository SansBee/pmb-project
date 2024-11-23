import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Announcement() {
    const [isVisible, setIsVisible] = useState(true);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

    const announcements = [
        {
            type: 'info',
            message: 'Pendaftaran Mahasiswa Baru 2024 telah dibuka! 🎓',
            link: '/pmb'
        },
        {
            type: 'event',
            message: 'Seminar Teknologi Blockchain - 20 April 2024 🚀',
            link: '/events'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {announcements[currentAnnouncement].type === 'info' ? (
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            )}
                            <a href={announcements[currentAnnouncement].link} className="font-medium hover:text-indigo-100">
                                {announcements[currentAnnouncement].message}
                            </a>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="flex-shrink-0 ml-4 p-1 rounded-full hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
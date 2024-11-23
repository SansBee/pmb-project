import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar() {
    const [activeTab, setActiveTab] = useState('info');

    const tabs = [
        { id: 'info', name: 'Informasi Umum', icon: 'ℹ️' },
        { id: 'timeline', name: 'Timeline', icon: '📅' },
        { id: 'jalur', name: 'Jalur Masuk', icon: '🎓' },
        { id: 'biaya', name: 'Biaya Kuliah', icon: '💰' },
        { id: 'beasiswa', name: 'Beasiswa', icon: '🏆' },
        { id: 'faq', name: 'FAQ', icon: '❓' }
    ];

    return (
        <div className="sticky top-16 z-10 bg-white dark:bg-gray-900 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex overflow-x-auto py-4 space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
} 
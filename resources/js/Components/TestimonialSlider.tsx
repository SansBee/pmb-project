import React, { useState } from 'react';

export default function TestimonialSlider() {
    const testimonials = [
        {
            name: 'Alumni 2022',
            role: 'Software Engineer at Tech Corp',
            content: 'Pendidikan yang saya dapat sangat membantu karir saya.',
            avatar: '/images/avatar1.jpg'
        },
        // Tambah testimonial lainnya
    ];

    return (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">Apa Kata Alumni</h2>
                    {/* Testimonial cards dengan animasi slide */}
                </div>
            </div>
        </div>
    );
}
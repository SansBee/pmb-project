import React from 'react';
import { Head } from '@inertiajs/react';
import LandingLayout from '@/Layouts/LandingLayout';
import Hero from '@/Components/Landing/Hero';
import Features from '@/Components/Landing/Features';
import Achievements from '@/Components/Landing/Achievements';
import Stats from '@/Components/Landing/Stats';
import WhyChooseUs from '@/Components/Landing/WhyChooseUs';
import CTA from '@/Components/Landing/CTA';
import ProgramStudi from '@/Components/Landing/ProgramStudi';
import AcademicCalendar from '@/Components/Landing/AcademicCalendar';
import FAQ from '@/Components/Landing/FAQ';
import LiveChat from '@/Components/LiveChat';
import Testimonials from '@/Components/Landing/Testimonials';
import News from '@/Components/Landing/News';
import Announcement from '@/Components/Announcement';
import { Link } from '@inertiajs/react';

interface Props {
    berita: {
        title: string;
        category: string;
        date: string;
        image: string;
        excerpt: string;
    }[];
    kategori_berita: Record<string, string>;
}

export default function Welcome({ berita, kategori_berita }: Props) {
    console.log('Welcome props:', { berita, kategori_berita });
    
    return (
        <LandingLayout>
            <Head title="Welcome" />
            <Announcement />
            <Hero />
            
            <div id="prodi" className="bg-white dark:bg-gray-900 py-16 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Program Studi
                        </h2>
                        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                            Pilih program studi sesuai minat dan bakatmu
                        </p>
                    </div>
                    <ProgramStudi />
                </div>
            </div>

            <Features />
            <Stats />
            <WhyChooseUs />
            <News 
                berita={berita} 
                kategori_berita={kategori_berita} 
            />
            <Achievements />
            <Testimonials />
            <AcademicCalendar />
            <FAQ />
            <CTA />
            <LiveChat />
        </LandingLayout>
    );
}
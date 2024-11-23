import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';

export default function FAQ() {
    const faqs = [
        {
            question: 'Bagaimana cara mendaftar kuliah?',
            answer: 'Pendaftaran dapat dilakukan secara online melalui website PMB kami. Klik tombol "Daftar PMB" di menu utama dan ikuti langkah-langkah yang tersedia.'
        },
        {
            question: 'Apa saja persyaratan masuk?',
            answer: 'Persyaratan utama meliputi: Ijazah SMA/sederajat, Nilai rapor/UN, Pas foto terbaru, KTP/Kartu Pelajar, dan mengikuti tes seleksi masuk.'
        },
        {
            question: 'Berapa biaya kuliah per semester?',
            answer: 'Biaya kuliah bervariasi tergantung program studi yang dipilih. Kami menyediakan berbagai skema pembayaran dan program beasiswa untuk mahasiswa berprestasi.'
        },
        {
            question: 'Apakah tersedia program beasiswa?',
            answer: 'Ya, kami menyediakan berbagai program beasiswa prestasi akademik, olahraga, dan beasiswa kerja sama dengan berbagai instansi.'
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-900 py-24 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Pertanyaan Umum
                    </h2>
                    <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                        Temukan jawaban untuk pertanyaan yang sering diajukan
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <Disclosure key={index}>
                            {({ open }) => (
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left">
                                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {faq.question}
                                        </span>
                                        <ChevronDownIcon
                                            className={`${
                                                open ? 'transform rotate-180' : ''
                                            } w-5 h-5 text-indigo-500 transition-transform duration-200`}
                                        />
                                    </Disclosure.Button>
                                    <Transition
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Disclosure.Panel className="px-6 pb-4 text-gray-500 dark:text-gray-300">
                                            {faq.answer}
                                        </Disclosure.Panel>
                                    </Transition>
                                </div>
                            )}
                        </Disclosure>
                    ))}
                </div>
            </div>
        </div>
    );
} 
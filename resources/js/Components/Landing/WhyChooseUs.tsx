import { motion } from 'framer-motion';

export default function WhyChooseUs() {
    const reasons = [
        {
            title: "Kurikulum Industri",
            description: "Kurikulum yang disesuaikan dengan kebutuhan industri terkini",
            icon: "🎯"
        },
        {
            title: "Dosen Profesional",
            description: "Pengajar berpengalaman dari industri dan akademisi",
            icon: "👨‍🏫"
        },
        {
            title: "Fasilitas Modern",
            description: "Laboratorium dan peralatan pembelajaran terkini",
            icon: "🖥️"
        },
        {
            title: "Kerjasama Industri",
            description: "Partnership dengan perusahaan teknologi terkemuka",
            icon: "🤝"
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl">
                        Mengapa Memilih Kami?
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                        Keunggulan yang membedakan kami
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={reason.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                                        {reason.icon}
                                    </div>
                                </div>
                                <div className="pt-8">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">
                                        {reason.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-center">
                                        {reason.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
} 
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'admin';
    timestamp: Date;
}

export default function LiveChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Halo! Ada yang bisa kami bantu?',
            sender: 'admin',
            timestamp: new Date()
        }
    ]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Tambah pesan user
        setMessages(prev => [...prev, {
            id: Date.now(),
            text: message,
            sender: 'user',
            timestamp: new Date()
        }]);
        setMessage('');

        // Simulasi balasan admin (bisa diganti dengan real API call)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: 'Terima kasih atas pertanyaannya. Admin kami akan segera membalas.',
                sender: 'admin',
                timestamp: new Date()
            }]);
        }, 1000);
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
                            <h3 className="font-semibold">Live Chat</h3>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-gray-200"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-96 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] rounded-lg p-3 ${
                                        msg.sender === 'user' 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        <p>{msg.text}</p>
                                        <span className="text-xs opacity-75">
                                            {msg.timestamp.toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={sendMessage} className="border-t p-4">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Ketik pesan..."
                                    className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                >
                                    Kirim
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
} 
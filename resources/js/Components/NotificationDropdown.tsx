import React from 'react';
import { Menu } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { router } from '@inertiajs/react';

interface Notification {
    id: string;
    type: string;
    data: {
        type: string;
        message: string;
    };
    read_at: string | null;
    created_at: string;
}

interface Props {
    notifications?: Notification[];
}

export default function NotificationDropdown({ notifications = [] }: Props) {
    const unreadCount = notifications?.filter(n => !n.read_at).length || 0;

    const markAsRead = (id: string) => {
        router.post(route('notifikasi.read', id));
    };

    const markAllAsRead = () => {
        router.post(route('notifikasi.readAll'));
    };

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="relative p-1 rounded-full hover:bg-gray-100">
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                )}
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-2 border-b flex justify-between items-center">
                    <h3 className="text-sm font-medium">Notifikasi</h3>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs text-indigo-600 hover:text-indigo-900"
                        >
                            Tandai semua sudah dibaca
                        </button>
                    )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <Menu.Item key={notification.id}>
                                <button
                                    onClick={() => markAsRead(notification.id)}
                                    className={`w-full px-4 py-2 text-left text-sm ${
                                        notification.read_at ? 'bg-gray-50' : 'bg-white'
                                    }`}
                                >
                                    <p className="font-medium text-gray-900">
                                        {notification.data.message}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(notification.created_at).toLocaleDateString()}
                                    </p>
                                </button>
                            </Menu.Item>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">
                            Tidak ada notifikasi
                        </div>
                    )}
                </div>
            </Menu.Items>
        </Menu>
    );
} 
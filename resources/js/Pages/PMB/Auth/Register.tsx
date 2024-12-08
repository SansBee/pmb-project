// Form registrasi akun PMB
import React from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
            </form>
        </GuestLayout>
    );
} 
import React from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import StatusMessage from './StatusMessage'; // Import StatusMessage
import PreviewData from '@/Components/PMB/PreviewData'; // Import PreviewData
import LoadingOverlay from './LoadingOverlay';

export default function RegistrationForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        birth_date: '',
        birth_place: '',
        gender: '',
        address: '',
        school_origin: '',
        school_major: '',
        graduation_year: '',
        major_choice: '',
        parent_name: '',
        parent_phone: '',
    });

    const [showPreview, setShowPreview] = React.useState(false);
    const [status, setStatus] = React.useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const validatePhoneNumber = (number: string) => {
        const phoneRegex = /^(\+62|0)8[1-9][0-9]{6,9}$/;
        return phoneRegex.test(number);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'phone' | 'parent_phone') => {
        const value = e.target.value;
        if (value === '' || validatePhoneNumber(value)) {
            setData(field, value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowPreview(true); // Tampilkan pratinjau data
    };

    const handleConfirmSubmit = () => {
        post('/pmb/register', {
            onSuccess: () => {
                setShowPreview(false);
                reset(); // Reset form setelah berhasil
                setStatus({
                    type: 'success',
                    message: 'Pendaftaran berhasil! Tim kami akan menghubungi Anda segera.'
                });
            },
            onError: () => {
                setShowPreview(false);
                setStatus({
                    type: 'error',
                    message: 'Terjadi kesalahan. Silakan coba lagi.'
                });
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pesan Status */}
            {status && <StatusMessage type={status.type} message={status.message} />}
            
            {/* Pratinjau Data */}
            {showPreview && (
                <PreviewData 
                    data={data}
                    onConfirm={handleConfirmSubmit}
                    onCancel={() => setShowPreview(false)}
                />
            )}

            {/* Data Pribadi */}
            <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Pribadi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nama Lengkap */}
                    <div>
                        <InputLabel htmlFor="name" value="Nama Lengkap" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Tempat Lahir */}
                    <div>
                        <InputLabel htmlFor="birth_place" value="Tempat Lahir" />
                        <TextInput
                            id="birth_place"
                            type="text"
                            name="birth_place"
                            value={data.birth_place}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('birth_place', e.target.value)}
                            required
                        />
                        <InputError message={errors.birth_place} className="mt-2" />
                    </div>

                    {/* Tanggal Lahir */}
                    <div>
                        <InputLabel htmlFor="birth_date" value="Tanggal Lahir" />
                        <TextInput
                            id="birth_date"
                            type="date"
                            name="birth_date"
                            value={data.birth_date}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('birth_date', e.target.value)}
                            required
                        />
                        <InputError message={errors.birth_date} className="mt-2" />
                    </div>

                    {/* Jenis Kelamin */}
                    <div>
                        <InputLabel htmlFor="gender" value="Jenis Kelamin" />
                        <select
                            id="gender"
                            name="gender"
                            value={data.gender}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('gender', e.target.value)}
                            required
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        <InputError message={errors.gender} className="mt-2" />
                    </div>

                    {/* Nomor Telepon */}
                    <div>
                        <InputLabel htmlFor="phone" value="Nomor Telepon" />
                        <TextInput
                            id="phone"
                            type="tel"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            onChange={(e) => handlePhoneChange(e, 'phone')}
                            placeholder="Contoh: 08123456789"
                            required
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Format: 08xx-xxxx-xxxx
                        </p>
                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                </div>

                {/* Alamat - Full Width */}
                <div className="mt-6">
                    <InputLabel htmlFor="address" value="Alamat Lengkap" />
                    <textarea
                        id="address"
                        name="address"
                        value={data.address}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => setData('address', e.target.value)}
                        required
                    />
                    <InputError message={errors.address} className="mt-2" />
                </div>
            </div>

            {/* Data Sekolah */}
            <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Sekolah</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Asal Sekolah */}
                    <div>
                        <InputLabel htmlFor="school_origin" value="Asal Sekolah" />
                        <TextInput
                            id="school_origin"
                            type="text"
                            name="school_origin"
                            value={data.school_origin}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('school_origin', e.target.value)}
                            required
                        />
                        <InputError message={errors.school_origin} className="mt-2" />
                    </div>

                    {/* Jurusan */}
                    <div>
                        <InputLabel htmlFor="school_major" value="Jurusan" />
                        <TextInput
                            id="school_major"
                            type="text"
                            name="school_major"
                            value={data.school_major}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('school_major', e.target.value)}
                        />
                        <InputError message={errors.school_major} className="mt-2" />
                    </div>

                    {/* Tahun Lulus */}
                    <div>
                        <InputLabel htmlFor="graduation_year" value="Tahun Lulus" />
                        <TextInput
                            id="graduation_year"
                            type="number"
                            name="graduation_year"
                            value={data.graduation_year}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('graduation_year', e.target.value)}
                            required
                        />
                        <InputError message={errors.graduation_year} className="mt-2" />
                    </div>

                    {/* Pilihan Jurusan */}
                    <div>
                        <InputLabel htmlFor="major_choice" value="Pilihan Jurusan" />
                        <TextInput
                            id="major_choice"
                            type="text"
                            name="major_choice"
                            value={data.major_choice}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('major_choice', e.target.value)}
                            required
                        />
                        <InputError message={errors.major_choice} className="mt-2" />
                    </div>
                </div>
            </div>

            {/* Data Orang Tua */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Orang Tua</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nama Orang Tua */}
                    <div>
                        <InputLabel htmlFor="parent_name" value="Nama Orang Tua" />
                        <TextInput
                            id="parent_name"
                            type="text"
                            name="parent_name"
                            value={data.parent_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('parent_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.parent_name} className="mt-2" />
                    </div>

                    {/* Nomor Telepon Orang Tua */}
                    <div>
                        <InputLabel htmlFor="parent_phone" value="Nomor Telepon Orang Tua" />
                        <TextInput
                            id="parent_phone"
                            type="tel"
                            name="parent_phone"
                            value={data.parent_phone}
                            className="mt-1 block w-full"
                            onChange={(e) => handlePhoneChange(e, 'parent_phone')}
                            placeholder="Contoh: 08123456789"
                            required
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Format: 08xx-xxxx-xxxx
                        </p>
                        <InputError message={errors.parent_phone} className="mt-2" />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end mt-6">
                <PrimaryButton disabled={processing}>
                    <span className="flex items-center">
                        {processing && (
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8"></path>
                            </svg>
                        )}
                        {processing ? 'Loading...' : 'Submit'}
                    </span>
                </PrimaryButton>
            </div>

            {/* Overlay saat loading */}
            {processing && <LoadingOverlay />}
        </form>
    );
}

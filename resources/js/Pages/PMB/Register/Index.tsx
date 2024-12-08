import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PMBLayout from '@/Layouts/PMBLayout';
import StepProgress from '@/Components/PMB/StepProgress';
import { toast } from 'react-hot-toast';

// Step components
import DataPribadiForm from './Steps/DataPribadiForm';
import DataAkademikForm from './Steps/DataAkademikForm';
import DataProgramForm from './Steps/DataProgramForm';
import DataOrangTuaForm from './Steps/DataOrangTuaForm';
interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    jalur_masuk: Array<{
        id: number;
        nama_jalur: string;
    }>;
    program_studi: Array<{
        id: number;
        nama: string;
    }>;
    gelombang: {
        id: number;
        nama_gelombang: string;
        tanggal_mulai: string;
        tanggal_selesai: string;
    };
}

export default function Register({ auth, jalur_masuk, program_studi, gelombang }: Props) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Data Pribadi
        nama_lengkap: '',
        nik: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        // Data Akademik
        asal_sekolah: '',
        jurusan_sekolah: '',
        tahun_lulus: '',
        nilai_rata_rata: '',
        // Data Program
        jalur_masuk_id: '',
        program_studi_id: '',
        gelombang_id: gelombang.id,
        // Data Orang Tua
        nama_ayah: '',
        pekerjaan_ayah: '',
        nama_ibu: '',
        pekerjaan_ibu: '',
        penghasilan_ortu: ''
    });

    const steps = [
        { 
            id: 1, 
            name: 'Data Pribadi', 
            status: currentStep === 1 ? 'current' : currentStep > 1 ? 'complete' : 'upcoming' 
        } as const,
        { 
            id: 2, 
            name: 'Data Akademik', 
            status: currentStep === 2 ? 'current' : currentStep > 2 ? 'complete' : 'upcoming' 
        } as const,
        { 
            id: 3, 
            name: 'Program Studi', 
            status: currentStep === 3 ? 'current' : currentStep > 3 ? 'complete' : 'upcoming' 
        } as const,
        { 
            id: 4, 
            name: 'Data Orang Tua', 
            status: currentStep === 4 ? 'current' : currentStep > 4 ? 'complete' : 'upcoming' 
        } as const,
    ];

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, 4));
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = () => {
        router.post(route('pmb.register.store'), formData, {
            onSuccess: () => {
                toast.success('Pendaftaran berhasil!');
                router.visit(route('pmb.dashboard'));
            },
            onError: (errors: Record<string, string>) => {
                toast.error('Terjadi kesalahan saat mendaftar.');
                console.error(errors);
            }
        });
    };

    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return <DataPribadiForm 
                    data={formData} 
                    onChange={setFormData} 
                    onNext={handleNext} 
                />;
            case 2:
                return <DataAkademikForm 
                    data={formData} 
                    onChange={setFormData}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />;
            case 3:
                return <DataProgramForm 
                    data={formData}
                    onChange={setFormData}
                    jalurMasuk={jalur_masuk}
                    programStudi={program_studi}
                    gelombang={gelombang}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />;
            case 4:
                return <DataOrangTuaForm 
                    data={formData}
                    onChange={setFormData}
                    onPrev={handlePrev}
                    onSubmit={handleSubmit}
                />;
            default:
                return null;
        }
    };

    return (
        <PMBLayout user={auth.user}>
            <Head title="Form Pendaftaran PMB" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Form Pendaftaran PMB</h2>
                            
                            <div className="mb-8">
                                <StepProgress currentStep={currentStep} steps={steps} />
                            </div>

                            {renderStep()}
                        </div>
                    </div>
                </div>
            </div>
        </PMBLayout>
    );
} 
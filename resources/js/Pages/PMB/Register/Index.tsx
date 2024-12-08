import React, { useState } from 'react';
import PMBLayout from '@/Layouts/PMBLayout';
import { Head, router } from '@inertiajs/react';
import StepProgress from '@/Components/PMB/StepProgress';
import DataPribadiForm from './Steps/DataPribadiForm';
import DataAkademikForm from './Steps/DataAkademikForm';
import DataProgramForm from './Steps/DataProgramForm';
import DataOrangTuaForm from './Steps/DataOrangTuaForm';

const steps = [
    {
        title: 'Data Program',
        description: 'Pilih program studi'
    },
    {
        title: 'Data Pribadi',
        description: 'Informasi diri'
    },
    {
        title: 'Data Akademik',
        description: 'Riwayat pendidikan'
    },
    {
        title: 'Data Orang Tua',
        description: 'Informasi keluarga'
    }
];

interface Props {
    auth: { user: any };
    jalurMasuk: Array<{
        id: number;
        nama_jalur: string;
    }>;
    programStudi: Array<{
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

interface FormData {
    program: {
        jalur_masuk_id?: string | number;
        program_studi_id?: string | number;
        gelombang_id?: string | number;
    };
    pribadi: {
        nama_lengkap: string;
        nik: string;
        tempat_lahir: string;
        tanggal_lahir: string;
        jenis_kelamin: string;
    };
    akademik: {
        asal_sekolah: string;
        jurusan_sekolah: string;
        tahun_lulus: string;
        nilai_rata_rata: string;
    };
    orangTua: {
        nama_ayah: string;
        pekerjaan_ayah: string;
        nama_ibu: string;
        pekerjaan_ibu: string;
        penghasilan_ortu: string;
    };
}

export default function Register({ auth, jalurMasuk, programStudi, gelombang }: Props) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        program: {},
        pribadi: {
            nama_lengkap: '',
            nik: '',
            tempat_lahir: '',
            tanggal_lahir: '',
            jenis_kelamin: ''
        },
        akademik: {
            asal_sekolah: '',
            jurusan_sekolah: '',
            tahun_lulus: '',
            nilai_rata_rata: ''
        },
        orangTua: {
            nama_ayah: '',
            pekerjaan_ayah: '',
            nama_ibu: '',
            pekerjaan_ibu: '',
            penghasilan_ortu: ''
        }
    });

    const handleNext = (data: any) => {
        setFormData(prev => ({
            ...prev,
            [Object.keys(data)[0]]: data[Object.keys(data)[0]]
        }));
        setCurrentStep(prev => prev + 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <DataProgramForm
                    data={formData.program}
                    onChange={(data) => setFormData({ ...formData, program: data })}
                    jalurMasuk={jalurMasuk}
                    programStudi={programStudi}
                    gelombang={gelombang}
                    onNext={handleNext}
                    onPrev={() => {}}
                />;
            case 1:
                return <DataPribadiForm
                    data={formData.pribadi}
                    onChange={(data) => setFormData({ ...formData, pribadi: data })}
                    onNext={handleNext}
                    onPrev={() => setCurrentStep(0)}
                />;
            case 2:
                return <DataAkademikForm
                    data={formData.akademik}
                    onChange={(data) => setFormData({ ...formData, akademik: data })}
                    onNext={handleNext}
                    onPrev={() => setCurrentStep(1)}
                />;
            case 3:
                return <DataOrangTuaForm
                    data={formData.orangTua}
                    onChange={(data) => setFormData({ ...formData, orangTua: data })}
                    onSubmit={handleSubmit}
                    onPrev={() => setCurrentStep(2)}
                />;
            default:
                return null;
        }
    };

    const handleSubmit = async (data: any) => {
        const finalData = {
            // Data Program
            jalur_masuk_id: formData.program.jalur_masuk_id,
            program_studi_id: formData.program.program_studi_id,
            gelombang_id: gelombang.id,
            
            // Data Pribadi
            nama_lengkap: formData.pribadi.nama_lengkap,
            nik: formData.pribadi.nik,
            tempat_lahir: formData.pribadi.tempat_lahir,
            tanggal_lahir: formData.pribadi.tanggal_lahir,
            jenis_kelamin: formData.pribadi.jenis_kelamin,
            
            // Data Akademik
            asal_sekolah: formData.akademik.asal_sekolah,
            jurusan_sekolah: formData.akademik.jurusan_sekolah,
            tahun_lulus: formData.akademik.tahun_lulus,
            nilai_rata_rata: formData.akademik.nilai_rata_rata,
            
            // Data Orang Tua
            nama_ayah: data.nama_ayah,
            pekerjaan_ayah: data.pekerjaan_ayah,
            nama_ibu: data.nama_ibu,
            pekerjaan_ibu: data.pekerjaan_ibu,
            penghasilan_ortu: data.penghasilan_ortu
        };

        console.log('Sending data:', finalData);

        router.post(route('pmb.register.store'), finalData, {
            onSuccess: () => {
                router.visit(route('pmb.dashboard'));
            },
            onError: (errors) => {
                console.error('Registration errors:', errors);
                alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
            }
        });
    };

    return (
        <PMBLayout user={auth.user}>
            <Head title="Pendaftaran PMB" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">
                                Pendaftaran PMB
                            </h2>

                            <StepProgress 
                                currentStep={currentStep}
                                steps={steps.map((step, index) => ({
                                    ...step,
                                    completed: index < currentStep
                                }))}
                            />

                            <div className="mt-8">
                                {renderStep()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PMBLayout>
    );
} 
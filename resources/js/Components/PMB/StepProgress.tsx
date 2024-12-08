import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface Props {
    currentStep: number;
    steps: Array<{
        title: string;
        description: string;
        completed: boolean;
    }>;
}

export default function StepProgress({ currentStep, steps }: Props) {
    return (
        <div className="w-full py-6">
            <div className="flex">
                {steps.map((step, index) => (
                    <div key={index} className="flex-1">
                        <div className="relative">
                            {/* Garis penghubung */}
                            {index < steps.length - 1 && (
                                <div className={`absolute top-1/2 w-full h-0.5 ${
                                    step.completed ? 'bg-indigo-600' : 'bg-gray-200'
                                }`} />
                            )}
                            
                            {/* Lingkaran step */}
                            <div className="relative flex items-center justify-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    currentStep === index
                                        ? 'bg-indigo-600 text-white'
                                        : step.completed
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                                    {step.completed ? '✓' : index + 1}
                                </div>
                            </div>
                            
                            {/* Teks step */}
                            <div className="mt-2 text-center">
                                <div className="text-sm font-medium">
                                    {step.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {step.description}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 
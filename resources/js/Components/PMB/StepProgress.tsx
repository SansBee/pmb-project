import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

type StepStatus = 'current' | 'complete' | 'upcoming';

interface Props {
    currentStep: number;
    steps: Array<{
        id: number;
        name: string;
        description?: string;
        status: StepStatus;
    }>;
}

export default function StepProgress({ currentStep, steps }: Props) {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
                {steps.map((step) => (
                    <li key={step.id} className="md:flex-1">
                        <div className={`
                            group pl-4 py-2 flex flex-col border-l-4 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4
                            ${step.status === 'complete' ? 'border-indigo-600' : ''}
                            ${step.status === 'current' ? 'border-indigo-600' : ''}
                            ${step.status === 'upcoming' ? 'border-gray-200' : ''}
                        `}>
                            <span className={`
                                text-xs font-semibold tracking-wide uppercase
                                ${step.status === 'complete' ? 'text-indigo-600' : ''}
                                ${step.status === 'current' ? 'text-indigo-600' : ''}
                                ${step.status === 'upcoming' ? 'text-gray-500' : ''}
                            `}>
                                {step.status === 'complete' ? (
                                    <CheckCircleIcon className="w-5 h-5 text-indigo-600" />
                                ) : (
                                    <span>{step.id}</span>
                                )}
                            </span>
                            <span className="text-sm font-medium">
                                {step.name}
                            </span>
                            {step.description && (
                                <span className="text-sm text-gray-500">
                                    {step.description}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
} 
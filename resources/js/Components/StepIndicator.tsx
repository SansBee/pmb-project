interface StepIndicatorProps {
    currentStep: number;
    steps: Array<{
        id: number;
        label: string;
    }>;
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
    return (
        <div className="mb-8">
            <div className="flex justify-between">
                {steps.map(step => (
                    <div 
                        key={step.id}
                        className={`flex items-center ${
                            currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                        }`}
                    >
                        <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-current">
                            {currentStep > step.id ? '✓' : step.id}
                        </span>
                        <span className="ml-2">{step.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
} 
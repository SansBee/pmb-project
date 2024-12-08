interface Step {
    id: number;
    name: string;
}

interface ProgressBarProps {
    steps: Step[];
    currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
    return (
        <div className="mb-8">
            <div className="flex justify-between">
                {steps.map((step) => (
                    <div 
                        key={step.id}
                        className={`flex items-center ${
                            currentStep >= step.id ? 'text-indigo-600' : 'text-gray-400'
                        }`}
                    >
                        <div className={`
                            flex items-center justify-center w-8 h-8 rounded-full 
                            ${currentStep >= step.id ? 'bg-indigo-600 text-white' : 'bg-gray-200'}
                        `}>
                            {step.id}
                        </div>
                        <span className="ml-2 text-sm font-medium">{step.name}</span>
                        {step.id !== steps.length && (
                            <div className={`
                                w-full h-1 mx-4
                                ${currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-200'}
                            `} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 
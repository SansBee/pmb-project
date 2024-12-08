interface Props {
    steps: Array<{
        label: string;
        status: 'pending' | 'current' | 'complete';
    }>;
}

export default function ProgressSteps({ steps }: Props) {
    return (
        <div className="relative">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={index} className="relative">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.status === 'complete' ? 'bg-green-500' :
                            step.status === 'current' ? 'bg-blue-500' :
                            'bg-gray-300'
                        }`}>
                            {step.status === 'complete' ? '✓' : index + 1}
                        </div>
                        <div className="text-sm mt-2">{step.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
} 
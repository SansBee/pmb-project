interface Props {
    items: Array<{
        label: string;
        value: number;
    }>;
}

export default function StatusList({ items }: Props) {
    return (
        <div className="space-y-2">
            {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                </div>
            ))}
        </div>
    );
} 
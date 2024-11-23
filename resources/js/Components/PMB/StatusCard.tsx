interface StatusCardProps {
    status: 'pending' | 'processing' | 'completed' | 'rejected';
    title: string;
    description: string;
    date?: string;
}

export default function StatusCard({ status, title, description, date }: StatusCardProps) {
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
    };

    const statusText = {
        pending: 'Menunggu',
        processing: 'Diproses',
        completed: 'Selesai',
        rejected: 'Ditolak'
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
                    {statusText[status]}
                </span>
                {date && <span className="text-sm text-gray-500">{date}</span>}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

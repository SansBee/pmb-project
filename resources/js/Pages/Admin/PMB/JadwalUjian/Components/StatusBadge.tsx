interface Props {
    status: string;
}

export default function StatusBadge({ status }: Props) {
    const getStatusColor = () => {
        switch (status) {
            case 'hadir':
                return 'bg-green-100 text-green-800';
            case 'tidak_hadir':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'hadir':
                return 'Hadir';
            case 'tidak_hadir':
                return 'Tidak Hadir';
            default:
                return 'Terdaftar';
        }
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {getStatusText()}
        </span>
    );
} 
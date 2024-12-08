interface Props {
    jadwalUjian?: {
        jenis_ujian: string;
        tanggal_ujian: string;
        lokasi: string;
        ruangan: string;
    };
}

export default function JadwalUjianCard({ jadwalUjian }: Props) {
    if (!jadwalUjian) return null;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Jadwal Ujian</h3>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Jenis Ujian:</span>
                    <span className="font-medium">{jadwalUjian.jenis_ujian}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal:</span>
                    <span className="font-medium">
                        {new Date(jadwalUjian.tanggal_ujian).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Lokasi:</span>
                    <span className="font-medium">{jadwalUjian.lokasi}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Ruangan:</span>
                    <span className="font-medium">{jadwalUjian.ruangan}</span>
                </div>
            </div>
        </div>
    );
} 
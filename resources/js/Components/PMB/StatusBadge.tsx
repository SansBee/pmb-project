import React from 'react';

export type StatusType = 'belum_daftar' | 'draft' | 'menunggu_dokumen' | 'verifikasi' | 
                 'menunggu_bayar' | 'menunggu_ujian' | 'selesai_ujian' | 
                 'lulus' | 'tidak_lulus';

interface Props {
    status: StatusType;
}

export default function StatusBadge({ status }: Props) {
    const getStatusColor = () => {
        switch(status) {
            case 'lulus':
                return 'bg-green-100 text-green-800';
            case 'tidak_lulus':
                return 'bg-red-100 text-red-800';
            case 'verifikasi':
            case 'menunggu_bayar':
            case 'menunggu_ujian':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = () => {
        return status.replace('_', ' ').toUpperCase();
    };

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
            {getStatusText()}
        </span>
    );
} 
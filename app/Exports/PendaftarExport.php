<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PendaftarExport implements FromCollection, WithHeadings, WithMapping
{
    protected $pendaftar;

    public function __construct($pendaftar)
    {
        $this->pendaftar = $pendaftar;
    }

    public function collection()
    {
        return $this->pendaftar;
    }

    public function headings(): array
    {
        return [
            'Nama Lengkap',
            'Email',
            'Program Studi',
            'Status Pendaftaran',
            'Status Pembayaran',
            'Tanggal Daftar'
        ];
    }

    public function map($row): array
    {
        return [
            $row->nama_lengkap,
            $row->email,
            $row->program_studi,
            $row->status_pendaftaran,
            $row->status_pembayaran,
            $row->created_at->format('d/m/Y H:i:s')
        ];
    }
} 
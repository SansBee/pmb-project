<?php

namespace App\Exports;

use App\Models\Pendaftaran;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PendaftarExport implements FromCollection, WithHeadings, WithMapping
{
    protected $startDate;
    protected $endDate;
    protected $status;
    protected $jalurMasuk;

    public function __construct($startDate = null, $endDate = null, $status = null, $jalurMasuk = null)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->status = $status;
        $this->jalurMasuk = $jalurMasuk;
    }

    public function collection()
    {
        $query = Pendaftaran::with(['programStudi', 'jalurMasuk', 'gelombang']);

        if ($this->startDate && $this->endDate) {
            $query->whereBetween('created_at', [$this->startDate, $this->endDate]);
        }
        
        if ($this->status) {
            $query->where('status_pendaftaran', $this->status);
        }
        
        if ($this->jalurMasuk) {
            $query->where('jalur_masuk_id', $this->jalurMasuk);
        }

        return $query->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Nama Lengkap',
            'Email',
            'Program Studi',
            'Jalur Masuk',
            'Gelombang',
            'Status Pendaftaran',
            'Status Pembayaran',
            'Tanggal Daftar'
        ];
    }

    public function map($pendaftar): array
    {
        return [
            $pendaftar->id,
            $pendaftar->nama_lengkap,
            $pendaftar->email,
            $pendaftar->programStudi->nama,
            $pendaftar->jalurMasuk->nama_jalur,
            $pendaftar->gelombang->nama_gelombang,
            $pendaftar->status_pendaftaran,
            $pendaftar->status_pembayaran,
            $pendaftar->created_at->format('d/m/Y H:i')
        ];
    }
} 
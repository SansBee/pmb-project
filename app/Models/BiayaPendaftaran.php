<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BiayaPendaftaran extends Model
{
    protected $table = 'biaya_pendaftaran';
    
    protected $fillable = [
        'program_studi_id',
        'gelombang_id',
        'jenis_biaya',
        'nominal',
        'keterangan',
        'is_active'
    ];

    protected $casts = [
        'nominal' => 'decimal:2',
        'is_active' => 'boolean'
    ];

    // Konstanta untuk jenis biaya
    const JENIS_BIAYA = [
        'PENDAFTARAN' => 'Biaya Pendaftaran',
        'SPP' => 'SPP Semester 1',
        'DAFTAR_ULANG' => 'Daftar Ulang',
        'PRAKTIKUM' => 'Biaya Praktikum',
        'SERAGAM' => 'Seragam & Perlengkapan'
    ];

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class);
    }

    public function gelombang()
    {
        return $this->belongsTo(GelombangPMB::class, 'gelombang_id');
    }

    // Format nominal to rupiah
    public function getNominalRupiahAttribute()
    {
        return 'Rp ' . number_format($this->nominal, 0, ',', '.');
    }
} 
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PendaftarUjian extends Model
{
    protected $fillable = [
        'pendaftar_id',
        'jadwal_ujian_id',
        'status',
        'nilai',
        'catatan'
    ];

    protected $table = 'pendaftar_ujian';

    public function pendaftar(): BelongsTo
    {
        return $this->belongsTo(Pendaftar::class);
    }

    public function jadwalUjian(): BelongsTo
    {
        return $this->belongsTo(JadwalUjian::class);
    }
} 
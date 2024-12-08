<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JadwalUjian extends Model
{
    protected $table = 'jadwal_ujian';
    
    protected $fillable = [
        'gelombang_id',
        'jenis_ujian',
        'tanggal_ujian',
        'lokasi',
        'ruangan',
        'kapasitas',
        'is_active'
    ];

    protected $casts = [
        'tanggal_ujian' => 'datetime',
        'is_active' => 'boolean'
    ];

    public function gelombang(): BelongsTo
    {
        return $this->belongsTo(GelombangPMB::class, 'gelombang_id');
    }

    public function pendaftar(): HasMany
    {
        return $this->hasMany(PendaftarUjian::class);
    }
} 
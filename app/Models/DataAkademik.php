<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DataAkademik extends Model
{
    protected $table = 'data_akademik';
    
    protected $fillable = [
        'pendaftar_id',
        'asal_sekolah',
        'jurusan_sekolah',
        'tahun_lulus',
        'nilai_rata_rata'
    ];

    protected $casts = [
        'nilai_rata_rata' => 'float'
    ];

    public function pendaftar(): BelongsTo
    {
        return $this->belongsTo(Pendaftar::class);
    }
} 
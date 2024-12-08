<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DataPribadi extends Model
{
    protected $table = 'data_pribadi';
    
    protected $fillable = [
        'pendaftar_id',
        'nama_lengkap',
        'nik',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin'
    ];

    protected $casts = [
        'tanggal_lahir' => 'date'
    ];

    public function pendaftar(): BelongsTo
    {
        return $this->belongsTo(Pendaftar::class);
    }
} 
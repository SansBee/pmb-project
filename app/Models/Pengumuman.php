<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    protected $table = 'pengumuman';
    
    protected $fillable = [
        'judul',
        'isi',
        'tanggal_publikasi',
        'tanggal_berakhir',
        'is_active'
    ];

    protected $casts = [
        'tanggal_publikasi' => 'datetime',
        'tanggal_berakhir' => 'datetime',
        'is_active' => 'boolean'
    ];
} 
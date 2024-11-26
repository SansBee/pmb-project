<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KontakInformasi extends Model
{
    protected $table = 'kontak_informasi';
    
    protected $fillable = [
        'jenis',
        'label',
        'nilai',
        'deskripsi',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];
} 
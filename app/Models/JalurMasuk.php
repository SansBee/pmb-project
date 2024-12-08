<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JalurMasuk extends Model
{
    use HasFactory;

    protected $table = 'jalur_masuk';
    
    protected $fillable = [
        'nama_jalur',
        'deskripsi',
        'persyaratan',
        'keuntungan',
        'biaya',
        'kuota',
        'urutan',
        'is_active'
    ];

    protected $casts = [
        'persyaratan' => 'array',
        'keuntungan' => 'array',
        'is_active' => 'boolean'
    ];
} 
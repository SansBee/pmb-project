<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    protected $table = 'berita';
    
    protected $fillable = [
        'judul',
        'slug',
        'kategori',
        'excerpt',
        'konten',
        'gambar',
        'tanggal_publikasi',
        'is_active'
    ];

    protected $casts = [
        'tanggal_publikasi' => 'datetime',
        'is_active' => 'boolean'
    ];

    const KATEGORI = [
        'berita' => 'Berita',
        'event' => 'Event',
        'pengumuman' => 'Pengumuman'
    ];
} 
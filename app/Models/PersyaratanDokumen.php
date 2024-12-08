<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersyaratanDokumen extends Model
{
    protected $table = 'persyaratan_dokumen';
    
    protected $fillable = [
        'nama_dokumen',
        'deskripsi',
        'kategori',
        'urutan',
        'format_file',
        'max_size',
        'size_type',
        'format_helper',
        'is_wajib',
        'is_active'
    ];

    protected $casts = [
        'is_wajib' => 'boolean',
        'is_active' => 'boolean'
    ];
}
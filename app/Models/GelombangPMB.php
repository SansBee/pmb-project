<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GelombangPMB extends Model
{
    protected $table = 'gelombang_pmb';
    
    protected $fillable = [
        'nama_gelombang',
        'tanggal_mulai',
        'tanggal_selesai',
        'kuota',
        'biaya',
        'aktif'
    ];
} 
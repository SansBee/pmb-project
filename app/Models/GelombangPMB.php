<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GelombangPMB extends Model
{
    protected $table = 'gelombang_pmb';
    
    protected $fillable = [
        'nama_gelombang',
        'tanggal_mulai',
        'tanggal_selesai',
        'kuota',
        'biaya',
        'is_active',
        'aktif'
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
        'aktif' => 'boolean'
    ];

    public function pendaftar(): HasMany
    {
        return $this->hasMany(Pendaftar::class, 'gelombang_id');
    }
} 
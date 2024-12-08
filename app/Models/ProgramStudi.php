<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProgramStudi extends Model
{
    protected $table = 'program_studi';
    
    protected $fillable = [
        'nama',
        'deskripsi',
        'kuota',
        'is_active'
    ];

    public function pendaftar(): HasMany
    {
        return $this->hasMany(Pendaftar::class, 'program_studi_id');
    }
} 
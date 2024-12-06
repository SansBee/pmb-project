<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramStudi extends Model
{
    protected $table = 'program_studi';
    
    protected $fillable = [
        'nama',
        'deskripsi',
        'kuota',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'kuota' => 'integer'
    ];

    // Tambahkan relasi ke pendaftar (users)
    public function pendaftar()
    {
        return $this->hasMany(User::class, 'program_studi_id');
    }
} 
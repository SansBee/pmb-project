<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    protected $table = 'pendaftaran';

    protected $fillable = [
        'user_id',
        'nama_lengkap',
        'email',
        'program_studi',
        'status_pendaftaran',
        'status_pembayaran'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Tidak perlu relasi ke program_studi karena disimpan sebagai string
} 
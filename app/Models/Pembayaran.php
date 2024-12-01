<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    protected $table = 'pembayaran';
    
    protected $fillable = [
        'pendaftar_id',
        'jumlah',
        'metode_pembayaran',
        'bukti_pembayaran',
        'status',
        'catatan'
    ];

    public function pendaftar()
    {
        return $this->belongsTo(User::class, 'pendaftar_id');
    }
} 
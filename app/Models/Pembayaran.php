<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pembayaran extends Model
{
    protected $table = 'pembayaran';

    protected $fillable = [
        'pendaftar_id',
        'jumlah',
        'metode_pembayaran',
        'bukti_pembayaran',
        'status',
        'catatan',
        'verified_at',
        'verified_by'
    ];

    protected $casts = [
        'jumlah' => 'decimal:2',
        'verified_at' => 'datetime'
    ];

    const STATUS = [
        'pending' => 'Menunggu Verifikasi',
        'verified' => 'Terverifikasi',
        'rejected' => 'Ditolak'
    ];

    public function pendaftar(): BelongsTo
    {
        return $this->belongsTo(Pendaftar::class);
    }

    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
} 
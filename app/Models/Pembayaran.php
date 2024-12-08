<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pembayaran extends Model
{
    protected $table = 'pembayaran';

    protected $fillable = [
        'pendaftar_id',
        'metode_pembayaran',
        'jumlah',
        'bukti_pembayaran',
        'status',
        'catatan',
        'verified_by',
        'verified_at'
    ];

    protected $casts = [
        'jumlah' => 'decimal:2',
        'verified_at' => 'datetime'
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
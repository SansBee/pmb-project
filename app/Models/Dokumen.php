<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dokumen extends Model
{
    protected $table = 'dokumen_pendaftar';
    
    protected $fillable = [
        'pendaftar_id',
        'persyaratan_dokumen_id',
        'file_path',
        'status',
        'catatan',
        'verified_at',
        'verified_by'
    ];

    protected $casts = [
        'verified_at' => 'datetime'
    ];

    public function pendaftar(): BelongsTo
    {
        return $this->belongsTo(Pendaftar::class);
    }

    public function persyaratan(): BelongsTo
    {
        return $this->belongsTo(PersyaratanDokumen::class, 'persyaratan_dokumen_id');
    }

    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function getFileUrlAttribute()
    {
        return asset('storage/' . $this->file_path);
    }
} 
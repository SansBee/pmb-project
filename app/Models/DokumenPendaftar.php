<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DokumenPendaftar extends Model
{
    protected $table = 'dokumen_pendaftar';
    
    protected $fillable = [
        'pendaftar_id',
        'persyaratan_dokumen_id',
        'nama_file',
        'path',
        'status',
        'verified_at',
        'verified_by'
    ];

    protected $casts = [
        'verified_at' => 'datetime'
    ];

    public function pendaftar()
    {
        return $this->belongsTo(Pendaftar::class);
    }

    public function persyaratanDokumen()
    {
        return $this->belongsTo(PersyaratanDokumen::class);
    }

    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
} 
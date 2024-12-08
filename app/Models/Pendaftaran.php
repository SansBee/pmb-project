<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Traits\LogsActivity;

class Pendaftaran extends Model
{
    use LogsActivity;

    protected $table = 'pendaftaran';

    protected $fillable = [
        'user_id',
        'nama_lengkap',
        'email',
        'program_studi_id',
        'jalur_masuk_id',
        'gelombang_id',
        'status_pendaftaran',
        'status_pembayaran'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function programStudi(): BelongsTo
    {
        return $this->belongsTo(ProgramStudi::class);
    }

    public function jalurMasuk(): BelongsTo
    {
        return $this->belongsTo(JalurMasuk::class);
    }

    public function gelombang(): BelongsTo
    {
        return $this->belongsTo(GelombangPMB::class, 'gelombang_id');
    }
} 
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Pendaftar extends Model
{
    protected $table = 'pendaftar';

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

    protected $casts = [
        'status_pendaftaran' => 'string',
        'status_pembayaran' => 'string'
    ];

    // Konstanta untuk status
    const STATUS_PENDAFTARAN = [
        'baru' => 'Pendaftar Baru',
        'verifikasi' => 'Sedang Diverifikasi',
        'diterima' => 'Diterima',
        'ditolak' => 'Ditolak'
    ];

    const STATUS_PEMBAYARAN = [
        'belum_bayar' => 'Belum Bayar',
        'lunas' => 'Lunas'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function jalurMasuk(): BelongsTo
    {
        return $this->belongsTo(JalurMasuk::class);
    }

    public function programStudi(): BelongsTo
    {
        return $this->belongsTo(ProgramStudi::class);
    }

    public function gelombang(): BelongsTo
    {
        return $this->belongsTo(GelombangPMB::class, 'gelombang_id');
    }

    public function dataPribadi(): HasOne
    {
        return $this->hasOne(DataPribadi::class);
    }

    public function dataAkademik(): HasOne
    {
        return $this->hasOne(DataAkademik::class);
    }

    public function dataOrangTua(): HasOne
    {
        return $this->hasOne(DataOrangTua::class);
    }

    public function dokumen()
    {
        return $this->hasMany(DokumenPendaftar::class);
    }

    public function pembayaran()
    {
        return $this->hasOne(Pembayaran::class);
    }
}
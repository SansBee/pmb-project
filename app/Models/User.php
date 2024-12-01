<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'program_studi_id',
        'gelombang_id',
        'is_admin',
        'status_pendaftaran',
        'status_pembayaran'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'program_studi_id');
    }

    public function gelombang()
    {
        return $this->belongsTo(GelombangPMB::class, 'gelombang_id');
    }

    public function pendaftaran()
    {
        return $this->hasOne(Pendaftaran::class);
    }

    // Tambahkan konstanta untuk status
    const STATUS_PENDAFTARAN = [
        'baru' => 'Pendaftar Baru',
        'verifikasi' => 'Sedang Diverifikasi',
        'diterima' => 'Diterima',
        'ditolak' => 'Ditolak'
    ];

    const STATUS_PEMBAYARAN = [
        'belum_bayar' => 'Belum Bayar',
        'menunggu_verifikasi' => 'Menunggu Verifikasi',
        'lunas' => 'Lunas',
        'ditolak' => 'Ditolak'
    ];
}

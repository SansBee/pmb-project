<?php

namespace Database\Seeders;

use App\Models\Notifikasi;
use App\Models\User;
use Illuminate\Database\Seeder;

class NotifikasiSeeder extends Seeder
{
    public function run()
    {
        $admin = User::where('is_admin', true)->first();

        if ($admin) {
            Notifikasi::create([
                'user_id' => $admin->id,
                'judul' => 'Selamat Datang',
                'pesan' => 'Selamat datang di sistem PMB. Silahkan kelola pendaftaran mahasiswa baru.',
                'tipe' => 'info',
                'dibaca' => false
            ]);

            Notifikasi::create([
                'user_id' => $admin->id,
                'judul' => 'Pendaftar Baru',
                'pesan' => 'Ada pendaftar baru yang perlu diverifikasi.',
                'tipe' => 'warning',
                'dibaca' => false
            ]);
        }
    }
} 
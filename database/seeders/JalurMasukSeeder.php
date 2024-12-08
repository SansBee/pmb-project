<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JalurMasuk;

class JalurMasukSeeder extends Seeder
{
    public function run()
    {
        $jalurMasuk = [
            [
                'nama_jalur' => 'Jalur Prestasi',
                'deskripsi' => 'Jalur masuk khusus bagi calon mahasiswa yang memiliki prestasi akademik maupun non-akademik',
                'persyaratan' => json_encode([
                    'Nilai rapor semester 1-5 minimal 8.0',
                    'Fotokopi rapor yang dilegalisir',
                    'Fotokopi sertifikat prestasi (jika ada)',
                    'Surat rekomendasi dari sekolah',
                    'Fotokopi Kartu Keluarga',
                    'Fotokopi KTP',
                    'Pas foto terbaru (4x6)'
                ]),
                'keuntungan' => json_encode([
                    'Tanpa tes masuk',
                    'Prioritas pemilihan kelas',
                    'Potongan biaya pendaftaran 50%',
                    'Kesempatan mendapatkan beasiswa prestasi'
                ]),
                'biaya' => 300000,
                'kuota' => 100,
                'urutan' => 1,
                'is_active' => true
            ],
            [
                'nama_jalur' => 'Jalur Reguler',
                'deskripsi' => 'Jalur masuk umum yang terbuka untuk semua calon mahasiswa baru',
                'persyaratan' => json_encode([
                    'Ijazah/Surat Keterangan Lulus SMA/SMK/MA',
                    'Fotokopi rapor semester 1-5',
                    'Fotokopi Kartu Keluarga',
                    'Fotokopi KTP',
                    'Pas foto terbaru (4x6)'
                ]),
                'keuntungan' => json_encode([
                    'Fleksibilitas waktu pendaftaran',
                    'Pilihan program studi lengkap',
                    'Kesempatan mendapatkan beasiswa prestasi',
                    'Bimbingan persiapan tes masuk'
                ]),
                'biaya' => 500000,
                'kuota' => 200,
                'urutan' => 2,
                'is_active' => true
            ]
        ];

        foreach ($jalurMasuk as $jalur) {
            JalurMasuk::create($jalur);
        }
    }
} 
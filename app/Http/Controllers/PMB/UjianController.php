<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use App\Models\JadwalUjian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UjianController extends Controller
{
    public function index()
    {
        $pendaftar = Pendaftar::with(['jalurMasuk', 'pendaftarUjian.jadwalUjian'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Cek apakah jalur reguler
        if ($pendaftar->jalurMasuk->nama_jalur !== 'Reguler') {
            return redirect()->route('pmb.dashboard')
                ->with('error', 'Halaman ini hanya untuk jalur reguler');
        }

        // Ambil jadwal ujian yang tersedia
        $jadwalUjian = JadwalUjian::where([
            'gelombang_id' => $pendaftar->gelombang_id,
            'is_active' => true
        ])->get();

        return Inertia::render('PMB/Ujian/Index', [
            'pendaftar' => $pendaftar,
            'jadwal_ujian' => $jadwalUjian
        ]);
    }
} 
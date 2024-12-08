<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use App\Models\JadwalUjian;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class JadwalUjianController extends Controller
{
    public function index()
    {
        $jadwal_ujian = JadwalUjian::with('gelombang')
            ->where('is_active', true)
            ->orderBy('tanggal_ujian', 'asc')
            ->get();

        return Inertia::render('PMB/JadwalUjian/Index', [
            'auth' => [
                'user' => Auth::user()
            ],
            'jadwal_ujian' => $jadwal_ujian
        ]);
    }
} 
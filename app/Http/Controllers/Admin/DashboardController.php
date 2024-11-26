<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Hapus withCount('users') karena belum ada relasi
        $stats = [
            'total_user' => 0,  // Nanti bisa diupdate sesuai kebutuhan
            'user_baru' => 0,
            'total_pendaftar' => 0,
            'pendaftar_baru' => 0
        ];

        // Ambil data program studi tanpa relasi users
        $stats_prodi = ProgramStudi::select('nama', 'kuota')
            ->orderBy('nama')
            ->get()
            ->map(function ($prodi) {
                return [
                    'nama' => $prodi->nama,
                    'total' => 0,  // Nanti bisa diupdate sesuai kebutuhan
                    'persentase' => 0
                ];
            });

        return Inertia::render('Admin/Dashboard/index', [
            'stats' => $stats,
            'stats_prodi' => $stats_prodi
        ]);
    }
} 
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Statistik user
        $stats = [
            'total_user' => User::count(),
            'user_baru' => User::whereDate('created_at', today())->count(),
            'user_minggu_ini' => User::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
            'user_bulan_ini' => User::whereMonth('created_at', now()->month)->count(),
        ];

        // Data user terbaru
        $users_terbaru = User::latest()
            ->take(5)
            ->get();

        // Statistik per program studi (hardcoded untuk sementara)
        $stats_prodi = [
            ['nama' => 'Teknik Informatika', 'total' => User::count(), 'kuota' => 100, 'persentase' => (User::count()/100) * 100],
            ['nama' => 'Sistem Informasi', 'total' => 0, 'kuota' => 100, 'persentase' => 0],
            ['nama' => 'Manajemen Informatika', 'total' => 0, 'kuota' => 100, 'persentase' => 0],
            ['nama' => 'Komputerisasi Akuntansi', 'total' => 0, 'kuota' => 100, 'persentase' => 0],
        ];

        // Status pendaftaran (hardcoded untuk sementara)
        $status_pendaftaran = [
            'aktif' => true,
            'gelombang' => 'Gelombang 1',
            'tanggal_mulai' => '2024-01-01',
            'tanggal_selesai' => '2024-03-31',
            'total_kuota' => 400,
            'sisa_kuota' => 400 - User::count()
        ];

        return Inertia::render('Admin/Dashboard/index', [
            'stats' => $stats,
            'users_terbaru' => $users_terbaru,
            'stats_prodi' => $stats_prodi,
            'status_pendaftaran' => $status_pendaftaran
        ]);
    }
} 
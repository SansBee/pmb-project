<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ProgramStudi;
use App\Models\GelombangPMB;
use App\Models\Pendaftar;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            // Statistik umum
            $stats = [
                'total_user' => User::count(),
                'user_baru' => User::whereDate('created_at', today())->count(),
                'total_pendaftar' => Pendaftar::count(),
                'pendaftar_baru' => Pendaftar::whereDate('created_at', today())->count(),
                'pendaftar_jalur_prestasi' => Pendaftar::where('jalur_masuk_id', 1)->count(),
                'pendaftar_jalur_reguler' => Pendaftar::where('jalur_masuk_id', 2)->count(),
                'total_terverifikasi' => Pendaftar::where('status_pendaftaran', 'terverifikasi')->count(),
                'total_diterima' => Pendaftar::where('status_pendaftaran', 'diterima')->count(),
                'total_ditolak' => Pendaftar::where('status_pendaftaran', 'ditolak')->count(),
                'total_sudah_bayar' => Pendaftar::where('status_pembayaran', 'lunas')->count(),
                'total_belum_bayar' => Pendaftar::where('status_pembayaran', 'belum_bayar')->count(),
            ];

            // Tren pendaftaran 7 hari terakhir
            $tren_pendaftaran = Pendaftar::selectRaw('DATE(created_at) as date, COUNT(*) as total')
                ->where('created_at', '>=', now()->subDays(7))
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            return Inertia::render('Admin/Dashboard/Index', [
                'stats' => $stats,
                'tren_pendaftaran' => [
                    'labels' => $tren_pendaftaran->pluck('date')->map(fn($date) => Carbon::parse($date)->format('d M')),
                    'data' => $tren_pendaftaran->pluck('total')
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Dashboard Error: ' . $e->getMessage());
            throw $e;
        }
    }
} 
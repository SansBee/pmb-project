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
        // Statistik utama
        $stats = [
            'total_pendaftar' => Pendaftar::count(),
            'pendaftar_baru' => Pendaftar::whereDate('created_at', today())->count(),
            'total_diterima' => Pendaftar::where('status_pendaftaran', 'diterima')->count(),
            'total_pembayaran' => Pendaftar::where('status_pembayaran', 'lunas')->count()
        ];

        // Tren pendaftaran 7 hari terakhir
        $tren_pendaftaran = Pendaftar::selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Status pendaftaran
        $status_pendaftaran = [
            'terverifikasi' => Pendaftar::where('status_pendaftaran', 'terverifikasi')->count(),
            'diterima' => Pendaftar::where('status_pendaftaran', 'diterima')->count(),
            'ditolak' => Pendaftar::where('status_pendaftaran', 'ditolak')->count()
        ];

        // Status pembayaran
        $status_pembayaran = [
            'belum_bayar' => Pendaftar::where('status_pembayaran', 'belum_bayar')->count(),
            'lunas' => Pendaftar::where('status_pembayaran', 'lunas')->count()
        ];

        return Inertia::render('Admin/PMB/Dashboard/Index', [
            'stats' => $stats,
            'tren_pendaftaran' => [
                'labels' => $tren_pendaftaran->pluck('date')->map(fn($date) => Carbon::parse($date)->format('d M')),
                'data' => $tren_pendaftaran->pluck('total')
            ],
            'status_pendaftaran' => $status_pendaftaran,
            'status_pembayaran' => $status_pembayaran
        ]);
    }
} 
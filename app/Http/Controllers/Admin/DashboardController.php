<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ProgramStudi;
use App\Models\Pendaftaran;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Hitung total user yang bisa login (termasuk admin)
        $total_user = User::count();

        // Hitung user baru yang register dalam 7 hari terakhir
        $user_baru = User::where('created_at', '>=', Carbon::now()->subDays(7))->count();

        // Hitung total pendaftar PMB (dari tabel pendaftaran)
        $total_pendaftar = Pendaftaran::count();

        // Hitung pendaftar PMB baru dalam 7 hari terakhir
        $pendaftar_baru = Pendaftaran::where('created_at', '>=', Carbon::now()->subDays(7))
            ->count();

        // Statistik per program studi
        $stats_prodi = ProgramStudi::all()
            ->map(function($prodi) {
                $count = Pendaftaran::where('program_studi', $prodi->nama)->count();
                $total_pendaftar = Pendaftaran::count();
                
                return [
                    'nama' => $prodi->nama,
                    'total' => $count,
                    'persentase' => $total_pendaftar > 0 
                        ? round(($count / $total_pendaftar) * 100, 1)
                        : 0
                ];
            });

        return Inertia::render('Admin/Dashboard/Index', [
            'stats' => [
                'total_user' => $total_user,        // Total user yang bisa login
                'user_baru' => $user_baru,          // User baru yang register
                'total_pendaftar' => $total_pendaftar,  // Total dari tabel pendaftaran
                'pendaftar_baru' => $pendaftar_baru    // Pendaftar baru dari tabel pendaftaran
            ],
            'stats_prodi' => $stats_prodi
        ]);
    }
} 
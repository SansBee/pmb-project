<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use App\Models\GelombangPMB;
use App\Models\Pendaftar;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $pendaftaran = Pendaftar::with(['jalurMasuk', 'programStudi', 'gelombang'])
            ->where('user_id', Auth::id())
            ->first();

        $gelombang_aktif = null;
        if (!$pendaftaran) {
            $gelombang_aktif = GelombangPMB::where('is_active', true)
                ->first();
        }

        return Inertia::render('PMB/Dashboard/Index', [
            'pendaftaran' => $pendaftaran,
            'gelombang_aktif' => $gelombang_aktif
        ]);
    }
}

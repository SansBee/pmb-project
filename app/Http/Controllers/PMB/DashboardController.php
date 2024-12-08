<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use App\Models\GelombangPMB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $gelombang = GelombangPMB::where([
            ['is_active', '=', 1],
            ['aktif', '=', 1]
        ])
        ->first([
            'id',
            'nama_gelombang',
            'tanggal_mulai',
            'tanggal_selesai'
        ]);

        return Inertia::render('PMB/Dashboard/Index', [
            'gelombang' => $gelombang,
            'has_active_gelombang' => !is_null($gelombang)
        ]);
    }
}

<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Pendaftar;

class StatusController extends Controller
{
    public function index()
    {
        $pendaftar = Pendaftar::with([
            'dataPribadi',
            'dataAkademik',
            'dataOrangTua',
            'dokumen',
            'pembayaran'
        ])
        ->where('user_id', Auth::id())
        ->first();

        return Inertia::render('PMB/Status/Index', [
            'pendaftar' => $pendaftar,
            'has_registered' => !is_null($pendaftar)
        ]);
    }
}

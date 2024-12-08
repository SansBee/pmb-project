<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StatusController extends Controller
{
    public function index()
    {
        $pendaftar = Pendaftar::with([
            'dataPribadi',
            'dataAkademik',
            'dataOrangTua',
            'programStudi',
            'jalurMasuk'
        ])->where('user_id', Auth::id())->first();

        return Inertia::render('PMB/Status/Index', [
            'pendaftar' => $pendaftar
        ]);
    }
}

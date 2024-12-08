<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ProgramStudi;
use App\Models\GelombangPMB;
use App\Models\Pendaftar;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PendaftarExport;

class LaporanController extends Controller
{
    public function index()
    {
        $stats = [
            'per_jalur' => Pendaftar::selectRaw('jalur_masuk_id, count(*) as total')
                ->groupBy('jalur_masuk_id')
                ->with('jalurMasuk')
                ->get(),
            'per_prodi' => Pendaftar::selectRaw('program_studi_id, count(*) as total')
                ->groupBy('program_studi_id')
                ->with('programStudi')
                ->get(),
            'per_status' => Pendaftar::selectRaw('status_pendaftaran, count(*) as total')
                ->groupBy('status_pendaftaran')
                ->get()
        ];

        return Inertia::render('Admin/PMB/Laporan/Index', [
            'stats' => $stats
        ]);
    }

    public function export(Request $request)
    {
        return Excel::download(new PendaftarExport(
            $request->start_date,
            $request->end_date,
            $request->status,
            $request->jalur_masuk
        ), 'laporan-pendaftar.xlsx');
    }
} 
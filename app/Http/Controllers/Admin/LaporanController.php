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
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf as PDF;

class LaporanController extends Controller
{
    public function index()
    {
        try {
            $laporan = [
                'total_pendaftar' => Pendaftar::count(),
                'total_pembayaran' => Pembayaran::where('status', 'verified')->sum('jumlah'),
                'pendaftar_per_prodi' => ProgramStudi::withCount('pendaftar')
                    ->get()
                    ->map(fn($prodi) => [
                        'nama_prodi' => $prodi->nama,
                        'total' => $prodi->pendaftar_count
                    ])->values()->all(),
                'pendaftar_per_gelombang' => GelombangPMB::withCount('pendaftar')
                    ->get()
                    ->map(fn($gelombang) => [
                        'nama_gelombang' => $gelombang->nama_gelombang,
                        'total' => $gelombang->pendaftar_count
                    ])->values()->all()
            ];

            return Inertia::render('Admin/PMB/Laporan/Index', [
                'laporan' => $laporan
            ]);
        } catch (\Exception $e) {
            Log::error('Error in LaporanController@index: ' . $e->getMessage());
            return Inertia::render('Admin/PMB/Laporan/Index', [
                'laporan' => [
                    'total_pendaftar' => 0,
                    'total_pembayaran' => 0,
                    'pendaftar_per_prodi' => [],
                    'pendaftar_per_gelombang' => []
                ]
            ]);
        }
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

    public function exportPDF()
    {
        $laporan = [
            'total_pendaftar' => Pendaftar::count(),
            'total_pembayaran' => Pembayaran::where('status', 'verified')->sum('jumlah'),
            'pendaftar_per_prodi' => ProgramStudi::withCount('pendaftar')->get(),
            'pendaftar_per_gelombang' => GelombangPMB::withCount('pendaftar')->get()
        ];

        $pdf = PDF::loadView('pdf.laporan-pmb', compact('laporan'));
        return $pdf->download('laporan-pmb.pdf');
    }
} 
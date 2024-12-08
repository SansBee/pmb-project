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
    public function index(Request $request)
    {
        // Query dasar untuk pendaftar
        $query = Pendaftar::query();

        // Filter berdasarkan tanggal
        if ($request->tanggal_mulai) {
            $query->where('created_at', '>=', $request->tanggal_mulai);
        }
        if ($request->tanggal_selesai) {
            $query->where('created_at', '<=', $request->tanggal_selesai);
        }

        // Filter berdasarkan program studi
        if ($request->program_studi_id) {
            $query->where('program_studi_id', $request->program_studi_id);
        }

        // Filter berdasarkan status
        if ($request->status) {
            $query->where('status_pendaftaran', $request->status);
        }

        // Hitung total pendaftar
        $total_pendaftar = $query->count();

        // Hitung total diterima
        $total_diterima = $query->where('status_pendaftaran', 'diterima')->count();

        // Hitung total pembayaran
        $total_pembayaran = Pembayaran::whereHas('pendaftar', function($query) {
            $query->where('status_pembayaran', 'lunas');
        })->sum('jumlah');

        // Statistik per program studi
        $per_prodi = ProgramStudi::withCount(['pendaftar' => function($query) {
            $query->where('status_pendaftaran', 'diterima');
        }])
        ->get()
        ->map(function($prodi) use ($total_pendaftar) {
            return [
                'nama' => $prodi->nama,
                'total' => $prodi->pendaftar_count,
                'persentase' => $total_pendaftar > 0 ? 
                    round(($prodi->pendaftar_count / $total_pendaftar) * 100, 1) : 0
            ];
        });

        // Statistik per gelombang
        $per_gelombang = GelombangPMB::withCount('pendaftar')
            ->get()
            ->map(function($gelombang) use ($total_pendaftar) {
                return [
                    'nama_gelombang' => $gelombang->nama_gelombang,
                    'total' => $gelombang->pendaftar_count,
                    'persentase' => $total_pendaftar > 0 ? 
                        round(($gelombang->pendaftar_count / $total_pendaftar) * 100, 1) : 0
                ];
            });

        return Inertia::render('Admin/PMB/Laporan/Index', [
            'statistik' => [
                'total_pendaftar' => $total_pendaftar,
                'total_diterima' => $total_diterima,
                'total_pembayaran' => $total_pembayaran,
                'per_prodi' => $per_prodi,
                'per_gelombang' => $per_gelombang
            ],
            'filter' => $request->only([
                'tanggal_mulai',
                'tanggal_selesai',
                'program_studi_id',
                'status'
            ])
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
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ProgramStudi;
use App\Models\GelombangPMB;
use App\Models\Pendaftaran;
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
        $query = Pendaftaran::query();

        // Filter berdasarkan tanggal
        if ($request->tanggal_mulai) {
            $query->where('created_at', '>=', $request->tanggal_mulai);
        }
        if ($request->tanggal_selesai) {
            $query->where('created_at', '<=', $request->tanggal_selesai);
        }

        // Filter berdasarkan program studi
        if ($request->program_studi_id) {
            $prodi = ProgramStudi::find($request->program_studi_id);
            if ($prodi) {
                $query->where('program_studi', $prodi->nama);
            }
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
        $total_pembayaran = 0; // Sesuaikan dengan struktur data pembayaran Anda

        // Statistik per program studi
        $per_prodi = ProgramStudi::all()
            ->map(function($prodi) use ($query) {
                $count = $query->where('program_studi', $prodi->nama)->count();
                $total = $query->count();
                
                return [
                    'nama' => $prodi->nama,
                    'total' => $count,
                    'persentase' => $total > 0 ? round(($count / $total) * 100, 1) : 0
                ];
            });

        // Statistik per gelombang
        $per_gelombang = collect([]); // Sesuaikan dengan struktur data gelombang Anda

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
        // Query dasar untuk pendaftar
        $query = Pendaftaran::query();

        // Terapkan filter yang sama dengan halaman laporan
        if ($request->tanggal_mulai) {
            $query->where('created_at', '>=', $request->tanggal_mulai);
        }
        if ($request->tanggal_selesai) {
            $query->where('created_at', '<=', $request->tanggal_selesai);
        }
        if ($request->program_studi_id) {
            $prodi = ProgramStudi::find($request->program_studi_id);
            if ($prodi) {
                $query->where('program_studi', $prodi->nama);
            }
        }
        if ($request->status) {
            $query->where('status_pendaftaran', $request->status);
        }

        // Ambil data untuk di-export
        $pendaftar = $query->get();

        // Export ke Excel menggunakan package Laravel Excel
        return Excel::download(new PendaftarExport($pendaftar), 'laporan-pmb.xlsx');
    }
} 
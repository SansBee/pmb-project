<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PendaftarController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Pendaftar::with([
                'user',
                'programStudi',
                'jalurMasuk',
                'gelombang',
                'dataPribadi'
            ]);

            // Filter berdasarkan pencarian
            if ($request->search) {
                $query->whereHas('dataPribadi', function($q) use ($request) {
                    $q->where('nama_lengkap', 'like', "%{$request->search}%")
                      ->orWhere('nik', 'like', "%{$request->search}%");
                });
            }

            // Filter berdasarkan status
            if ($request->status) {
                $query->where('status', $request->status);
            }

            $pendaftar = $query->latest()->paginate(10);

            return Inertia::render('Admin/PMB/Pendaftar/Index', [
                'pendaftar' => $pendaftar,
                'filters' => $request->only(['search', 'status']),
                'status_list' => [
                    'draft' => 'Draft',
                    'menunggu_dokumen' => 'Menunggu Dokumen',
                    'verifikasi' => 'Verifikasi',
                    'menunggu_bayar' => 'Menunggu Pembayaran',
                    'menunggu_ujian' => 'Menunggu Ujian',
                    'selesai_ujian' => 'Selesai Ujian',
                    'lulus' => 'Lulus',
                    'tidak_lulus' => 'Tidak Lulus'
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error in PendaftarController@index: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan. Silakan coba lagi.');
        }
    }

    public function show($id)
    {
        $pendaftar = Pendaftar::with([
            'user',
            'dataPribadi',
            'dataAkademik',
            'dataOrangTua',
            'programStudi',
            'jalurMasuk',
            'gelombang',
            'dokumen',
            'pembayaran'
        ])->findOrFail($id);

        return Inertia::render('Admin/PMB/Pendaftar/Show', [
            'pendaftar' => $pendaftar
        ]);
    }

    public function verifikasiDokumen(Request $request, $id)
    {
        $request->validate([
            'dokumen_id' => 'required|exists:dokumen_pendaftar,id',
            'status' => 'required|in:verified,rejected',
            'catatan' => 'nullable|string'
        ]);

        $pendaftar = Pendaftar::findOrFail($id);
        $dokumen = $pendaftar->dokumen()->findOrFail($request->dokumen_id);
        
        $dokumen->update([
            'status' => $request->status,
            'catatan' => $request->catatan,
            'verified_at' => now(),
            'verified_by' => Auth::id()
        ]);

        // Update status pendaftar jika semua dokumen terverifikasi
        if ($request->status === 'verified' && 
            $pendaftar->dokumen()->where('status', '!=', 'verified')->count() === 0) {
            $pendaftar->update(['status' => 'menunggu_bayar']);
        }

        return back()->with('success', 'Dokumen berhasil diverifikasi');
    }

    public function verifikasiPembayaran(Request $request, $id)
    {
        $request->validate([
            'pembayaran_id' => 'required|exists:pembayaran,id',
            'status' => 'required|in:verified,rejected',
            'catatan' => 'nullable|string'
        ]);

        $pendaftar = Pendaftar::findOrFail($id);
        $pembayaran = $pendaftar->pembayaran()->findOrFail($request->pembayaran_id);
        
        $pembayaran->update([
            'status' => $request->status,
            'catatan' => $request->catatan,
            'verified_at' => now(),
            'verified_by' => Auth::id()
        ]);

        // Update status pendaftar
        if ($request->status === 'verified') {
            $pendaftar->update(['status' => 'menunggu_ujian']);
        }

        return back()->with('success', 'Pembayaran berhasil diverifikasi');
    }
} 
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use App\Models\DokumenPendaftar;
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
            'programStudi',
            'jalurMasuk',
            'gelombang',
            'dataPribadi',
            'dataAkademik',
            'dataOrangTua',
            'dokumen.persyaratanDokumen',
            'pembayaran'
        ])->findOrFail($id);

        return Inertia::render('Admin/PMB/Pendaftar/Show', [
            'pendaftar' => $pendaftar
        ]);
    }

    public function verifikasiDokumen(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:verified,rejected'
        ]);

        $dokumen = DokumenPendaftar::findOrFail($id);
        $dokumen->update([
            'status' => $request->status,
            'verified_at' => now(),
            'verified_by' => Auth::id()
        ]);

        return response()->json(['message' => 'Dokumen berhasil diverifikasi']);
    }

    public function verifikasiPembayaran(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:verified,rejected'
        ]);

        try {
            $pendaftar = Pendaftar::findOrFail($id);
            $pembayaran = $pendaftar->pembayaran;
            
            $pembayaran->update([
                'status' => $request->status,
                'verified_at' => now(),
                'verified_by' => Auth::id()
            ]);

            if ($request->status === 'verified') {
                $pendaftar->update([
                    'status' => 'menunggu_ujian',
                    'status_pembayaran' => 'verified'
                ]);
            } else {
                $pendaftar->update([
                    'status_pembayaran' => 'rejected'
                ]);
            }

            return back()->with('success', 'Pembayaran berhasil diverifikasi');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal memverifikasi pembayaran');
        }
    }
} 
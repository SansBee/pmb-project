<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class PembayaranController extends Controller
{
    public function index()
    {
        try {
            $pendaftar = Pendaftar::with(['pembayaran', 'programStudi', 'gelombang'])
                ->where('user_id', Auth::id())
                ->firstOrFail();

            // Ambil biaya pendaftaran sesuai program studi dan gelombang
            $biaya = \App\Models\BiayaPendaftaran::where([
                'program_studi_id' => $pendaftar->program_studi_id,
                'gelombang_id' => $pendaftar->gelombang_id,
                'is_active' => true
            ])->first();

            // Metode pembayaran yang tersedia
            $metodePembayaran = [
                [
                    'id' => 'bca',
                    'nama' => 'Bank BCA',
                    'nomor_rekening' => '1234567890',
                    'atas_nama' => 'Universitas XYZ'
                ],
                [
                    'id' => 'bni',
                    'nama' => 'Bank BNI',
                    'nomor_rekening' => '0987654321',
                    'atas_nama' => 'Universitas XYZ'
                ],
                [
                    'id' => 'mandiri',
                    'nama' => 'Bank Mandiri',
                    'nomor_rekening' => '2468135790',
                    'atas_nama' => 'Universitas XYZ'
                ]
            ];

            return Inertia::render('PMB/Register/Pembayaran', [
                'pendaftar' => $pendaftar,
                'biaya' => [
                    'jumlah' => $biaya->nominal,
                    'keterangan' => $biaya->keterangan,
                    'jenis_biaya' => $biaya->jenis_biaya,
                    'program_studi' => $pendaftar->programStudi->nama,
                    'gelombang' => $pendaftar->gelombang->nama_gelombang
                ],
                'metode_pembayaran' => $metodePembayaran
            ]);
        } catch (\Exception $e) {
            Log::error('Error in PembayaranController@index: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Terjadi kesalahan saat memuat halaman pembayaran.']);
        }
    }

    public function upload(Request $request)
    {
        $request->validate([
            'metode_pembayaran' => 'required|string',
            'bukti_pembayaran' => 'required|file|max:2048|mimes:jpg,jpeg,png,pdf'
        ]);

        $pendaftar = Pendaftar::where('user_id', Auth::id())->firstOrFail();

        // Upload file bukti pembayaran
        $path = $request->file('bukti_pembayaran')->store('public/pembayaran');
        $fileName = str_replace('public/', '', $path);

        // Simpan data pembayaran
        $pembayaran = $pendaftar->pembayaran()->create([
            'metode_pembayaran' => $request->metode_pembayaran,
            'jumlah' => 150000, // sesuaikan dengan biaya yang ditentukan
            'bukti_pembayaran' => $fileName,
            'status' => 'pending'
        ]);

        // Update status pendaftar
        $pendaftar->update([
            'status_pembayaran' => 'menunggu_verifikasi'
        ]);

        return back()->with('success', 'Bukti pembayaran berhasil diupload');
    }
} 
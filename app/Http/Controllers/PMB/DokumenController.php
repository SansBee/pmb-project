<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use App\Models\DokumenPendaftar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class DokumenController extends Controller
{
    public function index()
    {
        try {
            $pendaftar = Pendaftar::with('dokumen')
                ->where('user_id', Auth::id())
                ->firstOrFail();

            // Ambil data dari tabel persyaratan_dokumen
            $persyaratanDokumen = \App\Models\PersyaratanDokumen::select([
                'id',
                'nama_dokumen',
                'deskripsi',
                'format_file',
                'is_wajib as required'
            ])
            ->where('is_active', true)
            ->get();

            return Inertia::render('PMB/Register/Dokumen', [
                'pendaftar' => $pendaftar,
                'required_docs' => $persyaratanDokumen
            ]);
        } catch (\Exception $e) {
            Log::error('Error in DokumenController@index: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Terjadi kesalahan saat memuat halaman.']);
        }
    }

    public function upload(Request $request)
    {
        try {
            $request->validate([
                'dokumen_id' => 'required|exists:persyaratan_dokumen,id',
                'file' => 'required|file|max:2048|mimes:jpg,jpeg,png,pdf'
            ]);

            $pendaftar = Pendaftar::where('user_id', Auth::id())->firstOrFail();
            $persyaratanDokumen = \App\Models\PersyaratanDokumen::findOrFail($request->dokumen_id);

            // Upload file
            $path = $request->file('file')->store('public/dokumen');
            $fileName = str_replace('public/', '', $path);

            // Simpan data dokumen
            $dokumen = $pendaftar->dokumen()->create([
                'persyaratan_dokumen_id' => $persyaratanDokumen->id,
                'nama_dokumen' => $persyaratanDokumen->nama_dokumen,
                'file_path' => $fileName,
                'status' => 'pending'
            ]);

            return back()->with('success', 'Dokumen berhasil diupload');
        } catch (\Exception $e) {
            Log::error('Error in DokumenController@upload: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Gagal mengupload dokumen.']);
        }
    }
} 
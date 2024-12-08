<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use App\Models\PersyaratanDokumen;
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
            $pendaftar = Pendaftar::with(['dokumen.persyaratan'])
                ->where('user_id', Auth::id())
                ->first();

            // Ambil persyaratan dokumen yang aktif
            $persyaratan = PersyaratanDokumen::where('is_active', true)
                ->orderBy('urutan')
                ->get();

            return Inertia::render('PMB/Dokumen/Index', [
                'pendaftar' => $pendaftar,
                'dokumen' => $pendaftar ? $pendaftar->dokumen : [],
                'persyaratan' => $persyaratan
            ]);
        } catch (\Exception $e) {
            Log::error('Error in DokumenController@index: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Terjadi kesalahan saat memuat dokumen.']);
        }
    }

    public function upload(Request $request)
    {
        try {
            $request->validate([
                'persyaratan_id' => 'required|exists:persyaratan_dokumen,id',
                'file' => 'required|file|max:2048' // Maksimal 2MB
            ]);

            $pendaftar = Pendaftar::where('user_id', Auth::id())->firstOrFail();
            $persyaratan = PersyaratanDokumen::findOrFail($request->persyaratan_id);

            // Validasi format file sesuai persyaratan
            if ($persyaratan->format_file) {
                $formats = explode(',', $persyaratan->format_file);
                $request->validate([
                    'file' => 'mimes:' . implode(',', $formats)
                ]);
            }

            // Validasi ukuran file sesuai persyaratan
            if ($persyaratan->max_size) {
                $maxSize = $persyaratan->max_size;
                if ($persyaratan->size_type === 'MB') {
                    $maxSize *= 1024; // Convert to KB
                }
                $request->validate([
                    'file' => 'max:' . $maxSize
                ]);
            }

            // Upload file
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('public/dokumen', $fileName);

            // Hapus dokumen lama jika ada
            $existingDoc = DokumenPendaftar::where([
                'pendaftar_id' => $pendaftar->id,
                'persyaratan_dokumen_id' => $persyaratan->id
            ])->first();

            if ($existingDoc) {
                Storage::delete('public/dokumen/' . $existingDoc->nama_file);
                $existingDoc->delete();
            }

            // Simpan dokumen baru
            DokumenPendaftar::create([
                'pendaftar_id' => $pendaftar->id,
                'persyaratan_dokumen_id' => $persyaratan->id,
                'nama_file' => $fileName,
                'path' => str_replace('public/', '', $path),
                'status' => 'pending'
            ]);

            return back()->with('success', 'Dokumen berhasil diupload.');
        } catch (\Exception $e) {
            Log::error('Error uploading document: ' . $e->getMessage());
            return back()->withErrors(['message' => 'Gagal mengupload dokumen: ' . $e->getMessage()]);
        }
    }
} 
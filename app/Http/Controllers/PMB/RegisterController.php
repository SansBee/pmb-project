<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use App\Models\JalurMasuk;
use App\Models\ProgramStudi;
use App\Models\GelombangPMB;
use App\Models\Pendaftar;
use App\Models\PersyaratanDokumen;
use App\Models\DokumenPendaftar;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    public function index()
    {
        // Ambil data yang diperlukan untuk form
        $jalur_masuk = JalurMasuk::where('is_active', true)->get();
        $program_studi = ProgramStudi::where('is_active', true)->get();
        $gelombang = GelombangPMB::where('is_active', true)->first();

        return Inertia::render('PMB/Register/Index', [
            'jalurMasuk' => $jalur_masuk,
            'programStudi' => $program_studi,
            'gelombang' => $gelombang
        ]);
    }

    public function store(Request $request)
    {
        try {
            Log::info('Received registration data:', $request->all());

            $request->validate([
                // Data Program
                'jalur_masuk_id' => 'required|exists:jalur_masuk,id',
                'program_studi_id' => 'required|exists:program_studi,id',
                'gelombang_id' => 'required|exists:gelombang_pmb,id',
                
                // Data Pribadi
                'nama_lengkap' => 'required|string|max:255',
                'nik' => 'required|string|size:16|unique:data_pribadi,nik',
                'tempat_lahir' => 'required|string|max:255',
                'tanggal_lahir' => 'required|date',
                'jenis_kelamin' => 'required|in:L,P',
                
                // Data Akademik
                'asal_sekolah' => 'required|string|max:255',
                'jurusan_sekolah' => 'required|string',
                'tahun_lulus' => 'required|digits:4',
                'nilai_rata_rata' => 'required|numeric|min:0|max:100',
                
                // Data Orang Tua
                'nama_ayah' => 'required|string|max:255',
                'pekerjaan_ayah' => 'required|string',
                'nama_ibu' => 'required|string|max:255',
                'pekerjaan_ibu' => 'required|string',
                'penghasilan_ortu' => 'required|string'
            ]);

            DB::beginTransaction();
            try {
                Log::info('Creating pendaftar with data:', [
                    'user_id' => Auth::id(),
                    'jalur_masuk_id' => $request->jalur_masuk_id,
                    'program_studi_id' => $request->program_studi_id,
                    'gelombang_id' => $request->gelombang_id,
                    // ... log data lainnya
                ]);

                // Buat pendaftar baru
                $pendaftar = Pendaftar::create([
                    'user_id' => Auth::id(),
                    'jalur_masuk_id' => $request->jalur_masuk_id,
                    'program_studi_id' => $request->program_studi_id,
                    'gelombang_id' => $request->gelombang_id,
                    'nama_lengkap' => $request->nama_lengkap,
                    'email' => Auth::user()->email,
                    'status_pendaftaran' => 'baru',
                    'status_pembayaran' => 'belum_bayar'
                ]);

                Log::info('Created pendaftar:', $pendaftar->toArray());

                // Simpan data pribadi
                $pendaftar->dataPribadi()->create([
                    'nama_lengkap' => $request->nama_lengkap,
                    'nik' => $request->nik,
                    'tempat_lahir' => $request->tempat_lahir,
                    'tanggal_lahir' => $request->tanggal_lahir,
                    'jenis_kelamin' => $request->jenis_kelamin
                ]);

                // Simpan data akademik
                $pendaftar->dataAkademik()->create([
                    'asal_sekolah' => $request->asal_sekolah,
                    'jurusan_sekolah' => $request->jurusan_sekolah,
                    'tahun_lulus' => $request->tahun_lulus,
                    'nilai_rata_rata' => $request->nilai_rata_rata
                ]);

                // Simpan data orang tua
                $pendaftar->dataOrangTua()->create([
                    'nama_ayah' => $request->nama_ayah,
                    'pekerjaan_ayah' => $request->pekerjaan_ayah,
                    'nama_ibu' => $request->nama_ibu,
                    'pekerjaan_ibu' => $request->pekerjaan_ibu,
                    'penghasilan_ortu' => $request->penghasilan_ortu
                ]);

                DB::commit();
                return redirect()->route('pmb.dashboard')
                    ->with('success', 'Pendaftaran berhasil! Silakan lengkapi dokumen yang diperlukan.');
            } catch (\Exception $e) {
                DB::rollback();
                Log::error('Error creating pendaftar:', [
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                throw $e;
            }
        } catch (\Exception $e) {
            Log::error('Error in registration:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->withErrors(['message' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    public function getPersyaratanDokumen()
    {
        $persyaratan = PersyaratanDokumen::where('is_active', true)
            ->orderBy('urutan')
            ->orderBy('kategori')
            ->get();
        return response()->json($persyaratan);
    }

    public function uploadDokumen(Request $request)
    {
        $request->validate([
            'persyaratan_dokumen_id' => 'required|exists:persyaratan_dokumen,id',
            'file' => 'required|file'
        ]);

        // Ambil persyaratan dokumen
        $persyaratan = PersyaratanDokumen::findOrFail($request->persyaratan_dokumen_id);
        
        // Validasi format file jika ada
        if ($persyaratan->format_file) {
            $allowed_formats = explode(',', $persyaratan->format_file);
            $extension = $request->file('file')->getClientOriginalExtension();
            if (!in_array($extension, $allowed_formats)) {
                return response()->json([
                    'message' => 'Format file tidak sesuai. Format yang diizinkan: ' . $persyaratan->format_file
                ], 422);
            }
        }

        // Validasi ukuran file
        if ($persyaratan->max_size) {
            $max_size = $persyaratan->max_size;
            if ($persyaratan->size_type === 'MB') {
                $max_size *= 1024;
            }
            $request->validate([
                'file' => "max:{$max_size}"
            ]);
        }

        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = $file->storeAs('dokumen-pendaftar', $filename, 'public');

        // Simpan data dokumen
        $pendaftar = Pendaftar::where('user_id', Auth::id())->firstOrFail();
        
        DokumenPendaftar::create([
            'pendaftar_id' => $pendaftar->id,
            'persyaratan_dokumen_id' => $request->persyaratan_dokumen_id,
            'nama_file' => $file->getClientOriginalName(),
            'path' => $path,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Dokumen berhasil diupload',
            'path' => $path
        ]);
    }
}
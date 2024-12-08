<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    public function index()
    {
        // Cek apakah user sudah pernah mendaftar
        $pendaftaran = Pendaftar::with(['dataPribadi', 'dataAkademik', 'dataOrangTua'])
            ->where('user_id', Auth::id())
            ->first();

        return Inertia::render('PMB/Register/Index', [
            'jalur_masuk' => \App\Models\JalurMasuk::where('is_active', true)
                ->get()
                ->map(fn($jalur) => [
                    'id' => $jalur->id,
                    'nama_jalur' => $jalur->nama_jalur
                ]),
            'program_studi' => \App\Models\ProgramStudi::where('is_active', true)
                ->get(['id', 'nama']),
            'gelombang' => \App\Models\GelombangPMB::where([
                ['is_active', '=', 1],
                ['aktif', '=', 1]
            ])
            ->first([
                'id',
                'nama_gelombang',
                'tanggal_mulai',
                'tanggal_selesai'
            ]),
            'pendaftaran' => $pendaftaran
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
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
                
                // Data Program
                'jalur_masuk_id' => 'required|exists:jalur_masuk,id',
                'program_studi_id' => 'required|exists:program_studi,id',
                'gelombang_id' => 'required|exists:gelombang_pmb,id',
                
                // Data Orang Tua
                'nama_ayah' => 'required|string|max:255',
                'pekerjaan_ayah' => 'required|string',
                'nama_ibu' => 'required|string|max:255',
                'pekerjaan_ibu' => 'required|string',
                'penghasilan_ortu' => 'required|string'
            ]);

            DB::beginTransaction();

            // Log data request
            Log::info('Data request:', $request->all());

            // Cek apakah sudah pernah mendaftar
            $existingPendaftar = Pendaftar::where('user_id', Auth::id())->first();
            if ($existingPendaftar) {
                DB::rollback();
                return back()->withErrors(['message' => 'Anda sudah pernah mendaftar.']);
            }

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

            // Log pendaftar yang dibuat
            Log::info('Pendaftar created:', $pendaftar->toArray());

            try {
                // Simpan data pribadi
                $dataPribadi = $pendaftar->dataPribadi()->create([
                    'nama_lengkap' => $request->nama_lengkap,
                    'nik' => $request->nik,
                    'tempat_lahir' => $request->tempat_lahir,
                    'tanggal_lahir' => $request->tanggal_lahir,
                    'jenis_kelamin' => $request->jenis_kelamin
                ]);
                Log::info('Data pribadi created:', $dataPribadi->toArray());

                // Simpan data akademik
                $dataAkademik = $pendaftar->dataAkademik()->create([
                    'asal_sekolah' => $request->asal_sekolah,
                    'jurusan_sekolah' => $request->jurusan_sekolah,
                    'tahun_lulus' => $request->tahun_lulus,
                    'nilai_rata_rata' => $request->nilai_rata_rata
                ]);
                Log::info('Data akademik created:', $dataAkademik->toArray());

                // Simpan data orang tua
                $dataOrangTua = $pendaftar->dataOrangTua()->create([
                    'nama_ayah' => $request->nama_ayah,
                    'pekerjaan_ayah' => $request->pekerjaan_ayah,
                    'nama_ibu' => $request->nama_ibu,
                    'pekerjaan_ibu' => $request->pekerjaan_ibu,
                    'penghasilan_ortu' => $request->penghasilan_ortu
                ]);
                Log::info('Data orang tua created:', $dataOrangTua->toArray());

            } catch (\Exception $e) {
                Log::error('Error creating related data: ' . $e->getMessage());
                DB::rollback();
                throw $e;
            }

            DB::commit();
            return redirect()->route('pmb.dashboard')
                ->with('success', 'Pendaftaran berhasil! Silahkan lengkapi dokumen yang diperlukan.');

        } catch (\Exception $e) {
            Log::error('Error in registration: ' . $e->getMessage());
            DB::rollback();
            return back()->withErrors(['message' => 'Terjadi kesalahan saat mendaftar: ' . $e->getMessage()]);
        }
    }
}
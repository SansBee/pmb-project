<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use App\Models\Pendaftar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PendaftarController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'program.jalur_masuk_id' => 'required|exists:jalur_masuk,id',
            'program.program_studi_id' => 'required|exists:program_studi,id',
            'program.gelombang_id' => 'required|exists:gelombang_pmb,id',
            'pribadi.nama_lengkap' => 'required|string',
            'pribadi.nik' => 'required|string|size:16|unique:data_pribadi,nik',
            'pribadi.tempat_lahir' => 'required|string',
            'pribadi.tanggal_lahir' => 'required|date',
            'pribadi.jenis_kelamin' => 'required|in:L,P',
            'akademik.asal_sekolah' => 'required|string',
            'akademik.jurusan_sekolah' => 'required|string',
            'akademik.tahun_lulus' => 'required|digits:4',
            'akademik.nilai_rata_rata' => 'required|numeric|min:0|max:100',
            'orangTua.nama_ayah' => 'required|string',
            'orangTua.pekerjaan_ayah' => 'required|string',
            'orangTua.nama_ibu' => 'required|string',
            'orangTua.pekerjaan_ibu' => 'required|string',
            'orangTua.penghasilan_ortu' => 'required|string'
        ]);

        DB::beginTransaction();
        try {
            $pendaftar = Pendaftar::create([
                'user_id' => Auth::id(),
                'nama_lengkap' => $request->pribadi['nama_lengkap'],
                'email' => Auth::user()->email,
                'program_studi_id' => $request->program['program_studi_id'],
                'jalur_masuk_id' => $request->program['jalur_masuk_id'],
                'gelombang_id' => $request->program['gelombang_id'],
                'status_pendaftaran' => 'baru',
                'status_pembayaran' => 'belum_bayar'
            ]);

            $pendaftar->dataPribadi()->create($request->pribadi);
            $pendaftar->dataAkademik()->create($request->akademik);
            $pendaftar->dataOrangTua()->create($request->orangTua);

            DB::commit();
            return redirect()->route('pmb.dashboard')
                ->with('success', 'Pendaftaran berhasil! Silakan lengkapi dokumen yang diperlukan.');
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
} 
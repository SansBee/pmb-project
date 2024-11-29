<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JadwalUjian;
use App\Models\GelombangPMB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JadwalUjianController extends Controller
{
    public function index()
    {
        $jadwal = JadwalUjian::with('gelombang')->get();
        $gelombang = GelombangPMB::where('is_active', true)->get();

        return Inertia::render('Admin/PMB/JadwalUjian/Index', [
            'jadwal' => $jadwal,
            'gelombang' => $gelombang
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'gelombang_id' => 'required|exists:gelombang_pmb,id',
            'jenis_ujian' => 'required',
            'tanggal_ujian' => 'required|date',
            'lokasi' => 'required',
            'ruangan' => 'required',
            'kapasitas' => 'required|numeric|min:1'
        ]);

        JadwalUjian::create($request->all());

        return redirect()->back()->with('message', 'Jadwal ujian berhasil ditambahkan');
    }

    public function update(Request $request, JadwalUjian $jadwal)
    {
        $request->validate([
            'jenis_ujian' => 'required',
            'tanggal_ujian' => 'required|date'
        ]);

        $jadwal->update($request->all());

        return redirect()->back()->with('message', 'Jadwal ujian berhasil diupdate');
    }

    public function destroy(JadwalUjian $jadwal)
    {
        $jadwal->delete();
        return redirect()->back()->with('message', 'Jadwal ujian berhasil dihapus');
    }
} 
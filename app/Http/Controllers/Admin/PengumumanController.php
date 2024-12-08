<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pendaftar;
use App\Events\PengumumanKelulusanEvent;

class PengumumanController extends Controller
{
    public function index()
    {
        $pengumuman = Pengumuman::orderBy('tanggal_publikasi', 'desc')->get();

        return Inertia::render('Admin/PMB/Pengumuman/Index', [
            'pengumuman' => $pengumuman
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required',
            'isi' => 'required',
            'tanggal_publikasi' => 'required|date',
            'tanggal_berakhir' => 'nullable|date|after:tanggal_publikasi'
        ]);

        Pengumuman::create($request->all());

        return redirect()->back()->with('message', 'Pengumuman berhasil ditambahkan');
    }

    public function update(Request $request, Pengumuman $pengumuman)
    {
        $request->validate([
            'judul' => 'required',
            'isi' => 'required'
        ]);

        $pengumuman->update($request->all());

        return redirect()->back()->with('message', 'Pengumuman berhasil diupdate');
    }

    public function destroy(Pengumuman $pengumuman)
    {
        $pengumuman->delete();
        return redirect()->back()->with('message', 'Pengumuman berhasil dihapus');
    }

    public function announceResults(Request $request)
    {
        $pendaftar = Pendaftar::findOrFail($request->pendaftar_id);
        $pendaftar->update([
            'status_pendaftaran' => $request->status, // diterima/ditolak
            'keterangan' => $request->keterangan
        ]);

        // Kirim notifikasi ke pendaftar
        event(new PengumumanKelulusanEvent($pendaftar));

        return redirect()->back()->with('message', 'Status pendaftaran berhasil diupdate');
    }
} 
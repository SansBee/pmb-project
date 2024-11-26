<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendaftarController extends Controller
{
    public function index()
    {
        $pendaftar = User::with(['programStudi'])
            ->where('is_admin', false)
            ->latest()
            ->paginate(10);

        $program_studi = ProgramStudi::all();

        return Inertia::render('Admin/PMB/Pendaftar/index', [
            'pendaftar' => $pendaftar,
            'program_studi' => $program_studi
        ]);
    }

    public function show($id)
    {
        $pendaftar = User::with(['programStudi', 'dokumen', 'pembayaran'])
            ->findOrFail($id);

        return Inertia::render('Admin/PMB/Pendaftar/Show', [
            'pendaftar' => $pendaftar
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:diterima,ditolak,menunggu'
        ]);

        $pendaftar = User::findOrFail($id);
        $pendaftar->update([
            'status_pendaftaran' => $request->status
        ]);

        return redirect()->back()->with('message', 'Status pendaftar berhasil diupdate');
    }

    public function destroy($id)
    {
        $pendaftar = User::findOrFail($id);
        $pendaftar->delete();

        return redirect()->back()->with('message', 'Data pendaftar berhasil dihapus');
    }
} 
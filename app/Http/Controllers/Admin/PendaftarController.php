<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendaftarController extends Controller
{
    public function index()
    {
        $pendaftar = Pendaftaran::with(['user', 'pembayaran'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/PMB/Pendaftar/index', [
            'pendaftar' => $pendaftar
        ]);
    }

    public function updateStatus(Request $request, Pendaftaran $pendaftaran)
    {
        $pendaftaran->update([
            'status_pendaftaran' => $request->status
        ]);

        return back()->with('message', 'Status berhasil diupdate');
    }
} 
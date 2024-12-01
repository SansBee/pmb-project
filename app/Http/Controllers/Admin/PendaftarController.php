<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ProgramStudi;
use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendaftarController extends Controller
{
    public function index(Request $request)
    {
        $query = Pendaftaran::query();

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('nama_lengkap', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
            });
        }

        if ($request->status) {
            $query->where('status_pendaftaran', $request->status);
        }

        $pendaftar = $query->latest()
            ->paginate(10)
            ->through(function($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->nama_lengkap,
                    'email' => $item->email,
                    'program_studi' => [
                        'nama' => $item->program_studi
                    ],
                    'status_pendaftaran' => $item->status_pendaftaran,
                    'status_pembayaran' => $item->status_pembayaran,
                    'created_at' => $item->created_at->format('Y-m-d H:i:s')
                ];
            });

        return Inertia::render('Admin/PMB/Pendaftar/Index', [
            'pendaftar' => $pendaftar,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status
            ],
            'status_list' => [
                'baru' => 'Pendaftar Baru',
                'verifikasi' => 'Sedang Diverifikasi',
                'diterima' => 'Diterima',
                'ditolak' => 'Ditolak'
            ]
        ]);
    }

    public function show($id)
    {
        $pendaftar = User::with(['programStudi', 'gelombang'])
            ->findOrFail($id);

        return Inertia::render('Admin/PMB/Pendaftar/Show', [
            'pendaftar' => [
                'id' => $pendaftar->id,
                'name' => $pendaftar->name,
                'email' => $pendaftar->email,
                'program_studi' => $pendaftar->programStudi ? [
                    'id' => $pendaftar->programStudi->id,
                    'nama' => $pendaftar->programStudi->nama
                ] : null,
                'gelombang' => $pendaftar->gelombang ? [
                    'id' => $pendaftar->gelombang->id,
                    'nama_gelombang' => $pendaftar->gelombang->nama_gelombang
                ] : null,
                'status_pendaftaran' => $pendaftar->status_pendaftaran ?? 'baru',
                'status_pembayaran' => $pendaftar->status_pembayaran ?? 'belum_bayar',
                'created_at' => $pendaftar->created_at->format('Y-m-d H:i:s')
            ]
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
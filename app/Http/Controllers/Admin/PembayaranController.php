<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    public function index()
    {
        $pembayaran = Pembayaran::with(['pendaftar'])
            ->latest()
            ->paginate(10)
            ->through(function($item) {
                return [
                    'id' => $item->id,
                    'pendaftar' => [
                        'id' => $item->pendaftar->id,
                        'name' => $item->pendaftar->name,
                        'email' => $item->pendaftar->email,
                    ],
                    'jumlah' => $item->jumlah,
                    'metode_pembayaran' => $item->metode_pembayaran,
                    'bukti_pembayaran' => $item->bukti_pembayaran,
                    'status' => $item->status,
                    'created_at' => $item->created_at
                ];
            });

        return Inertia::render('Admin/PMB/Pembayaran/Index', [
            'pembayaran' => $pembayaran
        ]);
    }

    public function update(Request $request, $id)
    {
        $pembayaran = Pembayaran::findOrFail($id);

        $request->validate([
            'status' => 'required|in:pending,verified,rejected',
            'catatan' => 'nullable|string'
        ]);

        $pembayaran->update([
            'status' => $request->status,
            'catatan' => $request->catatan
        ]);

        // Update status pembayaran pendaftar
        if ($request->status === 'verified') {
            $pembayaran->pendaftar->update([
                'status_pembayaran' => 'lunas'
            ]);
        } elseif ($request->status === 'rejected') {
            $pembayaran->pendaftar->update([
                'status_pembayaran' => 'ditolak'
            ]);
        }

        return redirect()->back()->with('message', 'Status pembayaran berhasil diupdate');
    }
} 
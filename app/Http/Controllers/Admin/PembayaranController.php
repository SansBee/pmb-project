<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pembayaran;
use App\Notifications\PembayaranVerified;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PembayaranController extends Controller
{
    public function index()
    {
        $pembayaran = Pembayaran::with(['pendaftar'])
            ->latest()
            ->paginate(10);

        $pembayaran->data = array_map(function($item) {
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
        }, $pembayaran->items());

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

    public function verify($id)
    {
        $pembayaran = Pembayaran::findOrFail($id);
        $pembayaran->update([
            'status' => 'verified',
            'verified_at' => now(),
            'verified_by' => Auth::id()
        ]);

        // Update status pembayaran pendaftar
        $pembayaran->pendaftar->update([
            'status_pembayaran' => 'lunas'
        ]);

        // Kirim notifikasi ke pendaftar
        $pembayaran->pendaftar->notify(new PembayaranVerified($pembayaran));

        return redirect()->back()->with('message', 'Pembayaran berhasil diverifikasi');
    }

    public function showBukti($filename)
    {
        $path = storage_path('app/public/pembayaran/' . $filename);
        
        if (!file_exists($path)) {
            abort(404);
        }
        
        return response()->file($path);
    }
} 
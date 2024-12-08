<?php

namespace App\Http\Controllers\Admin;

use App\Models\Pendaftaran;
use App\Events\StatusPendaftaranUpdated;
use Illuminate\Http\Request;

class PendaftaranController
{
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:baru,verifikasi_dokumen,verifikasi_pembayaran,diterima,ditolak'
        ]);

        $pendaftaran = Pendaftaran::findOrFail($id);
        $pendaftaran->status_pendaftaran = $request->status;
        $pendaftaran->save();

        event(new StatusPendaftaranUpdated($pendaftaran));

        return redirect()->back()->with([
            'message' => 'Status pendaftaran berhasil diperbarui',
            'type' => 'success'
        ]);
    }
} 
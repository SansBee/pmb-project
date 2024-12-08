<?php

namespace App\Http\Controllers\Admin;

use App\Models\PendaftarUjian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UjianController
{
    public function updateKehadiran(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:hadir,tidak_hadir',
            'nilai' => 'required_if:status,hadir|numeric|min:0|max:100'
        ]);

        $pendaftarUjian = PendaftarUjian::findOrFail($id);
        $pendaftarUjian->update([
            'status' => $request->status,
            'nilai' => $request->status === 'hadir' ? $request->nilai : null
        ]);

        return back()->with('success', 'Status kehadiran berhasil diupdate');
    }
} 
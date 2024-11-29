<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BiayaPendaftaran;
use App\Models\ProgramStudi;
use App\Models\GelombangPMB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BiayaController extends Controller
{
    public function index()
    {
        $biaya = BiayaPendaftaran::with(['programStudi', 'gelombang'])
            ->orderBy('program_studi_id')
            ->orderBy('jenis_biaya')
            ->get()
            ->map(function($item) {
                return [
                    ...array_merge($item->toArray(), [
                        'nominal_rupiah' => 'Rp ' . number_format($item->nominal, 0, ',', '.')
                    ])
                ];
            });

        $program_studi = ProgramStudi::where('is_active', true)->get();
        $gelombang = GelombangPMB::where('is_active', true)->get();

        return Inertia::render('Admin/PMB/Biaya/Index', [
            'biaya' => $biaya,
            'program_studi' => $program_studi,
            'gelombang' => $gelombang,
            'jenis_biaya' => BiayaPendaftaran::JENIS_BIAYA
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'program_studi_id' => 'required|exists:program_studi,id',
            'gelombang_id' => 'nullable|exists:gelombang_pmb,id',
            'jenis_biaya' => 'required|string',
            'nominal' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        BiayaPendaftaran::create($request->all());

        return redirect()->back()->with('message', 'Biaya berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $biaya = BiayaPendaftaran::findOrFail($id);

        $request->validate([
            'program_studi_id' => 'required|exists:program_studi,id',
            'gelombang_id' => 'nullable|exists:gelombang_pmb,id',
            'jenis_biaya' => 'required|string',
            'nominal' => 'required|numeric|min:0',
            'keterangan' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $biaya->update($request->all());

        return redirect()->back()->with('message', 'Biaya berhasil diupdate');
    }

    public function destroy($id)
    {
        $biaya = BiayaPendaftaran::findOrFail($id);
        $biaya->delete();

        return redirect()->back()->with('message', 'Biaya berhasil dihapus');
    }
} 
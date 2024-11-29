<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GelombangPMB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GelombangController extends Controller
{
    public function index()
    {
        $gelombang = GelombangPMB::orderBy('tanggal_mulai')->get();
        
        return Inertia::render('Admin/PMB/Gelombang/Index', [
            'gelombang' => $gelombang
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_gelombang' => 'required|string|max:255',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after:tanggal_mulai',
            'kuota' => 'required|integer|min:1',
            'biaya' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        GelombangPMB::create($request->all());

        return redirect()->back()->with('message', 'Gelombang berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $gelombang = GelombangPMB::findOrFail($id);
        
        $request->validate([
            'nama_gelombang' => 'required|string|max:255',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after:tanggal_mulai',
            'kuota' => 'required|integer|min:1',
            'biaya' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        $gelombang->update($request->all());

        return redirect()->back()->with('message', 'Gelombang berhasil diupdate');
    }

    public function destroy($id)
    {
        $gelombang = GelombangPMB::findOrFail($id);
        
        try {
            $gelombang->delete();
            return redirect()->back()->with('message', 'Gelombang berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus gelombang');
        }
    }
} 
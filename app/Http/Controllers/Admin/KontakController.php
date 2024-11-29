<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KontakInformasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KontakController extends Controller
{
    public function index()
    {
        $kontak = KontakInformasi::all();

        return Inertia::render('Admin/PMB/Kontak/Index', [
            'kontak' => $kontak
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'jenis' => 'required',
            'label' => 'required',
            'nilai' => 'required'
        ]);

        KontakInformasi::create($request->all());

        return redirect()->back()->with('message', 'Kontak/Informasi berhasil ditambahkan');
    }

    public function update(Request $request, KontakInformasi $kontak)
    {
        $request->validate([
            'label' => 'required',
            'nilai' => 'required'
        ]);

        $kontak->update($request->all());

        return redirect()->back()->with('message', 'Kontak/Informasi berhasil diupdate');
    }

    public function destroy(KontakInformasi $kontak)
    {
        $kontak->delete();
        return redirect()->back()->with('message', 'Kontak/Informasi berhasil dihapus');
    }
} 
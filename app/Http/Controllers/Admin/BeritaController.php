<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index()
    {
        $berita = Berita::orderBy('tanggal_publikasi', 'desc')
            ->get()
            ->map(function($item) {
                return [
                    'id' => $item->id,
                    'judul' => $item->judul,
                    'kategori' => $item->kategori,
                    'tanggal_publikasi' => $item->tanggal_publikasi->format('Y-m-d'),
                    'is_active' => $item->is_active
                ];
            });

        return Inertia::render('Admin/PMB/Berita/Index', [
            'berita' => $berita,
            'kategori' => Berita::KATEGORI
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string',
            'excerpt' => 'required|string',
            'konten' => 'required|string',
            'gambar' => 'required|image',
            'tanggal_publikasi' => 'required|date',
            'is_active' => 'boolean'
        ]);

        // Handle gambar upload
        $gambar = $request->file('gambar')->store('berita', 'public');

        Berita::create([
            'judul' => $request->judul,
            'slug' => Str::slug($request->judul),
            'kategori' => $request->kategori,
            'excerpt' => $request->excerpt,
            'konten' => $request->konten,
            'gambar' => $gambar,
            'tanggal_publikasi' => $request->tanggal_publikasi,
            'is_active' => $request->is_active ?? true
        ]);

        return redirect()->back()->with('message', 'Berita berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string',
            'excerpt' => 'required|string',
            'konten' => 'required|string',
            'gambar' => 'nullable|image',
            'tanggal_publikasi' => 'required|date',
            'is_active' => 'boolean'
        ]);

        $data = $request->except('gambar');
        
        // Handle gambar upload jika ada
        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('berita', 'public');
        }

        $berita->update($data);

        return redirect()->back()->with('message', 'Berita berhasil diupdate');
    }

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        $berita->delete();

        return redirect()->back()->with('message', 'Berita berhasil dihapus');
    }
} 
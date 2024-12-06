<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Berita;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class BeritaController extends Controller
{
    public function index()
    {
        $berita = Berita::orderBy('tanggal_publikasi', 'desc')->get();
        return Inertia::render('Admin/PMB/Berita/Index', [
            'berita' => $berita,
            'kategori' => Berita::KATEGORI
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string',
            'excerpt' => 'required|string',
            'konten' => 'required|string',
            'gambar' => 'required|image|mimes:jpeg,png,jpg|max:10240',
            'tanggal_publikasi' => 'required|date',
            'is_active' => 'boolean'
        ]);

        if ($request->hasFile('gambar')) {
            $gambar = $request->file('gambar');
            $path = $gambar->store('berita', 'public');
            $validated['gambar'] = $path;
        }

        $validated['slug'] = Str::slug($validated['judul']);
        
        Berita::create($validated);

        return redirect()->back()->with('message', 'Berita berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $rules = [
            'judul' => 'required|string|max:255',
            'kategori' => 'required|string|in:' . implode(',', array_keys(Berita::KATEGORI)),
            'excerpt' => 'required|string',
            'konten' => 'required|string',
            'tanggal_publikasi' => 'required|date',
            'is_active' => 'boolean'
        ];

        if ($request->hasFile('gambar')) {
            $rules['gambar'] = 'image|mimes:jpeg,png,jpg|max:10240';
        }

        $validated = $request->validate($rules);

        if ($request->hasFile('gambar')) {
            if ($berita->gambar) {
                Storage::disk('public')->delete($berita->gambar);
            }
            
            $gambar = $request->file('gambar');
            $path = $gambar->store('berita', 'public');
            $validated['gambar'] = $path;
        }

        $validated['slug'] = Str::slug($validated['judul']);
        
        $berita->update($validated);

        return redirect()->back()->with('message', 'Berita berhasil diperbarui');
    }

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);

        if ($berita->gambar) {
            Storage::disk('public')->delete($berita->gambar);
        }

        $berita->delete();
        return redirect()->back()->with('message', 'Berita berhasil dihapus');
    }
} 
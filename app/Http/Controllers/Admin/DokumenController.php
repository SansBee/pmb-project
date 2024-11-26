<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PersyaratanDokumen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DokumenController extends Controller
{
    public function index(Request $request)
    {
        $dokumen = PersyaratanDokumen::query()
            ->when($request->search, fn($q) => $q->search($request->search))
            ->when($request->kategori, fn($q) => $q->byKategori($request->kategori))
            ->orderBy('kategori')
            ->orderBy('urutan')
            ->get()
            ->map(function($doc) {
                return [
                    ...$doc->toArray(),
                    'formatted_size' => $doc->formatted_size,
                    'format_description' => $doc->format_description,
                    'format_example' => $doc->format_example
                ];
            });
        
        return Inertia::render('Admin/PMB/Dokumen/index', [
            'dokumen' => $dokumen,
            'kategori_list' => PersyaratanDokumen::KATEGORI,
            'format_list' => PersyaratanDokumen::FORMAT_FILE,
            'size_type_list' => PersyaratanDokumen::SIZE_TYPE,
            'filters' => $request->only(['search', 'kategori'])
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_dokumen' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|in:' . implode(',', array_keys(PersyaratanDokumen::KATEGORI)),
            'format_file' => 'required',
            'max_size' => 'required|integer|min:1',
            'size_type' => 'required|in:KB,MB',
            'is_wajib' => 'boolean',
            'is_active' => 'boolean'
        ]);

        // Validasi format file secara manual
        $validFormats = array_keys(PersyaratanDokumen::FORMAT_FILE);
        if (!in_array($request->format_file, $validFormats)) {
            return redirect()->back()->withErrors(['format_file' => 'Format file tidak valid']);
        }

        // Set urutan berdasarkan kategori
        $lastUrutan = PersyaratanDokumen::where('kategori', $request->kategori)
            ->max('urutan');
        
        $data = $request->all();
        $data['urutan'] = ($lastUrutan ?? 0) + 1;

        PersyaratanDokumen::create($data);

        return redirect()->back()->with('message', 'Dokumen berhasil ditambahkan');
    }

    public function update(Request $request, PersyaratanDokumen $dokumen)
    {
        $request->validate([
            'nama_dokumen' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|in:' . implode(',', array_keys(PersyaratanDokumen::KATEGORI)),
            'format_file' => 'required',
            'max_size' => 'required|integer|min:1',
            'size_type' => 'required|in:KB,MB',
            'is_wajib' => 'boolean',
            'is_active' => 'boolean'
        ]);

        // Validasi format file secara manual
        $validFormats = array_keys(PersyaratanDokumen::FORMAT_FILE);
        if (!in_array($request->format_file, $validFormats)) {
            return redirect()->back()->withErrors(['format_file' => 'Format file tidak valid']);
        }

        $dokumen->update($request->all());

        return redirect()->back()->with('message', 'Dokumen berhasil diupdate');
    }

    public function destroy(PersyaratanDokumen $dokumen)
    {
        $dokumen->delete();
        return redirect()->back()->with('message', 'Dokumen berhasil dihapus');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'updates' => 'required|array',
            'updates.*.id' => 'required|exists:persyaratan_dokumen,id',
            'updates.*.urutan' => 'required|integer|min:0'
        ]);

        foreach ($request->updates as $item) {
            PersyaratanDokumen::where('id', $item['id'])
                ->update(['urutan' => $item['urutan']]);
        }

        return redirect()->back()->with('message', 'Urutan berhasil diupdate');
    }
} 
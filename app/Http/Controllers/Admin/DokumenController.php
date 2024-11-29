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
            ->when($request->search, function($query, $search) {
                $query->where('nama_dokumen', 'like', "%{$search}%");
            })
            ->when($request->kategori, function($query, $kategori) {
                $query->where('kategori', $kategori);
            })
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
        
        return Inertia::render('Admin/PMB/Dokumen/Index', [
            'dokumen' => $dokumen,
            'kategori_list' => PersyaratanDokumen::KATEGORI,
            'format_list' => PersyaratanDokumen::FORMAT_FILE,
            'size_type_list' => PersyaratanDokumen::SIZE_TYPE,
            'filters' => [
                'search' => $request->search,
                'kategori' => $request->kategori
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_dokumen' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|string',
            'format_file' => 'required|string',
            'max_size' => 'required|integer|min:1',
            'size_type' => 'required|in:KB,MB',
            'is_wajib' => 'boolean',
            'is_active' => 'boolean'
        ]);

        // Set urutan berdasarkan kategori
        $lastUrutan = PersyaratanDokumen::where('kategori', $request->kategori)
            ->max('urutan');
        
        $data = $request->all();
        $data['urutan'] = ($lastUrutan ?? 0) + 1;

        PersyaratanDokumen::create($data);

        return redirect()->back()->with('message', 'Dokumen berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $dokumen = PersyaratanDokumen::findOrFail($id);

        $request->validate([
            'nama_dokumen' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'kategori' => 'required|string',
            'format_file' => 'required|string',
            'max_size' => 'required|integer|min:1',
            'size_type' => 'required|in:KB,MB',
            'is_wajib' => 'boolean',
            'is_active' => 'boolean'
        ]);

        $dokumen->update($request->all());

        return redirect()->back()->with('message', 'Dokumen berhasil diupdate');
    }

    public function destroy($id)
    {
        $dokumen = PersyaratanDokumen::findOrFail($id);
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
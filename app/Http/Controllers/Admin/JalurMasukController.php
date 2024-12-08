<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JalurMasuk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JalurMasukController extends Controller
{
    public function index()
    {
        $jalurMasuk = JalurMasuk::orderBy('urutan')->get()->map(function($item) {
            return [
                'id' => $item->id,
                'nama_jalur' => $item->nama_jalur,
                'deskripsi' => $item->deskripsi,
                'persyaratan' => $item->persyaratan,
                'keuntungan' => $item->keuntungan,
                'biaya' => $item->biaya,
                'kuota' => $item->kuota,
                'is_active' => $item->is_active,
                'urutan' => $item->urutan,
            ];
        });
        
        return Inertia::render('Admin/PMB/JalurMasuk/Index', [
            'jalur_masuk' => $jalurMasuk,
            'flash' => [
                'message' => session('message'),
                'type' => session('type')
            ]
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'nama_jalur' => 'required|string|max:255',
                'deskripsi' => 'required|string',
                'persyaratan' => 'required',
                'keuntungan' => 'required',
                'biaya' => 'required|numeric',
                'kuota' => 'required|integer',
                'is_active' => 'boolean',
                'urutan' => 'integer'
            ]);

            $data = $request->all();
            $data['persyaratan'] = is_array($data['persyaratan']) ? 
                json_encode($data['persyaratan']) : 
                $data['persyaratan'];
            $data['keuntungan'] = is_array($data['keuntungan']) ? 
                json_encode($data['keuntungan']) : 
                $data['keuntungan'];

            JalurMasuk::create($data);

            return redirect()->back()->with([
                'message' => 'Program studi berhasil ditambahkan.',
                'type' => 'success'
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with([
                'message' => 'Terjadi kesalahan saat menambahkan program studi.',
                'type' => 'error'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $jalurMasuk = JalurMasuk::findOrFail($id);
            
            $request->validate([
                'nama_jalur' => 'required|string|max:255',
                'deskripsi' => 'required|string',
                'persyaratan' => 'required',
                'keuntungan' => 'required',
                'biaya' => 'required|numeric',
                'kuota' => 'required|integer',
                'is_active' => 'boolean',
                'urutan' => 'integer'
            ]);

            $data = $request->all();
            $data['persyaratan'] = is_array($data['persyaratan']) ? 
                json_encode($data['persyaratan']) : 
                $data['persyaratan'];
            $data['keuntungan'] = is_array($data['keuntungan']) ? 
                json_encode($data['keuntungan']) : 
                $data['keuntungan'];

            $jalurMasuk->update($data);

            return redirect()->back()->with([
                'message' => 'Program studi berhasil diperbarui.',
                'type' => 'success'
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with([
                'message' => 'Terjadi kesalahan saat memperbarui program studi.',
                'type' => 'error'
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $jalurMasuk = JalurMasuk::findOrFail($id);
            $jalurMasuk->delete();

            return redirect()->back()->with([
                'message' => 'Program studi berhasil dihapus.',
                'type' => 'success'
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with([
                'message' => 'Terjadi kesalahan saat menghapus program studi.',
                'type' => 'error'
            ]);
        }
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'updates' => 'required|array',
            'updates.*.id' => 'required|exists:jalur_masuk,id',
            'updates.*.urutan' => 'required|integer'
        ]);

        foreach ($request->updates as $update) {
            JalurMasuk::where('id', $update['id'])->update(['urutan' => $update['urutan']]);
        }

        return response()->json(['message' => 'Urutan berhasil diperbarui']);
    }
} 
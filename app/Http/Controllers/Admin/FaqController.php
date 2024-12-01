<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\FaqKategori;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index()
    {
        $faq = Faq::with('kategori')
            ->orderBy('urutan')
            ->get();
        
        $kategori = FaqKategori::orderBy('urutan')
            ->get();

        return Inertia::render('Admin/PMB/Faq/Index', [
            'faq' => $faq,
            'kategori' => $kategori
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kategori_id' => 'required|exists:faq_kategori,id',
            'pertanyaan' => 'required|string',
            'jawaban' => 'required|string',
            'urutan' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        Faq::create($request->all());

        return redirect()->back()->with('message', 'FAQ berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);

        $request->validate([
            'kategori_id' => 'required|exists:faq_kategori,id',
            'pertanyaan' => 'required|string',
            'jawaban' => 'required|string',
            'urutan' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        $faq->update($request->all());

        return redirect()->back()->with('message', 'FAQ berhasil diupdate');
    }

    public function destroy($id)
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();

        return redirect()->back()->with('message', 'FAQ berhasil dihapus');
    }
} 
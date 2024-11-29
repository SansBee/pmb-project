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
        $faq = Faq::with('kategori')->orderBy('urutan')->get();
        $kategori = FaqKategori::orderBy('urutan')->get();

        return Inertia::render('Admin/PMB/Faq/Index', [
            'faq' => $faq,
            'kategori' => $kategori
        ]);
    }

    public function storeKategori(Request $request)
    {
        $request->validate([
            'nama_kategori' => 'required',
            'urutan' => 'required|numeric'
        ]);

        FaqKategori::create($request->all());

        return redirect()->back()->with('message', 'Kategori FAQ berhasil ditambahkan');
    }

    public function storeFaq(Request $request)
    {
        $request->validate([
            'kategori_id' => 'required|exists:faq_kategori,id',
            'pertanyaan' => 'required',
            'jawaban' => 'required',
            'urutan' => 'required|numeric'
        ]);

        Faq::create($request->all());

        return redirect()->back()->with('message', 'FAQ berhasil ditambahkan');
    }

    public function update(Request $request, Faq $faq)
    {
        $request->validate([
            'pertanyaan' => 'required',
            'jawaban' => 'required'
        ]);

        $faq->update($request->all());

        return redirect()->back()->with('message', 'FAQ berhasil diupdate');
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();
        return redirect()->back()->with('message', 'FAQ berhasil dihapus');
    }
} 
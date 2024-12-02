<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $berita = Berita::where('is_active', true)
            ->orderBy('tanggal_publikasi', 'desc')
            ->take(6)
            ->get()
            ->map(function($item) {
                return [
                    'title' => $item->judul,
                    'category' => $item->kategori,
                    'date' => $item->tanggal_publikasi->format('Y-m-d'),
                    'image' => asset('storage/' . $item->gambar),
                    'excerpt' => $item->excerpt
                ];
            });

        \Log::info('Berita data:', [
            'count' => $berita->count(),
            'data' => $berita->toArray(),
            'kategori' => Berita::KATEGORI
        ]);

        return Inertia::render('Landing/Welcome', [
            'berita' => $berita,
            'kategori_berita' => Berita::KATEGORI
        ]);
    }
} 
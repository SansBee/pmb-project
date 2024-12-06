<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class WelcomeController extends Controller
{
    public function index()
    {
        $berita = Berita::where('is_active', true)
            ->orderBy('tanggal_publikasi', 'desc')
            ->take(6)
            ->get()
            ->map(function($item) {
                Log::info('Berita image path:', [
                    'original_path' => $item->gambar,
                    'storage_url' => $item->gambar ? Storage::url($item->gambar) : null,
                    'exists' => $item->gambar ? Storage::exists('public/' . $item->gambar) : false
                ]);

                $imageUrl = null;
                if ($item->gambar) {
                    $imageUrl = asset('storage/' . $item->gambar);
                }

                return [
                    'title' => $item->judul,
                    'category' => $item->kategori,
                    'date' => $item->tanggal_publikasi->format('Y-m-d'),
                    'image' => $imageUrl,
                    'excerpt' => $item->excerpt
                ];
            });

        return Inertia::render('Landing/Welcome', [
            'berita' => $berita,
            'kategori_berita' => Berita::KATEGORI
        ]);
    }
} 
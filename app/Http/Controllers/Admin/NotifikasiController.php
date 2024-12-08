<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notifikasi;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class NotifikasiController extends Controller
{
    public function index()
    {
        $notifikasi = Notifikasi::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Notifikasi/Index', [
            'notifikasi' => $notifikasi
        ]);
    }

    public function markAsRead($id)
    {
        $notifikasi = Notifikasi::findOrFail($id);
        $notifikasi->update(['dibaca' => true]);

        return redirect()->back();
    }

    public function markAllAsRead()
    {
        Notifikasi::where('user_id', Auth::id())
            ->update(['dibaca' => true]);

        return redirect()->back();
    }
} 
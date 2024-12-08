<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckPendaftaranStatus
{
    public function handle($request, Closure $next, $requiredStatus)
    {
        $pendaftar = Auth::user()->pendaftar;
        
        // Jika belum daftar, redirect ke form pendaftaran
        if (!$pendaftar && $requiredStatus !== 'belum_daftar') {
            return redirect()->route('pmb.register');
        }

        // Cek status sesuai alur
        $statusOrder = [
            'draft',
            'menunggu_dokumen',
            'menunggu_pembayaran',
            'verifikasi',
            'selesai'
        ];

        $currentIndex = array_search($pendaftar->status, $statusOrder);
        $requiredIndex = array_search($requiredStatus, $statusOrder);

        if ($currentIndex < $requiredIndex) {
            return redirect()->route('pmb.dashboard')
                ->with('error', 'Harap selesaikan tahap sebelumnya terlebih dahulu');
        }

        return $next($request);
    }
} 
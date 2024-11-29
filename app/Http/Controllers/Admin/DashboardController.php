<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_user' => 0,
            'user_baru' => 0,
            'total_pendaftar' => 0,
            'pendaftar_baru' => 0
        ];

        $stats_prodi = [];

        return Inertia::render('Admin/Dashboard/Index', [
            'stats' => $stats,
            'stats_prodi' => $stats_prodi
        ]);
    }
} 
<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PengumumanController extends Controller
{
    public function index()
    {
        return Inertia::render('PMB/Pengumuman/Index');
    }
} 
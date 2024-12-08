<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DokumenController extends Controller
{
    public function index()
    {
        return Inertia::render('PMB/Dokumen/Index');
    }
} 
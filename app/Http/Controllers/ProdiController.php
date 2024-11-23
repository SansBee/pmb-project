<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProdiController extends Controller
{
    public function ti()
    {
        return Inertia::render('Prodi/TI/index');
    }

    public function si()
    {
        return Inertia::render('Prodi/SI/index');
    }

    public function mi()
    {
        return Inertia::render('Prodi/MI/index');
    }

    public function ka()
    {
        return Inertia::render('Prodi/KA/index');
    }
} 
<?php

namespace App\Http\Controllers\PMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function create()
    {
        return Inertia::render('PMB/Register');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students',
            'phone' => 'required|string|max:20',
            'birth_date' => 'required|date',
            'birth_place' => 'required|string|max:255',
            'gender' => 'required|in:L,P',
            'address' => 'required|string',
            'school_origin' => 'required|string|max:255',
            'school_major' => 'required|string|max:255',
            'graduation_year' => 'required|integer|min:1900|max:2024', // Perbaiki aturan min:max
            'major_choice' => 'required|string|in:TI,SI,MI,KA',
            'parent_name' => 'required|string|max:255',
            'parent_phone' => 'required|string|max:20',
        ]);

        // Process registration logic here

        return redirect()->back()->with('success', 'Pendaftaran berhasil!');
    }
}
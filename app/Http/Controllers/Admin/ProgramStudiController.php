<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProgramStudi;
use Inertia\Inertia;

class ProgramStudiController extends Controller
{
    public function index()
    {
        $programStudi = ProgramStudi::all();
        return Inertia::render('Admin/PMB/ProgramStudi/Index', [
            'program_studi' => $programStudi
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:program_studi',
            'deskripsi' => 'nullable|string',
            'kuota' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        ProgramStudi::create($validated);

        return redirect()->back()->with('message', 'Program studi berhasil ditambahkan');
    }

    public function update(Request $request, ProgramStudi $programStudi)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:program_studi,nama,' . $programStudi->id,
            'deskripsi' => 'nullable|string',
            'kuota' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        $programStudi->update($validated);

        return redirect()->back()->with('message', 'Program studi berhasil diperbarui');
    }

    public function destroy(ProgramStudi $programStudi)
    {
        try {
            $programStudi->delete();
            return redirect()->back()->with('message', 'Program studi berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus program studi');
        }
    }
} 
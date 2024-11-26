<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramStudiController extends Controller
{
    public function index()
    {
        $program_studi = ProgramStudi::select('id', 'nama', 'deskripsi', 'kuota', 'is_active')
            ->orderBy('nama')
            ->get();
        
        return Inertia::render('Admin/PMB/ProgramStudi/index', [
            'program_studi' => $program_studi
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255|unique:program_studi,nama',
            'deskripsi' => 'required|string',
            'kuota' => 'required|integer|min:1',
            'is_active' => 'boolean'
        ]);

        ProgramStudi::create($request->all());

        return redirect()->back()->with('message', 'Program studi berhasil ditambahkan');
    }

    public function update(Request $request, ProgramStudi $programStudi)
    {
        $request->validate([
            'nama' => 'required|string|max:255|unique:program_studi,nama,' . $programStudi->id,
            'deskripsi' => 'required|string',
            'kuota' => 'required|integer|min:1',
            'is_active' => 'boolean'
        ]);

        $programStudi->update($request->all());

        return redirect()->back()->with('message', 'Program studi berhasil diupdate');
    }

    public function destroy(ProgramStudi $programStudi)
    {
        $programStudi->delete();
        return redirect()->back()->with('message', 'Program studi berhasil dihapus');
    }
} 
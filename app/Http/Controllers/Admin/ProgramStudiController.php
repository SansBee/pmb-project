<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProgramStudi;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

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

    public function update(Request $request, $id)
    {
        $programStudi = ProgramStudi::findOrFail($id);
        
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:program_studi,nama,' . $id,
            'deskripsi' => 'nullable|string',
            'kuota' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        $programStudi->update($validated);

        return back()->with('message', 'Program studi berhasil diperbarui');
    }

    public function destroy($id)
    {
        $programStudi = ProgramStudi::findOrFail($id);
        
        try {
            $programStudi->delete();
            return back()->with('message', 'Program studi berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus program studi');
        }
    }
} 
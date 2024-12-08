<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersyaratanDokumen extends Model
{
    protected $table = 'persyaratan_dokumen';
    
    protected $fillable = [
        'nama_dokumen',
        'deskripsi',
        'kategori',
        'urutan',
        'format_file',
        'max_size',
        'size_type',
        'format_helper',
        'is_wajib',
        'is_active'
    ];

    protected $casts = [
        'is_wajib' => 'boolean',
        'is_active' => 'boolean',
        'max_size' => 'integer',
        'urutan' => 'integer'
    ];

    // Konstanta untuk kategori
    const KATEGORI = [
        'identitas' => 'Dokumen Identitas',
        'akademik' => 'Dokumen Akademik',
        'pendukung' => 'Dokumen Pendukung',
        'khusus' => 'Dokumen Khusus'
    ];

    // Konstanta untuk format file yang valid
    const FORMAT_FILE = [
        'pdf' => 'PDF Only',
        'jpg,jpeg,png' => 'Image Only',
        'pdf,jpg,jpeg,png' => 'PDF & Image'
    ];

    const SIZE_TYPE = [
        'KB' => 'Kilobyte',
        'MB' => 'Megabyte'
    ];

    // Tambah helper text untuk format file
    const FORMAT_HELPER = [
        'pdf' => 'File PDF dengan ukuran maksimal sesuai ketentuan',
        'jpg,jpeg,png' => 'File gambar (JPG/PNG) dengan ukuran maksimal sesuai ketentuan',
        'pdf,jpg,jpeg,png' => 'File PDF atau gambar (JPG/PNG) dengan ukuran maksimal sesuai ketentuan'
    ];

    // Scope untuk filter
    public function scopeSearch($query, $search)
    {
        return $query->where('nama_dokumen', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%");
    }

    public function scopeByKategori($query, $kategori)
    {
        return $kategori ? $query->where('kategori', $kategori) : $query;
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Helper untuk konversi ukuran
    public function getFormattedSizeAttribute()
    {
        if ($this->size_type === 'MB') {
            return "{$this->max_size} MB (" . ($this->max_size * 1024) . " KB)";
        }
        return "{$this->max_size} KB";
    }

    // Helper untuk format yang diterima
    public function getFormatDescriptionAttribute()
    {
        return self::FORMAT_HELPER[$this->format_file] ?? '';
    }
}
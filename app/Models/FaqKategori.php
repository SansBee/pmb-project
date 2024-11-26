<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaqKategori extends Model
{
    protected $table = 'faq_kategori';
    
    protected $fillable = [
        'nama_kategori',
        'urutan',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function faqs()
    {
        return $this->hasMany(Faq::class, 'kategori_id');
    }
} 
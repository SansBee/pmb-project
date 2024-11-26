<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $table = 'faq';
    
    protected $fillable = [
        'kategori_id',
        'pertanyaan',
        'jawaban',
        'urutan',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    public function kategori()
    {
        return $this->belongsTo(FaqKategori::class, 'kategori_id');
    }
} 
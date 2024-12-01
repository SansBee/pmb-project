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

    public function kategori()
    {
        return $this->belongsTo(FaqKategori::class, 'kategori_id');
    }
} 
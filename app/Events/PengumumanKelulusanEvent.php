<?php

namespace App\Events;

use App\Models\Pendaftar;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PengumumanKelulusanEvent
{
    use Dispatchable, SerializesModels;

    public $pendaftar;
    
    public function __construct(Pendaftar $pendaftar)
    {
        $this->pendaftar = $pendaftar;
    }
} 
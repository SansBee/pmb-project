<?php

namespace App\Events;

use App\Models\Pendaftaran;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StatusPendaftaranUpdated
{
    use Dispatchable, SerializesModels;

    public $pendaftaran;
    
    public function __construct(Pendaftaran $pendaftaran)
    {
        $this->pendaftaran = $pendaftaran;
    }
} 
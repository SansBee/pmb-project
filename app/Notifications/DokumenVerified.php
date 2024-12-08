<?php

namespace App\Notifications;

use App\Models\Dokumen;
use Illuminate\Notifications\Notification;

class DokumenVerified extends Notification
{
    public $dokumen;

    public function __construct(Dokumen $dokumen)
    {
        $this->dokumen = $dokumen;
    }

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toArray($notifiable): array
    {
        return [
            'type' => 'dokumen_verified',
            'message' => "Dokumen {$this->dokumen->nama_dokumen} telah diverifikasi",
            'dokumen_id' => $this->dokumen->id
        ];
    }
} 
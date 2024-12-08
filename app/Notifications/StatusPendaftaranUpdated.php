<?php

namespace App\Notifications;

use App\Models\Pendaftar;
use Illuminate\Notifications\Notification;

class StatusPendaftaranUpdated extends Notification
{
    public $pendaftar;

    public function __construct(Pendaftar $pendaftar)
    {
        $this->pendaftar = $pendaftar;
    }

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toArray($notifiable): array
    {
        return [
            'type' => 'status_updated',
            'message' => "Status pendaftaran anda telah diupdate menjadi {$this->pendaftar->status_pendaftaran}",
            'pendaftar_id' => $this->pendaftar->id
        ];
    }
} 
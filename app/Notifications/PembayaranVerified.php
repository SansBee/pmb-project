<?php

namespace App\Notifications;

use App\Models\Pembayaran;
use Illuminate\Notifications\Notification;

class PembayaranVerified extends Notification
{
    public $pembayaran;

    public function __construct(Pembayaran $pembayaran)
    {
        $this->pembayaran = $pembayaran;
    }

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toArray($notifiable): array
    {
        return [
            'type' => 'pembayaran_verified',
            'message' => "Pembayaran anda telah diverifikasi",
            'pembayaran_id' => $this->pembayaran->id
        ];
    }
} 
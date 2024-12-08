<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Pendaftar;

class StatusPendaftaranNotification extends Notification
{
    protected $status;

    public function __construct($status)
    {
        $this->status = $status;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Status Pendaftaran Diperbarui')
            ->line('Status pendaftaran Anda telah diperbarui.')
            ->line('Status saat ini: ' . Pendaftar::STATUS_PENDAFTARAN[$this->status])
            ->action('Lihat Status', route('pmb.status'));
    }
} 
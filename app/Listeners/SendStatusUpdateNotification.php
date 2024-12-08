<?php

namespace App\Listeners;

use App\Events\StatusPendaftaranUpdated;
use App\Models\Notifikasi;

class SendStatusUpdateNotification
{
    public function handle(StatusPendaftaranUpdated $event)
    {
        Notifikasi::create([
            'user_id' => $event->pendaftaran->user_id,
            'judul' => 'Status Pendaftaran Diperbarui',
            'pesan' => 'Status pendaftaran Anda telah diperbarui menjadi ' . $event->pendaftaran->status_pendaftaran,
            'tipe' => 'info'
        ]);
    }
} 
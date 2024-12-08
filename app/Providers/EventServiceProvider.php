<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Events\StatusPendaftaranUpdated;
use App\Listeners\SendStatusUpdateNotification;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Event::listen(
            StatusPendaftaranUpdated::class,
            SendStatusUpdateNotification::class
        );
    }
} 
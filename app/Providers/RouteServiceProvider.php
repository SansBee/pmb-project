<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AdminMiddleware;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->configureRateLimiting();

        // Daftarkan middleware admin
        Route::aliasMiddleware('admin', AdminMiddleware::class);

        $this->routes(function () {
            // ... kode route lainnya
        });
    }
} 
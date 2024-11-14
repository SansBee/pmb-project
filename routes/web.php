<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PMB\RegisterController;
use App\Http\Controllers\AuthController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route Utama (Home Page)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route Dashboard untuk pengguna yang sudah login
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Middleware auth untuk profile pengguna
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route PMB (Penerimaan Mahasiswa Baru)
Route::prefix('pmb')->group(function () {
    // Halaman utama PMB
    Route::get('/', function () {
        return Inertia::render('PMB/Index');
    })->name('pmb.index');
    
    // Halaman registrasi PMB
    Route::get('/register', [RegisterController::class, 'create'])->name('pmb.register');
    Route::post('/register', [RegisterController::class, 'store'])->name('pmb.register.store');
});

// Route untuk halaman login
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Proses login
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

// Auth routes untuk registrasi dan lainnya
require __DIR__.'/auth.php';

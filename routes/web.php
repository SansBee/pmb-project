<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PMB\RegisterController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\ProdiController;
use App\Http\Controllers\ContactController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route Utama (Home Page)
Route::get('/', function () {
    return Inertia::render('Landing/Welcome');
})->name('welcome');

// Kelompokkan route untuk guest
Route::middleware('guest')->group(function () {
    // Login Routes
    Route::get('/login', function () {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    })->name('login');
    
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');

    Route::get('forgot-password', function () {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status')
        ]);
    })->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', function (string $token) {
        return Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'email' => request()->query('email')
        ]);
    })->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

// Route Dashboard dan routes yang membutuhkan auth lainnya tetap sama
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Routes lainnya tetap sama...
Route::get('/pmb', function () {
    return Inertia::render('PMB/Index');
})->name('pmb');

// ... routes lainnya tetap sama

// Pindahkan require auth.php ke paling bawah
require __DIR__.'/auth.php';

Route::get('/prodi/ti', [ProdiController::class, 'ti'])->name('prodi.ti');
Route::get('/prodi/si', [ProdiController::class, 'si'])->name('prodi.si');
Route::get('/prodi/mi', [ProdiController::class, 'mi'])->name('prodi.mi');
Route::get('/prodi/ka', [ProdiController::class, 'ka'])->name('prodi.ka');

Route::get('/facilities', function () {
    return Inertia::render('Facilities/index');
})->name('facilities');

Route::get('/about', function () {
    return Inertia::render('About/index');
})->name('about');

// Route untuk Contact (letakkan di luar middleware group)
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

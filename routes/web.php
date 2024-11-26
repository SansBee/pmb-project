<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PMB\RegisterController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\ProdiController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\PendaftarController;
use App\Http\Controllers\Admin\PembayaranController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\LaporanController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GelombangController;
use App\Http\Controllers\Admin\BiayaController;
use App\Http\Controllers\Admin\DokumenController;
use App\Http\Controllers\Admin\PengumumanController;
use App\Http\Controllers\Admin\JadwalUjianController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\KontakController;
use App\Http\Controllers\Admin\ProgramStudiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AdminMiddleware;

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

// Route untuk admin
Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->group(function () {
    // Dashboard Admin
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Dokumen
    Route::get('/dokumen', [DokumenController::class, 'index'])->name('admin.dokumen');
    Route::post('/dokumen', [DokumenController::class, 'store'])->name('admin.dokumen');
    Route::put('/dokumen/{dokumen}', [DokumenController::class, 'update'])->name('admin.dokumen.update');
    Route::delete('/dokumen/{dokumen}', [DokumenController::class, 'destroy'])->name('admin.dokumen.destroy');
    Route::post('/dokumen/reorder', [DokumenController::class, 'reorder'])->name('admin.dokumen.reorder');

    // Gelombang
    Route::get('/gelombang', [GelombangController::class, 'index'])->name('admin.gelombang');
    Route::post('/gelombang', [GelombangController::class, 'store'])->name('admin.gelombang');
    Route::put('/gelombang/{gelombang}', [GelombangController::class, 'update'])->name('admin.gelombang.update');
    Route::delete('/gelombang/{gelombang}', [GelombangController::class, 'destroy'])->name('admin.gelombang.destroy');

    // Biaya & Pembayaran
    Route::get('/biaya', [BiayaController::class, 'index'])->name('admin.biaya');
    Route::post('/biaya', [BiayaController::class, 'store'])->name('admin.biaya');
    Route::put('/biaya/{biaya}', [BiayaController::class, 'update'])->name('admin.biaya.update');
    Route::delete('/biaya/{biaya}', [BiayaController::class, 'destroy'])->name('admin.biaya.destroy');

    // Pengumuman
    Route::get('/pengumuman', [PengumumanController::class, 'index'])->name('admin.pengumuman');
    Route::post('/pengumuman', [PengumumanController::class, 'store']);
    Route::put('/pengumuman/{pengumuman}', [PengumumanController::class, 'update']);

    // Jadwal Ujian
    Route::get('/jadwal', [JadwalUjianController::class, 'index'])->name('admin.jadwal');
    Route::post('/jadwal', [JadwalUjianController::class, 'store']);
    Route::put('/jadwal/{jadwal}', [JadwalUjianController::class, 'update']);

    // FAQ
    Route::get('/faq', [FaqController::class, 'index'])->name('admin.faq');
    Route::post('/faq', [FaqController::class, 'store']);
    Route::put('/faq/{faq}', [FaqController::class, 'update']);

    // Program Studi
    Route::get('/prodi', [ProgramStudiController::class, 'index'])->name('admin.prodi');
    Route::post('/prodi', [ProgramStudiController::class, 'store'])->name('admin.prodi.store');
    Route::put('/prodi/{programStudi}', [ProgramStudiController::class, 'update'])->name('admin.prodi.update');
    Route::delete('/prodi/{programStudi}', [ProgramStudiController::class, 'destroy'])->name('admin.prodi.destroy');

    // Dokumen
    Route::post('/admin/dokumen/reorder', [DokumenController::class, 'reorder'])->name('admin.dokumen.reorder');
});

// Route untuk user biasa (letakkan setelah route admin)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        // Jika admin mencoba akses dashboard user, redirect ke admin
        if (auth()->user()->is_admin) {
            return redirect('/admin');
        }
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

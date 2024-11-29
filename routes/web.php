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
    Route::get('login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');
    
    Route::post('login', [AuthController::class, 'login'])->name('login.post');
});

// Tambahkan route logout
Route::post('logout', [AuthController::class, 'logout'])->name('logout');

// Route untuk admin
Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Program Studi (sudah ada)
    Route::resource('prodi', ProgramStudiController::class)->names([
        'index' => 'admin.prodi',
        'store' => 'admin.prodi.store',
        'update' => 'admin.prodi.update',
        'destroy' => 'admin.prodi.destroy',
    ]);

    // Gelombang PMB routes
    Route::get('/Gelombang', [GelombangController::class, 'index'])->name('admin.gelombang');
    Route::post('/Gelombang', [GelombangController::class, 'store'])->name('admin.gelombang.store');
    Route::put('/Gelombang/{id}', [GelombangController::class, 'update'])->name('admin.gelombang.update');
    Route::delete('/Gelombang/{id}', [GelombangController::class, 'destroy'])->name('admin.gelombang.destroy');

    // Dokumen routes
    Route::get('/Dokumen', [DokumenController::class, 'index'])->name('admin.dokumen');
    Route::post('/Dokumen', [DokumenController::class, 'store'])->name('admin.dokumen.store');
    Route::put('/Dokumen/{id}', [DokumenController::class, 'update'])->name('admin.dokumen.update');
    Route::delete('/Dokumen/{id}', [DokumenController::class, 'destroy'])->name('admin.dokumen.destroy');
    Route::post('/Dokumen/reorder', [DokumenController::class, 'reorder'])->name('admin.dokumen.reorder');

    // Biaya routes
    Route::get('/Biaya', [BiayaController::class, 'index'])->name('admin.biaya');
    Route::post('/Biaya', [BiayaController::class, 'store'])->name('admin.biaya.store');
    Route::put('/Biaya/{id}', [BiayaController::class, 'update'])->name('admin.biaya.update');
    Route::delete('/Biaya/{id}', [BiayaController::class, 'destroy'])->name('admin.biaya.destroy');

    // Pengumuman
    Route::get('/Pengumuman', [PengumumanController::class, 'index'])->name('admin.pengumuman');
    Route::post('/Pengumuman', [PengumumanController::class, 'store'])->name('admin.pengumuman.store');
    Route::put('/Pengumuman/{id}', [PengumumanController::class, 'update'])->name('admin.pengumuman.update');
    Route::delete('/Pengumuman/{id}', [PengumumanController::class, 'destroy'])->name('admin.pengumuman.destroy');

    // Jadwal Ujian
    Route::get('/Jadwal', [JadwalUjianController::class, 'index'])->name('admin.jadwal');
    Route::post('/Jadwal', [JadwalUjianController::class, 'store'])->name('admin.jadwal.store');
    Route::put('/Jadwal/{id}', [JadwalUjianController::class, 'update'])->name('admin.jadwal.update');
    Route::delete('/Jadwal/{id}', [JadwalUjianController::class, 'destroy'])->name('admin.jadwal.destroy');

    // FAQ
    Route::get('/Faq', [FaqController::class, 'index'])->name('admin.faq');
    Route::post('/Faq', [FaqController::class, 'store'])->name('admin.faq.store');
    Route::put('/Faq/{id}', [FaqController::class, 'update'])->name('admin.faq.update');
    Route::delete('/Faq/{id}', [FaqController::class, 'destroy'])->name('admin.faq.destroy');

    // Pendaftar
    Route::get('/Pendaftar', [PendaftarController::class, 'index'])->name('admin.pendaftar');
    Route::get('/Pendaftar/{id}', [PendaftarController::class, 'show'])->name('admin.pendaftar.show');

    // Pembayaran
    Route::get('/Pembayaran', [PembayaranController::class, 'index'])->name('admin.pembayaran');
    Route::put('/Pembayaran/{id}', [PembayaranController::class, 'update'])->name('admin.pembayaran.update');

    // Laporan
    Route::get('Laporan', [LaporanController::class, 'index'])->name('admin.laporan');
    Route::get('/Laporan/export', [LaporanController::class, 'export'])->name('admin.laporan.export');
});

// Route untuk user biasa
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        if (auth()->user()->is_admin) {
            return redirect('/admin');
        }
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

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

Route::get('/pmb', function () {
    return Inertia::render('Pmb/index');
})->name('pmb');    

// Route untuk Contact (letakkan di luar middleware group)
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

require __DIR__.'/auth.php';  // Pastikan ini ada di bagian bawah file web.php

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
use App\Http\Controllers\Admin\BeritaController;
use App\Http\Controllers\Admin\JalurMasukController;
use App\Http\Controllers\Admin\NotifikasiController;
use App\Http\Controllers\Admin\ActivityLogController;
use App\Http\Controllers\PMB\StatusController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Auth;

// Route Utama (Home Page)
Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

// Route untuk guest (tanpa auth)
Route::middleware('guest')->group(function () {
    Route::get('login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');
    
    Route::post('login', [AuthController::class, 'login'])->name('login.post');
});

// Route untuk logout (perlu auth tapi tidak perlu admin)
Route::post('logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

// Tambahkan ini setelah route logout dan sebelum route admin
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        if (Auth::user()->is_admin) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('pmb.dashboard');
    })->name('dashboard');
});

// Route untuk admin
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');
    
    // Program Studi
    Route::get('/program-studi', [ProgramStudiController::class, 'index'])->name('admin.program-studi');
    Route::post('/program-studi', [ProgramStudiController::class, 'store'])->name('admin.program-studi.store');
    Route::put('/program-studi/{id}', [ProgramStudiController::class, 'update'])->name('admin.program-studi.update');
    Route::delete('/program-studi/{id}', [ProgramStudiController::class, 'destroy'])->name('admin.program-studi.destroy');
    
    // Gelombang PMB
    Route::get('/gelombang', [GelombangController::class, 'index'])->name('admin.gelombang');
    Route::post('/gelombang', [GelombangController::class, 'store'])->name('admin.gelombang.store');
    Route::put('/gelombang/{id}', [GelombangController::class, 'update'])->name('admin.gelombang.update');
    Route::delete('/gelombang/{id}', [GelombangController::class, 'destroy'])->name('admin.gelombang.destroy');

    //Jalur Masuk
    Route::get('/jalur-masuk', [JalurMasukController::class, 'index'])->name('admin.jalur-masuk');
    Route::post('/jalur-masuk', [JalurMasukController::class, 'store'])->name('admin.jalur-masuk.store');
    Route::put('/jalur-masuk/{id}', [JalurMasukController::class, 'update'])->name('admin.jalur-masuk.update');
    Route::delete('/jalur-masuk/{id}', [JalurMasukController::class, 'destroy'])->name('admin.jalur-masuk.destroy');
    
    //Dokumen
    Route::get('/dokumen', [DokumenController::class, 'index'])->name('admin.dokumen');
    Route::post('/dokumen', [DokumenController::class, 'store'])->name('admin.dokumen.store');
    Route::put('/dokumen/{id}', [DokumenController::class, 'update'])->name('admin.dokumen.update');
    Route::delete('/dokumen/{id}', [DokumenController::class, 'destroy'])->name('admin.dokumen.destroy');
    
    // Pendaftar
    Route::get('/pendaftar', [PendaftarController::class, 'index'])->name('admin.pendaftar');
    Route::get('/pendaftar/{id}', [PendaftarController::class, 'show'])->name('admin.pendaftar.show');

    // Pembayaran
    Route::get('/pembayaran', [PembayaranController::class, 'index'])->name('admin.pembayaran');
    Route::put('/pembayaran/{id}', [PembayaranController::class, 'update'])->name('admin.pembayaran.update');

    // Laporan
    Route::get('/laporan', [LaporanController::class, 'index'])->name('admin.laporan');
    Route::get('/laporan/export', [LaporanController::class, 'export'])->name('admin.laporan.export');

    // Biaya
    Route::get('/biaya', [BiayaController::class, 'index'])->name('admin.biaya');
    Route::post('/biaya', [BiayaController::class, 'store'])->name('admin.biaya.store');
    Route::put('/biaya/{id}', [BiayaController::class, 'update'])->name('admin.biaya.update');
    Route::delete('/biaya/{id}', [BiayaController::class, 'destroy'])->name('admin.biaya.destroy');

    // Pengumuman
    Route::get('/pengumuman', [PengumumanController::class, 'index'])->name('admin.pengumuman');
    Route::post('/pengumuman', [PengumumanController::class, 'store'])->name('admin.pengumuman.store');
    Route::put('/pengumuman/{id}', [PengumumanController::class, 'update'])->name('admin.pengumuman.update');
    Route::delete('/pengumuman/{id}', [PengumumanController::class, 'destroy'])->name('admin.pengumuman.destroy');

    // Jadwal Ujian
    Route::prefix('jadwal-ujian')->group(function () {
        Route::get('/', [JadwalUjianController::class, 'index'])->name('admin.jadwal-ujian');
        Route::post('/store', [JadwalUjianController::class, 'store'])->name('admin.jadwal-ujian.store');
        Route::put('/{id}', [JadwalUjianController::class, 'update'])->name('admin.jadwal-ujian.update');
        Route::delete('/{id}', [JadwalUjianController::class, 'destroy'])->name('admin.jadwal-ujian.destroy');
    });

    // FAQ
    Route::get('/faq', [FaqController::class, 'index'])->name('admin.faq');
    Route::post('/faq', [FaqController::class, 'store'])->name('admin.faq.store');
    Route::put('/faq/{id}', [FaqController::class, 'update'])->name('admin.faq.update');
    Route::delete('/faq/{id}', [FaqController::class, 'destroy'])->name('admin.faq.destroy');

    // Berita
    Route::get('/berita', [BeritaController::class, 'index'])->name('admin.berita');
    Route::post('/berita', [BeritaController::class, 'store'])->name('admin.berita.store');
    Route::put('/berita/{id}', [BeritaController::class, 'update'])->name('admin.berita.update');
    Route::delete('/berita/{id}', [BeritaController::class, 'destroy'])->name('admin.berita.destroy');
});

// Route untuk user biasa
Route::middleware(['auth', 'verified'])->prefix('pmb')->name('pmb.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\PMB\DashboardController::class, 'index'])->name('dashboard');
    
    // Form Pendaftaran
    Route::get('/register', [RegisterController::class, 'index'])->name('register');
    Route::post('/register/store', [RegisterController::class, 'store'])->name('register.store');
    
    // Status Pendaftaran
    Route::get('/status-pendaftaran', [App\Http\Controllers\PMB\StatusController::class, 'index'])
        ->name('status-pendaftaran');
    
    // Upload Dokumen
    Route::get('/dokumen', [App\Http\Controllers\PMB\DokumenController::class, 'index'])->name('dokumen');
    Route::post('/dokumen/upload', [App\Http\Controllers\PMB\DokumenController::class, 'upload'])->name('dokumen.upload');
    
    // Pembayaran
    Route::get('/pembayaran', [App\Http\Controllers\PMB\PembayaranController::class, 'index'])->name('pembayaran');
    Route::post('/pembayaran/upload', [App\Http\Controllers\PMB\PembayaranController::class, 'upload'])->name('pembayaran.upload');
    
    // Jadwal Ujian
    Route::get('/jadwal', [App\Http\Controllers\PMB\JadwalUjianController::class, 'index'])->name('jadwal');
    
    // Pengumuman
    Route::get('/pengumuman', [App\Http\Controllers\PMB\PengumumanController::class, 'index'])->name('pengumuman');
    
    // Status
    Route::get('/status', [App\Http\Controllers\PMB\StatusController::class, 'index'])->name('status');
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
    return Inertia::render('PMB/Index');
})->name('pmb');    

// Route untuk Contact (letakkan di luar middleware group)
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::middleware(['auth'])->group(function () {
    Route::get('/api/persyaratan-dokumen', [RegisterController::class, 'getPersyaratanDokumen']);
    Route::post('/api/upload-dokumen', [RegisterController::class, 'uploadDokumen']);
});

require __DIR__.'/auth.php';  // Pastikan ini ada di bagian bawah file web.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pendaftar', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('nama_lengkap');
            $table->string('email');
            $table->foreignId('program_studi_id')->constrained('program_studi');
            $table->foreignId('jalur_masuk_id')->constrained('jalur_masuk');
            $table->foreignId('gelombang_id')->constrained('gelombang_pmb');
            $table->enum('status_pendaftaran', ['baru', 'verifikasi', 'diterima', 'ditolak'])->default('baru');
            $table->enum('status_pembayaran', ['belum_bayar', 'lunas'])->default('belum_bayar');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pendaftar');
    }
}; 
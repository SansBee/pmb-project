<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        DB::statement("ALTER TABLE pendaftar MODIFY COLUMN status_pembayaran ENUM('belum_bayar', 'menunggu_verifikasi', 'lunas') NOT NULL DEFAULT 'belum_bayar'");
    }

    public function down()
    {
        DB::statement("ALTER TABLE pendaftar MODIFY COLUMN status_pembayaran ENUM('belum_bayar', 'lunas') NOT NULL DEFAULT 'belum_bayar'");
    }
}; 
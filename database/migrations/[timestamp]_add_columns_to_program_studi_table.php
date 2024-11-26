<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Cek apakah kolom sudah ada
        if (!Schema::hasColumn('program_studi', 'deskripsi')) {
            Schema::table('program_studi', function (Blueprint $table) {
                // Tambah kolom baru jika diperlukan
                // $table->text('deskripsi')->nullable()->after('nama');
                // $table->integer('kuota')->default(0)->after('deskripsi');
                // dll
            });
        }
    }

    public function down()
    {
        Schema::table('program_studi', function (Blueprint $table) {
            // $table->dropColumn(['deskripsi', 'kuota']);
        });
    }
}; 
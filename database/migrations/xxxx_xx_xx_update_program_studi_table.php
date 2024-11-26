<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('program_studi', function (Blueprint $table) {
            // Cek apakah kolom sudah ada sebelum menambahkan
            if (!Schema::hasColumn('program_studi', 'deskripsi')) {
                $table->text('deskripsi')->nullable();
            }
            if (!Schema::hasColumn('program_studi', 'kuota')) {
                $table->integer('kuota')->default(0);
            }
            if (!Schema::hasColumn('program_studi', 'is_active')) {
                $table->boolean('is_active')->default(true);
            }
        });
    }

    public function down()
    {
        Schema::table('program_studi', function (Blueprint $table) {
            $table->dropColumn(['deskripsi', 'kuota', 'is_active']);
        });
    }
}; 
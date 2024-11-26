<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Cek apakah kolom sudah ada sebelum menambahkan
        if (!Schema::hasColumn('persyaratan_dokumen', 'kategori')) {
            Schema::table('persyaratan_dokumen', function (Blueprint $table) {
                $table->string('kategori')->after('nama_dokumen')->default('umum');
                $table->integer('urutan')->after('kategori')->default(0);
                $table->string('size_type')->after('max_size')->default('KB');
                $table->text('format_helper')->after('format_file')->nullable();
            });
        }
    }

    public function down()
    {
        Schema::table('persyaratan_dokumen', function (Blueprint $table) {
            $table->dropColumn(['kategori', 'urutan', 'size_type', 'format_helper']);
        });
    }
}; 
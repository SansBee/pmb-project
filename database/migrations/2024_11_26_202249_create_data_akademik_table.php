<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('data_akademik', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pendaftar_id')
                  ->constrained('pendaftar')
                  ->onDelete('cascade');
            $table->string('asal_sekolah');
            $table->string('jurusan_sekolah');
            $table->year('tahun_lulus');
            $table->decimal('nilai_rata_rata', 5, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('data_akademik');
    }
}; 
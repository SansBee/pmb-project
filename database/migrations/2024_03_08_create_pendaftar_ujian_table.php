<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pendaftar_ujian', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pendaftar_id')->constrained('pendaftar');
            $table->foreignId('jadwal_ujian_id')->constrained('jadwal_ujian');
            $table->enum('status', ['terdaftar', 'hadir', 'tidak_hadir'])->default('terdaftar');
            $table->decimal('nilai', 5, 2)->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pendaftar_ujian');
    }
};

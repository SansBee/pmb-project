<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('data_orang_tua', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pendaftar_id')
                  ->constrained('pendaftar')
                  ->onDelete('cascade');
            $table->string('nama_ayah');
            $table->string('pekerjaan_ayah');
            $table->string('nama_ibu');
            $table->string('pekerjaan_ibu');
            $table->string('penghasilan_ortu');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('data_orang_tua');
    }
}; 
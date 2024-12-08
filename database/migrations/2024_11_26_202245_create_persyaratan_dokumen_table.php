<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('persyaratan_dokumen', function (Blueprint $table) {
            $table->id();
            $table->string('nama_dokumen');
            $table->text('deskripsi')->nullable();
            $table->boolean('wajib')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('persyaratan_dokumen');
    }
}; 
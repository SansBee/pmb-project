<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('jalur_masuk', function (Blueprint $table) {
            $table->id();
            $table->string('nama_jalur');
            $table->text('deskripsi');
            $table->json('persyaratan');
            $table->json('keuntungan');
            $table->decimal('biaya', 12, 2);
            $table->integer('kuota');
            $table->integer('urutan')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('jalur_masuk');
    }
};
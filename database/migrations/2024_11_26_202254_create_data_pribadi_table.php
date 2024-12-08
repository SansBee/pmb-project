<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('data_pribadi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pendaftar_id')
                  ->constrained('pendaftar')
                  ->onDelete('cascade');
            $table->string('nama_lengkap');
            $table->string('nik', 16)->unique();
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('data_pribadi');
    }
}; 
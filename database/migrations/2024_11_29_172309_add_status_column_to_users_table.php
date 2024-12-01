<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('status_pendaftaran')->default('baru')->after('is_admin');
            $table->string('status_pembayaran')->default('belum_bayar')->after('status_pendaftaran');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['status_pendaftaran', 'status_pembayaran']);
        });
    }
};
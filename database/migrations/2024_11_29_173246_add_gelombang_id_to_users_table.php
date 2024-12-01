<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('gelombang_id')
                  ->nullable()
                  ->after('program_studi_id')
                  ->constrained('gelombang_pmb')
                  ->nullOnDelete();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['gelombang_id']);
            $table->dropColumn('gelombang_id');
        });
    }
}; 
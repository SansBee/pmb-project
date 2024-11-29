<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('gelombang_pmb', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('biaya');
        });
    }

    public function down()
    {
        Schema::table('gelombang_pmb', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
}; 
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('vehicules', function (Blueprint $table) {
            $table->string('etat')->default('available'); // valeurs : available, rented, broken
        });
    }

    public function down()
    {
        Schema::table('vehicules', function (Blueprint $table) {
            $table->dropColumn('etat');
        });
    }
};

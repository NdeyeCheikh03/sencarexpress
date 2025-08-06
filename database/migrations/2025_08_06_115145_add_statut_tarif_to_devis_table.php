<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('devis', function (Blueprint $table) {
        $table->string('statut')->default('En attente de traitement');
        $table->decimal('tarif', 10, 2)->nullable();
    });
}

public function down()
{
    Schema::table('devis', function (Blueprint $table) {
        $table->dropColumn(['statut', 'tarif']);
    });
}

};

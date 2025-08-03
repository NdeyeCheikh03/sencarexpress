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
    Schema::create('vehicules', function (Blueprint $table) {
        $table->id();
        $table->string('type');
        $table->string('marque');
        $table->integer('annee_circulation');
        $table->integer('annee_acquisition');
        $table->string('immatriculation')->unique();
        $table->date('assurance_debut');
        $table->date('assurance_fin');
        
        $table->timestamps();

    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicules');
    }
};

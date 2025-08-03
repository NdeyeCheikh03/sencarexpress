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
    Schema::create('chauffeurs', function (Blueprint $table) {
        $table->id();
        $table->string('nom');
        $table->string('prenom');
        $table->date('date_naissance');
        $table->string('adresse');
        $table->string('telephone');
        $table->string('contact_urgence');
        $table->string('type_permis');
        $table->string('numero_id');
        $table->integer('annees_experience');
        $table->string('cni_path');
        $table->string('permis_path');
        $table->string('cv_path');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chauffeurs');
    }
};

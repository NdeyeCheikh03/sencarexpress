<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('devis', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('organisme')->nullable();
            $table->string('email');
            $table->string('adresseDepart');
            $table->string('adresseArrivee');
            $table->date('dateDepart');
            $table->time('heureDepart');
            $table->date('dateRetour');
            $table->time('heureRetour');
            $table->string('telephone');
            $table->string('typeBus');
            $table->text('informations')->nullable();
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devis');
    }
};

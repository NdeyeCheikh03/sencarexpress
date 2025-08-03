<?php

// app/Models/Vehicule.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    protected $fillable = [
        'type',
        'marque',
        'annee_circulation',
        'annee_acquisition',
        'immatriculation',
        'assurance_debut',
        'assurance_fin',
        'etat',
    ];
}


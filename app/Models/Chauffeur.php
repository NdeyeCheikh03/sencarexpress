<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chauffeur extends Model
{
    protected $fillable = [
        'nom', 'prenom', 'date_naissance', 'adresse', 'telephone',
        'contact_urgence', 'type_permis', 'numero_id', 'annees_experience',
        'cni_path', 'permis_path', 'cv_path',
    ];
    
}

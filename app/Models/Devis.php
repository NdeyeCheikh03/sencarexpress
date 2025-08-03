<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Devis extends Model
{
    protected $fillable = [
        'nom',
        'organisme',
        'email',
        'adresseDepart',
        'adresseArrivee',
        'dateDepart',
        'heureDepart',
        'dateRetour',
        'heureRetour',
        'telephone',
        'typeBus',
        'informations'
    ];
    
}

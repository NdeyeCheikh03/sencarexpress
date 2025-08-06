<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarif extends Model
{
    protected $fillable = ['depart', 'arrivee', 'distance', 'transferts'];

    protected $casts = [
        'transferts' => 'array',
    ];
}

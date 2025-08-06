<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DevisController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChauffeurController;
use App\Http\Controllers\VehiculeController;
use App\Http\Controllers\TarifController;

// Routes publiques (pas besoin d'authentification)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/devis', [DevisController::class, 'store']); // Création de devis publique

Route::post('/vehicules', [VehiculeController::class, 'store']);
Route::get('/vehicules', [VehiculeController::class, 'index']);
Route::patch('/vehicules/{id}/etat', [VehiculeController::class, 'updateEtat']);

Route::post('/chauffeurs', [ChauffeurController::class, 'store']);
Route::get('/chauffeurs', [ChauffeurController::class, 'index']);
 // Devis (accès restreint)
 Route::put('/devis/{devis}', [DevisController::class, 'update']);
 Route::get('/devis', [DevisController::class, 'index']);

 // Tarifs (accès restreint)
 Route::get('/tarifs', [TarifController::class, 'index']);
 Route::post('/tarifs', [TarifController::class, 'store']);
 Route::get('/tarifs/{id}', [TarifController::class, 'show']);
 Route::put('/tarifs/{id}', [TarifController::class, 'update']);
 Route::delete('/tarifs/{id}', [TarifController::class, 'destroy']);

// Routes protégées par authentification (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']); // profil connecté
    Route::post('/logout', [AuthController::class, 'logout']);

   
});

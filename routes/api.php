<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\ChauffeurController;
use App\Http\Controllers\VehiculeController;
use App\Http\Controllers\TarifController;
use App\Http\Controllers\DisponibiliteController;

/*
|--------------------------------------------------------------------------
| Routes API
|--------------------------------------------------------------------------
*/

// ================== ROUTES PUBLIQUES ==================

// Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Création d’un devis (publique, ex: client peut demander un devis)
Route::post('/devis', [DevisController::class, 'store']);

// Calendrier (publique, ex: affichage des disponibilités)
Route::get('/disponibilites', [DisponibiliteController::class, 'index']);


// ================== ROUTES PROTÉGÉES ==================
Route::middleware('auth:sanctum')->group(function () {

    // Auth utilisateur connecté
    Route::get('/me', [AuthController::class, 'me']); 
    Route::post('/logout', [AuthController::class, 'logout']);

    // Devis (accès restreint : admin seulement)
    Route::get('/devis', [DevisController::class, 'index']);
    Route::put('/devis/{devis}', [DevisController::class, 'update']);
    Route::delete('/devis/{devis}', [DevisController::class, 'destroy']);

    // Véhicules
    Route::post('/vehicules', [VehiculeController::class, 'store']);
    Route::get('/vehicules', [VehiculeController::class, 'index']);
    Route::patch('/vehicules/{id}/etat', [VehiculeController::class, 'updateEtat']);

    // Chauffeurs
    Route::post('/chauffeurs', [ChauffeurController::class, 'store']);
    Route::get('/chauffeurs', [ChauffeurController::class, 'index']);

    // Tarifs
    Route::get('/tarifs', [TarifController::class, 'index']);
    Route::post('/tarifs', [TarifController::class, 'store']);
    Route::get('/tarifs/{id}', [TarifController::class, 'show']);
    Route::put('/tarifs/{id}', [TarifController::class, 'update']);
    Route::delete('/tarifs/{id}', [TarifController::class, 'destroy']);
});

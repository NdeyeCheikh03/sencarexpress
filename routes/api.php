<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DevisController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChauffeurController;
use App\Http\Controllers\VehiculeController;

Route::post('/vehicules', [VehiculeController::class, 'store']);
Route::get('/vehicules', [VehiculeController::class, 'index']);


Route::patch('/vehicules/{id}/etat', [VehiculeController::class, 'updateEtat']);

Route::post('/chauffeurs', [ChauffeurController::class, 'store']);

Route::get('/chauffeurs', [ChauffeurController::class, 'index']);
// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées par middleware (optionnel pour logout / me)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']); // profil connecté
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/devis', [DevisController::class, 'store']);
    Route::get('/devis', [DevisController::class, 'index']); // Ajouté pour l'admin
});

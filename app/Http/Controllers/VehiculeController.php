<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicule;

class VehiculeController extends Controller
{
    // Affiche tous les véhicules
    public function index()
    {
        return response()->json(Vehicule::all(), 200);
    }

    // Ajoute un véhicule
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'type' => 'required|string',
            'marque' => 'required|string',
            'annee_circulation' => 'required|integer',
            'annee_acquisition' => 'required|integer',
            'immatriculation' => 'required|string|unique:vehicules',
            'assurance_debut' => 'required|date',
            'assurance_fin' => 'required|date|after_or_equal:assurance_debut',
            'etat' => 'nullable|string|in:available,rented,broken',
        ]);

        // Valeur par défaut si 'etat' non fourni
        if (!isset($validatedData['etat'])) {
            $validatedData['etat'] = 'available';
        }

        $vehicule = Vehicule::create($validatedData);

        return response()->json([
            'message' => 'Véhicule ajouté avec succès',
            'vehicule' => $vehicule,
        ], 201);
    }

    // Affiche un véhicule spécifique
    public function show($id)
    {
        $vehicule = Vehicule::find($id);

        if (!$vehicule) {
            return response()->json(['message' => 'Véhicule non trouvé'], 404);
        }

        return response()->json($vehicule);
    }

    // Met à jour un véhicule
    public function update(Request $request, $id)
    {
        $vehicule = Vehicule::find($id);

        if (!$vehicule) {
            return response()->json(['message' => 'Véhicule non trouvé'], 404);
        }

        $validatedData = $request->validate([
            'type' => 'sometimes|string',
            'marque' => 'sometimes|string',
            'annee_circulation' => 'sometimes|integer',
            'annee_acquisition' => 'sometimes|integer',
            'immatriculation' => 'sometimes|string|unique:vehicules,immatriculation,' . $id,
            'assurance_debut' => 'sometimes|date',
            'assurance_fin' => 'sometimes|date|after_or_equal:assurance_debut',
            'etat' => 'sometimes|string|in:available,rented,broken',
        ]);

        $vehicule->update($validatedData);

        return response()->json([
            'message' => 'Véhicule mis à jour avec succès',
            'vehicule' => $vehicule,
        ]);
    }

    // Supprime un véhicule
    public function destroy($id)
    {
        $vehicule = Vehicule::find($id);

        if (!$vehicule) {
            return response()->json(['message' => 'Véhicule non trouvé'], 404);
        }

        $vehicule->delete();

        return response()->json(['message' => 'Véhicule supprimé avec succès']);
    }

    // Met à jour uniquement l'état d'un véhicule
    public function updateEtat(Request $request, $id)
    {
        $vehicule = Vehicule::find($id);

        if (!$vehicule) {
            return response()->json(['message' => 'Véhicule non trouvé'], 404);
        }

        $validated = $request->validate([
            'etat' => 'required|string|in:available,rented,broken',
        ]);

        $vehicule->etat = $validated['etat'];
        $vehicule->save();

        return response()->json([
            'message' => 'État du véhicule mis à jour avec succès',
            'vehicule' => $vehicule,
        ]);
    }
}

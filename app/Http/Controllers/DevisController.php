<?php

namespace App\Http\Controllers;

use App\Models\Devis;
use Illuminate\Http\Request;

class DevisController extends Controller
{
    // Afficher tous les devis (pour l’admin)
    public function index()
    {
        $devis = Devis::all();
        return response()->json($devis);
    }

    // Enregistrer une nouvelle demande de devis (par un utilisateur)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'organisme' => 'nullable|string|max:255',
            'email' => 'required|email',
            'adresseDepart' => 'required|string',
            'adresseArrivee' => 'required|string',
            'dateDepart' => 'required|date',
            'heureDepart' => 'required',
            'dateRetour' => 'required|date',
            'heureRetour' => 'required',
            'telephone' => 'required|string',
            'typeBus' => 'required|string',
            'informations' => 'nullable|string',
        ]);

        $devis = Devis::create($validated);

        return response()->json([
            'message' => 'Demande de devis enregistrée avec succès',
            'data' => $devis
        ], 201);
    }

    // Mise à jour du statut et du tarif (par l’admin)
    public function update(Request $request, Devis $devis)
    {
        $validated = $request->validate([
            'statut' => 'nullable|string',
            'tarif' => 'nullable|numeric',
        ]);

        $devis->update($validated);

        return response()->json([
            'message' => 'Devis mis à jour avec succès',
            'data' => $devis
        ]);
    }
}

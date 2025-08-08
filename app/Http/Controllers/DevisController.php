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
            'heureDepart' => 'required|string',
            'dateRetour' => 'required|date',
            'heureRetour' => 'required|string',
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

    // Mise à jour complète d'un devis (par l’admin)
    public function update(Request $request, Devis $devis)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'organisme' => 'sometimes|nullable|string|max:255',
            'email' => 'sometimes|required|email',
            'adresseDepart' => 'sometimes|required|string',
            'adresseArrivee' => 'sometimes|required|string',
            'dateDepart' => 'sometimes|required|date',
            'heureDepart' => 'sometimes|required|string',
            'dateRetour' => 'sometimes|required|date',
            'heureRetour' => 'sometimes|required|string',
            'telephone' => 'sometimes|required|string',
            'typeBus' => 'sometimes|required|string',
            'informations' => 'sometimes|nullable|string',
            'statut' => 'sometimes|nullable|string',
            'tarif' => 'sometimes|nullable|numeric',
        ]);

        $devis->update($validated);

        return response()->json([
            'message' => 'Devis mis à jour avec succès',
            'data' => $devis
        ]);
    }

    public function destroy($id)
    {
        $devis = Devis::find($id);
        if (!$devis) {
            return response()->json(['message' => 'Devis non trouvé'], 404);
        }
        $devis->delete();
        return response()->json(['message' => 'Devis supprimé avec succès']);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chauffeur;

class ChauffeurController extends Controller
{
    public function index()
    {
        return Chauffeur::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'dateNaissance' => 'required|date',
            'adresse' => 'required|string',
            'telephone' => 'required|string',
            'contactUrgence' => 'required|string',
            'typePermis' => 'required|string',
            'numeroID' => 'required|string',
            'anneesExperience' => 'required|integer',
            'cni' => 'required|file|mimes:jpg,jpeg,png,pdf',
            'permis' => 'required|file|mimes:jpg,jpeg,png,pdf',
            'cv' => 'required|file|mimes:pdf,jpg,jpeg,png',
        ]);

        // Stockage des fichiers
        $cniPath = $request->file('cni')->store('chauffeurs/cni', 'public');
        $permisPath = $request->file('permis')->store('chauffeurs/permis', 'public');
        $cvPath = $request->file('cv')->store('chauffeurs/cv', 'public');

        // Création du chauffeur
        $chauffeur = Chauffeur::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'date_naissance' => $request->dateNaissance,
            'adresse' => $request->adresse,
            'telephone' => $request->telephone,
            'contact_urgence' => $request->contactUrgence,
            'type_permis' => $request->typePermis,
            'numero_id' => $request->numeroID,
            'annees_experience' => $request->anneesExperience,
            'cni_path' => $cniPath,
            'permis_path' => $permisPath,
            'cv_path' => $cvPath,
        ]);

        return response()->json(['message' => 'Chauffeur enregistré avec succès', 'chauffeur' => $chauffeur], 201);
    }
}

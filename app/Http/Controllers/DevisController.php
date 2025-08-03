<?php

namespace App\Http\Controllers;

use App\Models\Devis;
use Illuminate\Http\Request;

class DevisController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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


    /**
     * Display the specified resource.
     */
    public function show(Devis $devis)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Devis $devis)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Devis $devis)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Devis $devis)
    {
        //
    }
}

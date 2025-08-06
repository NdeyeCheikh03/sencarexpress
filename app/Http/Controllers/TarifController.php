<?php

namespace App\Http\Controllers;

use App\Models\Tarif;
use Illuminate\Http\Request;

class TarifController extends Controller
{
    public function index()
    {
        return response()->json(Tarif::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'depart' => 'required|string',
            'arrivee' => 'required|string',
            'distance' => 'required|numeric',
            'transferts' => 'nullable|array',
            'transferts.*' => 'nullable|numeric',
        ]);

        $tarif = Tarif::create($validated);

        return response()->json($tarif, 201);
    }

    public function show($id)
    {
        return response()->json(Tarif::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $tarif = Tarif::findOrFail($id);

        $validated = $request->validate([
            'depart' => 'required|string',
            'arrivee' => 'required|string',
            'distance' => 'required|numeric',
            'transferts' => 'nullable|array',
            'transferts.*' => 'nullable|numeric',
        ]);

        $tarif->update($validated);

        return response()->json($tarif);
    }

    public function destroy($id)
    {
        $tarif = Tarif::findOrFail($id);
        $tarif->delete();

        return response()->json(['message' => 'Tarif supprimé avec succès']);
    }
}

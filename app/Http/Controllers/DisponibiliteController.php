<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DisponibiliteController extends Controller
{
    public function index()
    {
        // 1️⃣ Compter les véhicules dispo
        $totalVehicules = DB::table('vehicules')
            ->where('etat', 'disponible')
            ->count();

        if ($totalVehicules === 0) {
            return response()->json(['disponibilites' => []]);
        }

        // 2️⃣ Récupérer les devis acceptés
        $reservations = DB::table('devis')
            ->select('dateDepart', 'dateRetour')
            ->where('statut', 'accepté')
            ->get();

        // 3️⃣ Compter par jour
        $bookingsCount = [];

        foreach ($reservations as $res) {
            $start = new \DateTime($res->dateDepart);
            $end = new \DateTime($res->dateRetour);

            while ($start <= $end) {
                $date = $start->format('Y-m-d');
                $bookingsCount[$date] = ($bookingsCount[$date] ?? 0) + 1;
                $start->modify('+1 day');
            }
        }

        // 4️⃣ Construire la réponse
        $disponibilites = [];
        foreach ($bookingsCount as $date => $count) {
            $etat = "disponible";
            if ($count === 0) {
                $etat = "disponible";
            } elseif ($count < $totalVehicules) {
                $etat = "limite";
            } else {
                $etat = "complet";
            }

            $disponibilites[] = [
                "date" => $date,
                "etat" => $etat
            ];
        }

        return response()->json(["disponibilites" => $disponibilites]);
    }
}

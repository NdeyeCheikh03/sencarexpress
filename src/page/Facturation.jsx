import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Facturation.css";
import Sidebar from "./sidebar"; // <-- sidebar est dans src/page

const moisList = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre"
];

const Facturation = () => {
  const [devisList, setDevisList] = useState([]);
  const [tarifs, setTarifs] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [devisRes, tarifsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/devis"),
          axios.get("http://localhost:8000/api/tarifs"),
        ]);
        setDevisList(Array.isArray(devisRes.data) ? devisRes.data : []);
        setTarifs(Array.isArray(tarifsRes.data) ? tarifsRes.data : []);
      } catch (err) {
        console.error("Erreur récupération données :", err);
      }
    };
    fetchAll();
  }, []);

  // Essaye de récupérer un montant (nombre) pour un devis :
  const getMontantNumber = (devis) => {
    // 1) si admin a déjà mis un tarif dans le devis -> on prend
    if (devis.tarif !== undefined && devis.tarif !== null && devis.tarif !== "") {
      const n = Number(devis.tarif);
      return isNaN(n) ? null : n;
    }
    // 2) on cherche une entrée tarif correspondante (départ/arrivée exacts)
    const match = tarifs.find(t =>
      t.depart && t.arrivee &&
      devis.adresseDepart && devis.adresseArrivee &&
      t.depart.toString().trim().toLowerCase() === devis.adresseDepart.toString().trim().toLowerCase() &&
      t.arrivee.toString().trim().toLowerCase() === devis.adresseArrivee.toString().trim().toLowerCase()
    );
    // si le tarif contient un champ 'prix' ou 'tarif' on le retourne
    if (match) {
      if (match.prix !== undefined) {
        const n = Number(match.prix);
        return isNaN(n) ? null : n;
      }
      if (match.tarif !== undefined) {
        const n = Number(match.tarif);
        return isNaN(n) ? null : n;
      }
      // sinon pas de champ prix défini -> on ne peut pas calculer automatiquement
    }
    return null;
  };

  // Construire dataset affichable
  const dataFusionnee = devisList.map(d => {
    const montantNum = getMontantNumber(d);
    return {
      ...d,
      vehiculeAffichage: d.typeBus || "—",
      montantNum,
      montantAffichage: montantNum !== null ? `${montantNum} €` : (d.tarif ? `${d.tarif} €` : "-"),
      statutAffichage: d.statut && d.statut.toString().toLowerCase() === "payé" ? "Payé" : "Non payé",
    };
  });

  // filtre par mois sélectionné
  const filteredData = dataFusionnee.filter(d => {
    if (!d.dateDepart) return false;
    const date = new Date(d.dateDepart);
    if (isNaN(date)) return false;
    const mois = moisList[date.getMonth()];
    return selectedMonth ? mois === selectedMonth : true;
  });

  // total (somme uniquement des montants numériques trouvés)
  const total = filteredData.reduce((sum, row) => sum + (Number(row.montantNum) || 0), 0);

  return (
    <div className="facturation-page">
      <Sidebar />

      <main className="facturation-main">
        <h2>Facturation</h2>

        <div className="facturation-select">
          <label htmlFor="mois">Mois :</label>
          <select id="mois" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
            <option value="">-- Tous les mois --</option>
            {moisList.map((m,i) => <option key={i} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="table-wrapper">
          <table className="facturation-table">
            <thead>
              <tr>
                <th>Date de location</th>
                <th>Client</th>
                <th>Véhicule (type)</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr><td colSpan="5">Aucune facture à afficher</td></tr>
              ) : (
                filteredData.map((d, i) => (
                  <tr key={i}>
                    <td>{d.dateDepart ? new Date(d.dateDepart).toLocaleDateString("fr-FR") : "-"}</td>
                    <td>{d.nom || d.organisme || "-"}</td>
                    <td>{d.vehiculeAffichage}</td>
                    <td>{d.montantAffichage}</td>
                    <td className={d.statutAffichage === "Payé" ? "statut-paye" : "statut-nonpaye"}>
                      {d.statutAffichage}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total</td>
                <td>{total} €</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Facturation;

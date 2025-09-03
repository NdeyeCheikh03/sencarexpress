import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Facturation.css";
import Sidebar from "./sidebar";

const moisList = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre"
];

const STATUTS = ["Payé", "Non payé"];

const Facturation = () => {
  const [devisList, setDevisList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchDevis = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/devis");
        setDevisList(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Erreur récupération devis :", err);
      }
    };
    fetchDevis();
  }, []);

  // mettre à jour montant ou statut directement
  const handleChange = async (id, field, value) => {
    try {
      await axios.put(`http://localhost:8000/api/devis/${id}`, { [field]: value });
      setDevisList((prev) =>
        prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
      );
    } catch (error) {
      console.error("Erreur mise à jour devis :", error);
    }
  };

  // filtrer par mois
  const filteredData = devisList.filter((d) => {
    if (!d.dateDepart) return false;
    const date = new Date(d.dateDepart);
    if (isNaN(date)) return false;
    const mois = moisList[date.getMonth()];
    return selectedMonth ? mois === selectedMonth : true;
  });

  // total des montants
  const total = filteredData.reduce((sum, row) => sum + (Number(row.tarif) || 0), 0);

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
                <th>Montant (€)</th>
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
                    <td>{d.typeBus || "—"}</td>
                    <td>
                      <input
                        type="number"
                        value={d.tarif || ""}
                        onChange={(e) => handleChange(d.id, "tarif", e.target.value)}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <select
                        value={d.statut || "Non payé"}
                        onChange={(e) => handleChange(d.id, "statut", e.target.value)}
                        className={d.statut === "Payé" ? "statut-paye" : "statut-nonpaye"}
                      >
                        {STATUTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
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

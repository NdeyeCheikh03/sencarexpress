// ListeDevis.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar"; // ton composant sidebar
import "../style/DevisList.css";

export default function ListeDevis() {
  const [devisList, setDevisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/devis")
      .then((response) => {
        setDevisList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des devis :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className="container-app">
      <Sidebar />

      <div className="devis_main">
        <h1>Liste des devis</h1>

        {/* Bouton centré */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            className="btn-action edit-btn"
            onClick={() => navigate("/devis/ajouter")}
          >
            Ajouter un devis
          </button>
        </div>

        <table className="devis_table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Organisme</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Type de bus</th>
              <th>Date départ</th>
              <th>Date retour</th>
              <th>Tarif (€)</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {devisList.map((devis) => {
              // Classe CSS du statut
              let statutClass = "";
              switch (devis.statut.toLowerCase()) {
                case "en attente":
                  statutClass = "statut-enattente";
                  break;
                case "accepté":
                  statutClass = "statut-accepté";
                  break;
                case "refusé":
                  statutClass = "statut-refusé";
                  break;
                case "payé":
                  statutClass = "statut-payé";
                  break;
                default:
                  statutClass = "";
              }

              return (
                <tr key={devis.id}>
                  <td>{devis.nom}</td>
                  <td>{devis.organisme}</td>
                  <td>{devis.email}</td>
                  <td>{devis.telephone}</td>
                  <td>{devis.typeBus}</td>
                  <td>{devis.dateDepart}</td>
                  <td>{devis.dateRetour}</td>
                  <td>{devis.tarif}</td>
                  <td className={statutClass}>{devis.statut}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

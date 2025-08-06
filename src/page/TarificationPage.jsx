import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Tarification.css";
import Sidebar from "../page/sidebar";
import { FaEye, FaTrash, FaPlus, FaPen } from "react-icons/fa";

const TarificationPage = () => {
  const [tarifs, setTarifs] = useState([]);
  const [newTarif, setNewTarif] = useState({
    depart: "",
    arrivee: "",
    distance: "",
    transferts: [""], // tableau dynamique des transferts
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTarifs();
  }, []);

  const fetchTarifs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tarifs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTarifs(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des tarifs", error);
    }
  };

  // Gestion changement input
  const handleInputChange = (e, index = null) => {
    if (e.target.name === "transferts") {
      const updated = [...newTarif.transferts];
      updated[index] = e.target.value;
      setNewTarif({ ...newTarif, transferts: updated });
    } else {
      setNewTarif({ ...newTarif, [e.target.name]: e.target.value });
    }
  };

  // Ajouter un champ transfert
  const addTransfertField = () => {
    setNewTarif({ ...newTarif, transferts: [...newTarif.transferts, ""] });
  };

  // Supprimer un champ transfert
  const removeTransfertField = (index) => {
    const updated = [...newTarif.transferts];
    updated.splice(index, 1);
    setNewTarif({ ...newTarif, transferts: updated });
  };

  // Ouvrir modal avec ou sans tarif à éditer
  const openModal = (tarif = null) => {
    if (tarif) {
      setEditingId(tarif.id);
      setNewTarif({
        depart: tarif.depart,
        arrivee: tarif.arrivee,
        distance: tarif.distance,
        transferts: Array.isArray(tarif.transferts)
          ? tarif.transferts
          : [], // si pas d'array, on initialise vide
      });
    } else {
      setEditingId(null);
      setNewTarif({
        depart: "",
        arrivee: "",
        distance: "",
        transferts: [""],
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Envoi formulaire au backend
  const handleSubmit = async () => {
    // On nettoie les transferts vides ou non numériques
    const cleanedTransferts = newTarif.transferts
      .map((t) => (t === "" ? null : Number(t)))
      .filter((t) => t !== null && !isNaN(t));

    const payload = {
      depart: newTarif.depart,
      arrivee: newTarif.arrivee,
      distance: Number(newTarif.distance),
      transferts: cleanedTransferts.length > 0 ? cleanedTransferts : null,
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/tarifs/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:8000/api/tarifs", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      closeModal();
      fetchTarifs();
    } catch (error) {
      console.error("Erreur lors de l'envoi du tarif", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tarifs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTarifs();
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  return (
    <div className="tarifPageWrapper">
      <Sidebar />
      <div className="tarifContainer">
        <h2 className="tarifTitle">Tarification</h2>

        <button className="btnAddTarif" onClick={() => openModal()}>
          <FaPlus /> Ajouter un tarif
        </button>

        <table className="tarifTable">
          <thead>
            <tr>
              <th>Départ</th>
              <th>Arrivée</th>
              <th>Distance (km)</th>
              <th>Transferts</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tarifs.map((tarif) => (
              <tr key={tarif.id}>
                <td>{tarif.depart}</td>
                <td>{tarif.arrivee}</td>
                <td>{tarif.distance}</td>
                <td>
                  {tarif.transferts && tarif.transferts.length > 0
                    ? tarif.transferts.join(", ")
                    : "—"}
                </td>
                <td className="actionsColumn">
                  <button className="btnAction eye">
                    <FaEye />
                  </button>
                  <button
                    className="btnAction edit"
                    onClick={() => openModal(tarif)}
                  >
                    <FaPen />
                  </button>
                  <button
                    className="btnAction delete"
                    onClick={() => handleDelete(tarif.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {showModal && (
          <div className="modalBackdrop">
            <div className="modalContent">
              <h3>{editingId ? "Modifier le tarif" : "Ajouter un tarif"}</h3>
              <input
                type="text"
                name="depart"
                placeholder="Départ"
                value={newTarif.depart}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="arrivee"
                placeholder="Arrivée"
                value={newTarif.arrivee}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="distance"
                placeholder="Distance"
                value={newTarif.distance}
                onChange={handleInputChange}
              />

              {newTarif.transferts.map((t, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <input
                    type="number"
                    name="transferts"
                    placeholder={`Transfert ${index + 1}`}
                    value={t}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  {newTarif.transferts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTransfertField(index)}
                      style={{ cursor: "pointer" }}
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}

              <button className="btnAddTransfert" onClick={addTransfertField}>
                <FaPlus /> Ajouter un transfert
              </button>

              <div className="modalActions">
                <button onClick={handleSubmit} className="btnSubmit">
                  {editingId ? "Mettre à jour" : "Ajouter"}
                </button>
                <button onClick={closeModal} className="btnCancel">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TarificationPage;

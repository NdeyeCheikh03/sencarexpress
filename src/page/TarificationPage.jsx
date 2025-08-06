import React, { useEffect, useState } from 'react';
import Sidebar from '../page/sidebar'; // adapte ce chemin selon ton projet
import axios from 'axios';
import '../style/DevisList.css';
import { FaTrash, FaPen, FaSave, FaTimes } from 'react-icons/fa';

const STATUTS = ['En attente', 'Accepté', 'Refusé', 'payé'];

const ListeDevis = () => {
  const [devisList, setDevisList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTarif, setEditedTarif] = useState('');

  useEffect(() => {
    const fetchDevis = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/devis');
        setDevisList(res.data);
      } catch (error) {
        console.error('Erreur fetch devis:', error);
      }
    };

    fetchDevis();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce devis ?")) {
      try {
        await axios.delete(`http://localhost:8000/api/devis/${id}`);
        setDevisList(devisList.filter(devis => devis.id !== id));
      } catch (error) {
        console.error("Erreur suppression devis :", error);
      }
    }
  };

  const changeStatut = async (id) => {
    const devis = devisList.find(d => d.id === id);
    if (!devis) return;

    const currentIndex = STATUTS.indexOf(devis.statut);
    const nextIndex = (currentIndex + 1) % STATUTS.length;
    const nouveauStatut = STATUTS[nextIndex];

    try {
      await axios.put(`http://localhost:8000/api/devis/${id}`, { statut: nouveauStatut });
      setDevisList(devisList.map(d =>
        d.id === id ? { ...d, statut: nouveauStatut } : d
      ));
    } catch (error) {
      console.error("Erreur mise à jour statut :", error);
    }
  };

  const handleEdit = (id, tarif) => {
    setEditingId(id);
    setEditedTarif(tarif ?? '');
  };

  const handleTarifChange = (e) => {
    setEditedTarif(e.target.value);
  };

  const saveTarif = async (id) => {
    try {
      // Envoie la mise à jour du tarif au serveur
      await axios.put(`http://localhost:8000/api/devis/${id}`, { tarif: editedTarif });
      // Mets à jour la liste locale
      setDevisList(devisList.map(d =>
        d.id === id ? { ...d, tarif: editedTarif } : d
      ));
      setEditingId(null);
      setEditedTarif('');
    } catch (error) {
      console.error("Erreur mise à jour tarif :", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedTarif('');
  };

  return (
    <div className="devis_container">
      <Sidebar />
      <main className="devis_main">
        <h1>Liste complète des devis</h1>
        {devisList.length === 0 ? (
          <p>Aucun devis</p>
        ) : (
          <table className="devis_table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Lieu Départ</th>
                <th>Lieu d'arrivée</th>
                <th>Date de départ</th>
                <th>Date d'arrivée</th>
                <th>Tarif</th>
                <th>Action</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {devisList.map((devis) => (
                <tr key={devis.id}>
                  <td>{devis.nom}</td>
                  <td>{devis.adresseDepart}</td>
                  <td>{devis.adresseArrivee}</td>
                  <td>{devis.dateDepart}</td>
                  <td>{devis.dateRetour}</td>
                  <td>
                    {editingId === devis.id ? (
                      <>
                        <input
                          type="text"
                          value={editedTarif}
                          onChange={handleTarifChange}
                          style={{ width: '80px' }}
                        />
                        <button
                          onClick={() => saveTarif(devis.id)}
                          title="Enregistrer"
                          className="icon-btn"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={cancelEdit}
                          title="Annuler"
                          className="icon-btn"
                        >
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        {devis.tarif ?? '-'}{' '}
                        <button
                          onClick={() => handleEdit(devis.id, devis.tarif)}
                          title="Modifier tarif"
                          className="icon-btn"
                        >
                          <FaPen />
                        </button>
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(devis.id)}
                      title="Supprimer"
                      className="icon-btn"
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => changeStatut(devis.id)}
                      className={`btn-statut statut-${devis.statut.toLowerCase()}`}
                      title="Cliquez pour changer le statut"
                    >
                      {devis.statut}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default ListeDevis;

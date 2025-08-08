import React, { useEffect, useState } from 'react';
import Sidebar from '../page/sidebar';
import axios from 'axios';
import '../style/DevisList.css';
import { FaPen, FaTrash } from 'react-icons/fa';

const STATUTS = ['En attente', 'Accepté', 'Refusé', 'payé'];

const ListeDevis = () => {
  const [devisList, setDevisList] = useState([]);
  const [editingDevis, setEditingDevis] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    adresseDepart: '',
    adresseArrivee: '',
    dateDepart: '',
    dateRetour: '',
    tarif: '',
    statut: '',
  });

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

  const handleEditClick = (devis) => {
    setEditingDevis(devis);
    setFormData({
      ...devis,
      dateDepart: devis.dateDepart ? devis.dateDepart.slice(0, 10) : '',
      dateRetour: devis.dateRetour ? devis.dateRetour.slice(0, 10) : '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      await axios.put(`http://localhost:8000/api/devis/${editingDevis.id}`, formData);
      setDevisList(devisList.map(d => d.id === editingDevis.id ? { ...d, ...formData } : d));
      setEditingDevis(null);
    } catch (error) {
      console.error("Erreur mise à jour devis :", error);
    }
  };

  const cancelEdit = () => {
    setEditingDevis(null);
  };

  // Nouveau : modification du statut via un select (comme VehiculesPage)
  const handleStatutChange = async (devis, newStatut) => {
    try {
      await axios.put(`http://localhost:8000/api/devis/${devis.id}`, { statut: newStatut });
      setDevisList((prev) =>
        prev.map((d) => (d.id === devis.id ? { ...d, statut: newStatut } : d))
      );
    } catch (error) {
      console.error("Erreur mise à jour statut :", error);
    }
  };

  return (
    <div className="devis_container" style={{ display: 'flex' }}>
      <Sidebar />
      <main className="devis_main" style={{ flex: 1, padding: '20px' }}>
        <h1>Liste complète des devis</h1>
        {devisList.length === 0 ? (
          <p>Aucun devis</p>
        ) : (
          <table className="devis_table" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                  <td>{devis.dateDepart ? devis.dateDepart.slice(0, 10) : ''}</td>
                  <td>{devis.dateRetour ? devis.dateRetour.slice(0, 10) : ''}</td>
                  <td>{devis.tarif ?? '-'}</td>
                  <td>
                    <button
                      onClick={() => handleEditClick(devis)}
                      title="Modifier"
                      aria-label="Modifier"
                      style={{ border: 'none', background: 'none', cursor: 'pointer', marginRight: '10px' }}
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => handleDelete(devis.id)}
                      title="Supprimer"
                      aria-label="Supprimer"
                      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                  <td>
                    <select
                      value={devis.statut || ''}
                      onChange={(e) => handleStatutChange(devis, e.target.value)}
                      className={`status-select statut-${devis.statut.toLowerCase().replace(/\s/g, '')}`}
                      style={{ padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Sélectionner un statut</option>
                      {STATUTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {editingDevis && (
          <div
            className="modal-overlay"
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
              justifyContent: 'center', alignItems: 'center', zIndex: 9999
            }}
          >
            <div
              className="modal-content"
              style={{
                backgroundColor: 'white', padding: '20px', borderRadius: '8px',
                width: '400px', maxHeight: '90vh', overflowY: 'auto'
              }}
            >
              <h2>Modifier le devis</h2>
              <label>
                Nom:
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </label>
              <label>
                Lieu départ:
                <input
                  type="text"
                  name="adresseDepart"
                  value={formData.adresseDepart}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </label>
              <label>
                Lieu arrivée:
                <input
                  type="text"
                  name="adresseArrivee"
                  value={formData.adresseArrivee}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </label>
              <label>
                Date départ:
                <input
                  type="date"
                  name="dateDepart"
                  value={formData.dateDepart}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </label>
              <label>
                Date arrivée:
                <input
                  type="date"
                  name="dateRetour"
                  value={formData.dateRetour}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </label>
              <label>
                Tarif:
                <input
                  type="number"
                  name="tarif"
                  value={formData.tarif}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </label>
              <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={cancelEdit}>Annuler</button>
                <button onClick={saveChanges}>Enregistrer</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListeDevis;

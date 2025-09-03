import React, { useEffect, useState } from 'react';
import Sidebar from '../page/sidebar';
import axios from 'axios';
import '../style/DevisList.css';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ⬅️ import pour navigation

const STATUTS = ['En attente', 'Accepté', 'Refusé', 'payé'];

const ListeDevis = () => {
  const [devisList, setDevisList] = useState([]);
  const [editingDevis, setEditingDevis] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    adresseDepart: '',
    adresseArrivee: '',
    dateDepart: '',
    heureDepart: '',
    dateRetour: '',
    heureRetour: '',
    tarif: '',
    statut: '',
  });
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();

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
    const nextForm = {
      ...devis,
      dateDepart: devis.dateDepart ? devis.dateDepart.slice(0, 10) : '',
      dateRetour: devis.dateRetour ? devis.dateRetour.slice(0, 10) : '',
      heureDepart: devis.heureDepart || '',
      heureRetour: devis.heureRetour || '',
    };
    setFormData(nextForm);

    if (nextForm.dateDepart && nextForm.dateRetour && nextForm.dateRetour < nextForm.dateDepart) {
      setDateError("La date de retour ne peut pas être antérieure à la date de départ");
    } else {
      setDateError('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...formData, [name]: value };
    setFormData(next);

    if (next.dateDepart && next.dateRetour && next.dateRetour < next.dateDepart) {
      setDateError("La date de retour ne peut pas être antérieure à la date de départ");
    } else {
      setDateError('');
    }
  };

  const saveChanges = async () => {
    if (formData.dateDepart && formData.dateRetour && formData.dateRetour < formData.dateDepart) {
      setDateError("La date de retour ne peut pas être antérieure à la date de départ");
      return;
    }

    try {
      await axios.put(`http://localhost:8000/api/devis/${editingDevis.id}`, formData);
      setDevisList(devisList.map(d => d.id === editingDevis.id ? { ...d, ...formData } : d));
      setEditingDevis(null);
      setDateError('');
    } catch (error) {
      console.error("Erreur mise à jour devis :", error);
    }
  };

  const cancelEdit = () => {
    setEditingDevis(null);
    setDateError('');
  };

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

        {/* 🔽 Bouton Ajouter un devis */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <button
            onClick={() => navigate('/devis/ajouter')}
            style={{
              backgroundColor: '#43935e',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Ajouter un devis
          </button>
        </div>

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
                      className={`status-select ${devis.statut ? `statut-${devis.statut.toLowerCase().replace(/\s/g, '')}` : ''}`}
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

        {/* ... modal pour édition (inchangée) ... */}

      </main>
    </div>
  );
};

export default ListeDevis;

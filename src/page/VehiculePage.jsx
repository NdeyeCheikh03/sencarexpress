import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../page/sidebar';
import axios from 'axios';
import '../style/VehiculePage.css';

const VehiculesPage = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/vehicules');
        setVehicles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des véhicules :', error);
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const parseDate = (dateString) => {
    if (!dateString) return null;
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      return new Date(`${year}-${month}-${day}`);
    }
    return new Date(dateString);
  };

  // Retourne style orange si fin d'assurance dans moins de 30 jours
  const getAssuranceStyle = (dateFin) => {
    const fin = parseDate(dateFin);
    if (!fin) return {};
    const today = new Date();
    today.setHours(0,0,0,0);
    fin.setHours(0,0,0,0);

    const diffDays = Math.floor((fin - today) / (1000*60*60*24));
    if (diffDays >=0 && diffDays <= 30) {
      return { color: 'orange', fontWeight: 'bold' };
    }
    return {};
  };

  const handleEtatChange = async (vehicule, newEtat) => {
    try {
      await axios.patch(`http://localhost:8000/api/vehicules/${vehicule.id}/etat`, {
        etat: newEtat
      });
      setVehicles(prev => prev.map(v => v.id === vehicule.id ? { ...v, etat: newEtat } : v));
    } catch (error) {
      console.error('Erreur lors du changement d’état :', error);
    }
  };

  return (
    <div className="vehicles-page-wrapper" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="vehicles-container">
        <h1>Liste des Véhicules</h1>
        {loading ? <p>Chargement...</p> :
          <table className="vehicles-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Marque</th>
                <th>Année Circulation</th>
                <th>Année Acquisition</th>
                <th>Immatriculation</th>
                <th>Assurance Début</th>
                <th>Assurance Fin</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(vehicule => (
                <tr key={vehicule.id}>
                  <td data-label="Type">{vehicule.type}</td>
                  <td data-label="Marque">{vehicule.marque}</td>
                  <td data-label="Année Circulation">{vehicule.annee_circulation}</td>
                  <td data-label="Année Acquisition">{vehicule.annee_acquisition}</td>
                  <td data-label="Immatriculation">{vehicule.immatriculation}</td>
                  <td data-label="Assurance Début">
                    {parseDate(vehicule.assurance_debut)?.toLocaleDateString('fr-FR')}
                  </td>
                  <td data-label="Assurance Fin" style={getAssuranceStyle(vehicule.assurance_fin)}>
                    {parseDate(vehicule.assurance_fin)?.toLocaleDateString('fr-FR')}
                  </td>
                  <td data-label="État">
                    <select
                      value={vehicule.etat || ''}
                      onChange={e => handleEtatChange(vehicule, e.target.value)}
                      className={`status-select ${vehicule.etat || ''}`}
                    >
                      <option value="" disabled>Sélectionner un état</option>
                      <option value="available">Disponible</option>
                      <option value="rented">Loué</option>
                      <option value="broken">En panne</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        <button className="back-button" onClick={() => navigate(-1)}>← Retour</button>
      </div>
    </div>
  );
};

export default VehiculesPage;

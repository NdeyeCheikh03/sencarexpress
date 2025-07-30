import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../page/sidebar';
import axios from 'axios';
import '../style/VehiculePage.css';

const VehiculesPage = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des véhicules depuis l'API Laravel
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

  return (
    <div className="vehicles-page-wrapper">
      <Sidebar />
      <div className="vehicles-container">
        <h1>Liste des Véhicules</h1>

        {loading ? (
          <p>Chargement...</p>
        ) : (
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
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicule) => (
                <tr key={vehicule.id}>
                  <td data-label="Type">{vehicule.type}</td>
                  <td data-label="Marque">{vehicule.marque}</td>
                  <td data-label="Année Circulation">{vehicule.annee_circulation}</td>
                  <td data-label="Année Acquisition">{vehicule.annee_acquisition}</td>
                  <td data-label="Immatriculation">{vehicule.immatriculation}</td>
                  <td data-label="Assurance Début">
                    {new Date(vehicule.assurance_debut).toLocaleDateString('fr-FR')}
                  </td>
                  <td data-label="Assurance Fin">
                    {new Date(vehicule.assurance_fin).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button className="back-button" onClick={() => navigate(-1)}>← Retour</button>
      </div>
    </div>
  );
};

export default VehiculesPage;

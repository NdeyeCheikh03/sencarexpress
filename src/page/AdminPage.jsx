import React, { useContext, useEffect, useState } from 'react';
import '../style/admin.css';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../page/sidebar';
import logo from "../assets/logo.jpg"

const AdminPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [devisList, setDevisList] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [chauffeurs, setChauffeurs] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchDevis = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/devis');
        setDevisList(res.data);
      } catch (error) {
        console.error('Erreur lors du chargement des devis :', error);
      }
    };

    const fetchVehicles = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/vehicules');
        setVehicles(res.data);
      } catch (error) {
        console.error('Erreur lors du chargement des véhicules :', error);
      }
    };

    const fetchChauffeurs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/chauffeurs');
        setChauffeurs(res.data);
      } catch (error) {
        console.error('Erreur lors du chargement des chauffeurs :', error);
      }
    };

    fetchDevis();
    fetchVehicles();
    fetchChauffeurs();
  }, []);

  const getEtatLabel = (etat) => {
    switch (etat) {
      case 'available':
        return { label: 'Disponible', className: 'disponible' };
      case 'rented':
        return { label: 'Loué', className: 'loue' };
      case 'broken':
        return { label: 'En panne', className: 'en-panne' };
      default:
        return { label: etat, className: '' };
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
      <div className="logo">
  <img src= {logo} alt="SencarExpress" style={{ height: '55px', width: '150px' }} />
</div>

        <div className="admin-user">
          👤 {user ? user.name : 'Utilisateur'}
          <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
        </div>
      </header>

      <div className="admin-content">
        <Sidebar />
        <main className="dashboard-grid">
          {/* Calendrier */}
          <section className="dashboard-section">
            <h2>Disponibilité - Avril 2024</h2>
            <div className="calendar">
              {[...Array(30)].map((_, i) => {
                const day = i + 1;
                let status = '';
                if ([10, 11, 15, 16, 17].includes(day)) status = 'disponible';
                else if ([13, 14, 25].includes(day)) status = 'limite';
                else if ([23, 28, 30].includes(day)) status = 'complet';

                return (
                  <div key={day} className={`calendar-day ${status}`}>
                    {day}
                  </div>
                );
              })}
            </div>
            <div className="calendar-legend">
              <span className="dot disponible"></span> Disponible
              <span className="dot limite"></span> Limite
              <span className="dot complet"></span> Complet
            </div>
          </section>

          {/* Véhicules */}
          <section className="dashboard-section">
            <h2>Véhicules</h2>
            <table>
            <thead>
  <tr>
    <th>Type</th>
    <th>Marque</th>
    <th>Immatriculation</th>
    <th>Assurance (fin)</th>
  </tr>
</thead>
<tbody>
  {vehicles.length === 0 ? (
    <tr><td colSpan="4">Chargement des véhicules...</td></tr>
  ) : (
    vehicles.slice(0, 3).map((vehicule) => (
      <tr key={vehicule.id}>
        <td>{vehicule.type}</td>
        <td>{vehicule.marque}</td>
        <td>{vehicule.immatriculation}</td>
        <td>{new Date(vehicule.assurance_fin).toLocaleDateString()}</td>
      </tr>
    ))
  )}
</tbody>

            </table>
            <button className="ajouter-vehicule-btn" onClick={() => navigate('/liste/vehicules')}>Voir Plus</button>
          </section>

          {/* Conteneur Devis + Chauffeurs */}
          <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
            {/* Devis */}
            <section className="dashboard-section" style={{ flex: 1, marginRight: '10px' }}>
  <h2>Liste des devis</h2>
  <table>
    <thead>
      <tr>
        <th>Nom</th>
        <th>Départ</th>
        <th>Arrivée</th>
        <th>Statut</th>
      </tr>
    </thead>
    <tbody>
      {devisList.length === 0 ? (
        <tr><td colSpan="4">Aucun devis reçu</td></tr>
      ) : (
        devisList.slice(0, 3).map((devis) => (
          <tr key={devis.id}>
            <td>{devis.nom}</td>
            <td>{devis.adresseDepart}</td>
            <td>{devis.adresseArrivee}</td>
            <td>{devis.statut}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
  <button className="ajouter-vehicule-btn" onClick={() => navigate('/liste/devis')}>
    Voir Plus
  </button>
</section>

            {/* Chauffeurs */}
            <section className="dashboard-section" style={{ flex: 1, marginLeft: '10px' }}>
              <h2>Chauffeurs</h2>
              <table>
              <thead>
  <tr>
    <th>Nom</th>
    <th>Prénom</th>
    <th>Téléphone</th>
    <th>Permis</th>
  </tr>
</thead>
<tbody>
  {chauffeurs.length === 0 ? (
    <tr><td colSpan="4">Chargement des chauffeurs...</td></tr>
  ) : (
    chauffeurs.slice(0, 3).map((chauffeur) => (
      <tr key={chauffeur.id}>
        <td>{chauffeur.nom}</td>
        <td>{chauffeur.prenom}</td>
        <td>{chauffeur.telephone}</td>
        <td>{chauffeur.type_permis}</td>
      </tr>
    ))
  )}
</tbody>

              </table>
              <button className="ajouter-vehicule-btn" onClick={() => navigate('/liste/chauffeurs')}>
                Voir Plus
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;

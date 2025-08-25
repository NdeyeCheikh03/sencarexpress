import React, { useContext, useEffect, useState } from 'react';
import '../style/admin.css';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../page/sidebar';
import logo from "../assets/logo.jpg";

// API centralisée
import api from "../api";  

// FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';

const AdminPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [devisList, setDevisList] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [chauffeurs, setChauffeurs] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appels API via instance axios (api.js)
        const [resDevis, resVehicles, resChauffeurs, resDisponibilites] = await Promise.all([
          api.get('/devis'),
          api.get('/vehicules'),
          api.get('/chauffeurs'),
          api.get('/disponibilites')
        ]);

        setDevisList(resDevis.data);
        setVehicles(resVehicles.data);
        setChauffeurs(resChauffeurs.data);

        // 🔥 Transformation des disponibilités en événements FullCalendar
        const events = resDisponibilites.data.disponibilites.map(d => {
          let color = '';
          if (d.etat === 'disponible') color = '#d4f8d4';
          if (d.etat === 'limite') color = '#ffe9b3';
          if (d.etat === 'complet') color = '#ffcccc';

          return {
            title: d.etat.charAt(0).toUpperCase() + d.etat.slice(1),
            start: d.date,
            backgroundColor: color,
            borderColor: color
          };
        });

        setCalendarEvents(events);

      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="logo">
          <img src={logo} alt="SencarExpress" style={{ height: '55px', width: '150px' }} />
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
          <section className="dashboard-section full-width">
            <h2>Disponibilités</h2>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              locale={frLocale}
              firstDay={1}
              dayHeaderContent={(arg) => {
                const jours = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
                return jours[arg.date.getDay()];
              }}
              events={calendarEvents}
              height={400}
            />

            {/* Légende */}
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
            <button className="ajouter-vehicule-btn" onClick={() => navigate('/liste/vehicules')}>
              Voir Plus
            </button>
          </section>

          {/* Devis + Chauffeurs */}
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

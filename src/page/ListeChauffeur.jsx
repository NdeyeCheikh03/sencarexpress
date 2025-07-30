import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../page/sidebar';
import '../style/ListeChauffeur.css';

const ListeChauffeurs = () => {
  const [chauffeurs, setChauffeurs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChauffeurs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chauffeurs');
        setChauffeurs(response.data);
      } catch (error) {
        console.error('Erreur de chargement:', error);
      }
    };

    fetchChauffeurs();
  }, []);

  return (
    <div className="chauffeurs-layout">
      <Sidebar />
      <div className="chauffeurs-content">
        <div className="header-liste">
          <h2>Liste des Chauffeurs</h2>
          <button className="ajouter-btn" onClick={() => navigate('/chauffeurs/ajouter')}>
            + Ajouter un chauffeur
          </button>
        </div>
        <table className="chauffeurs-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Date de naissance</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Contact urgence</th>
              <th>Permis</th>
              <th>ID</th>
              <th>Expérience (ans)</th>
            </tr>
          </thead>
          <tbody>
  {chauffeurs.map((chauffeur) => (
    <tr key={chauffeur.id}>
      <td>{chauffeur.nom}</td>
      <td>{chauffeur.prenom}</td>
      <td>{chauffeur.date_naissance}</td>        {/* ✅ correction */}
      <td>{chauffeur.adresse}</td>
      <td>{chauffeur.telephone}</td>
      <td>{chauffeur.contact_urgence}</td>       {/* ✅ correction */}
      <td>{chauffeur.type_permis}</td>           {/* ✅ correction */}
      <td>{chauffeur.numero_id}</td>
      <td>{chauffeur.annees_experience}</td>     {/* ✅ correction */}
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default ListeChauffeurs;

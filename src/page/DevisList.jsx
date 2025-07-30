import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext'; // Pour récupérer le token s'il existe
import '../style/DevisList.css'; // Optionnel pour le style

const DevisList = () => {
  const [devis, setDevis] = useState([]);
  const { token } = useContext(AuthContext); // si tu stockes le token ici

  useEffect(() => {
    fetchDevis();
  }, []);

  const fetchDevis = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/devis', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDevis(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des devis :', error);
    }
  };

  return (
    <div className="devis-list-container">
      <h2>Liste des demandes de devis</h2>
      <table className="devis-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {devis.length === 0 ? (
            <tr><td colSpan="5">Aucun devis trouvé</td></tr>
          ) : (
            devis.map((item, index) => (
              <tr key={index}>
                <td>{item.nom}</td>
                <td>{item.email}</td>
                <td>{item.telephone}</td>
                <td>{item.message}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DevisList;

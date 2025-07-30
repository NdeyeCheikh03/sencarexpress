import React, { useState } from 'react';
import Sidebar from '../page/sidebar'; // adapte le chemin selon ton projet
import axios from 'axios';
import '../style/AjoutVehicule.css';

const AjoutVehiculeForm = () => {
  const [formData, setFormData] = useState({
    type: '',
    marque: '',
    annee_circulation: '',
    annee_acquisition: '',
    immatriculation: '',
    assurance_debut: '',
    assurance_fin: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/vehicules', formData);
      setMessage('Véhicule ajouté avec succès !');
      console.log(response.data);
      
      // Réinitialiser le formulaire
      setFormData({
        type: '',
        marque: '',
        annee_circulation: '',
        annee_acquisition: '',
        immatriculation: '',
        assurance_debut: '',
        assurance_fin: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du véhicule :', error.response?.data || error);
      setMessage('Une erreur est survenue. Veuillez vérifier les champs.');
    }
  };

  return (
    <div className="vehicule-layout">
      <Sidebar />
      <div className="vehicule-content">
        <form onSubmit={handleSubmit} className="form-ajout">
          <h2>Ajout d’un nouveau véhicule</h2>

          {message && <p className="message">{message}</p>}

          <label>Type de véhicule:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Choisir</option>
            <option value="15">15 places</option>
            <option value="25">25 places</option>
            <option value="35">35 places</option>
            <option value="60">60 places</option>
            <option value="7">7 places</option>
            <option value="5">5 places</option>
          </select>

          <label>Marque:</label>
          <input type="text" name="marque" value={formData.marque} onChange={handleChange} required />

          <label>Année de circulation:</label>
          <input type="number" name="annee_circulation" value={formData.annee_circulation} onChange={handleChange} required />

          <label>Année d’acquisition:</label>
          <input type="number" name="annee_acquisition" value={formData.annee_acquisition} onChange={handleChange} required />

          <label>Immatriculation:</label>
          <input type="text" name="immatriculation" value={formData.immatriculation} onChange={handleChange} required />

          <label>Début d’assurance:</label>
          <input type="date" name="assurance_debut" value={formData.assurance_debut} onChange={handleChange} required />

          <label>Fin d’assurance:</label>
          <input type="date" name="assurance_fin" value={formData.assurance_fin} onChange={handleChange} required />

          <button type="submit" className="valider-btn">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default AjoutVehiculeForm;

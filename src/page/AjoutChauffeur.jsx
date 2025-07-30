import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../page/sidebar';
import '../style/AjoutChauffeur.css';

const AjoutChauffeur = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    adresse: '',
    telephone: '',
    contactUrgence: '',
    typePermis: '',
    numeroID: '',
    anneesExperience: '',
    cni: null,
    permis: null,
    cv: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === 'file' ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.post('http://localhost:8000/api/chauffeurs', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Chauffeur ajouté avec succès !');
      navigate('/liste/chauffeurs'); // Redirection vers la liste
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l’ajout.");
    }
  };

  return (
    <div className="chauffeur-layout">
      <Sidebar />
      <div className="chauffeur-content">
        <h2>Ajouter un Chauffeur</h2>
        <form className="chauffeur-form" onSubmit={handleSubmit}>
          <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
          <input type="text" name="prenom" placeholder="Prénom" value={formData.prenom} onChange={handleChange} required />
          <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} required />
          <input type="text" name="adresse" placeholder="Adresse" value={formData.adresse} onChange={handleChange} required />
          <input type="tel" name="telephone" placeholder="Téléphone" value={formData.telephone} onChange={handleChange} required />
          <input type="text" name="contactUrgence" placeholder="Contact d'urgence" value={formData.contactUrgence} onChange={handleChange} required />
          <select name="typePermis" value={formData.typePermis} onChange={handleChange} required>
            <option value="">-- Type de permis --</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
          <input type="text" name="numeroID" placeholder="Numéro ID" value={formData.numeroID} onChange={handleChange} required />
          <input type="number" name="anneesExperience" placeholder="Années d'expérience" value={formData.anneesExperience} onChange={handleChange} required />
          <label>CNI :</label>
          <input type="file" name="cni" accept=".jpg,.jpeg,.png,.pdf" onChange={handleChange} required />
          <label>Permis :</label>
          <input type="file" name="permis" accept=".jpg,.jpeg,.png,.pdf" onChange={handleChange} required />
          <label>CV :</label>
          <input type="file" name="cv" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} required />
          <button type="submit" className="submit-btn">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default AjoutChauffeur;

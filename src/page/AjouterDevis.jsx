// src/page/AjouterDevis.jsx
import React, { useState } from "react";
import Sidebar from "../page/sidebar";
import axios from "axios";
import "../style/AjouterDevis.css"; // ton style que tu as partagé

export default function AjouterDevis() {
  const [form, setForm] = useState({
    organisme: "",
    nom: "",
    adresseDepart: "",
    adresseArrivee: "",
    dateDepart: "",
    heureDepart: "",
    dateRetour: "",
    heureRetour: "",
    telephone: "",
    email: "",
    typeBus: "Bus de 60 places",
    informations: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.nom.trim()) newErrors.nom = "Champ requis";
    if (!form.organisme.trim()) newErrors.organisme = "Champ requis";
    if (!form.email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Adresse email invalide";
    if (!form.adresseDepart.trim()) newErrors.adresseDepart = "Champ requis";
    if (!form.adresseArrivee.trim()) newErrors.adresseArrivee = "Champ requis";
    if (!form.dateDepart || !form.heureDepart) newErrors.dateDepart = "Champ requis";
    if (!form.dateRetour || !form.heureRetour) newErrors.dateRetour = "Champ requis";
    if (!form.telephone.trim().match(/^\+?[0-9\s.-]{7,15}$/)) newErrors.telephone = "Numéro de téléphone invalide";

    const depart = new Date(`${form.dateDepart}T${form.heureDepart}`);
    const retour = new Date(`${form.dateRetour}T${form.heureRetour}`);
    if (depart && retour && retour < depart) newErrors.dateRetour = "La date de retour ne peut pas être antérieure à la date de départ";

    setErrors(newErrors);
    setSuccess("");

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:8000/api/devis", form, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200 || response.status === 201) {
          setSuccess("Devis ajouté avec succès !");
          setForm({
            organisme: "",
            nom: "",
            adresseDepart: "",
            adresseArrivee: "",
            dateDepart: "",
            heureDepart: "",
            dateRetour: "",
            heureRetour: "",
            telephone: "",
            email: "",
            typeBus: "Bus de 60 places",
            informations: "",
          });
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi :", error);
        alert("Une erreur est survenue lors de l'envoi du formulaire.");
      }
    }
  };

  return (
    <div className="chauffeur-layout">
      <Sidebar />
      <div className="chauffeur-content">
        <h2>Ajouter un nouveau devis</h2>
        {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
        <form className="chauffeur-form" onSubmit={handleSubmit}>
          <label>Nom de l'organisme</label>
          <input type="text" name="organisme" value={form.organisme} onChange={handleChange} />
          {errors.organisme && <p style={{ color: "red" }}>{errors.organisme}</p>}

          <label>Nom complet</label>
          <input type="text" name="nom" value={form.nom} onChange={handleChange} />
          {errors.nom && <p style={{ color: "red" }}>{errors.nom}</p>}

          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

          <label>Téléphone</label>
          <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} />
          {errors.telephone && <p style={{ color: "red" }}>{errors.telephone}</p>}

          <label>Adresse de départ</label>
          <input type="text" name="adresseDepart" value={form.adresseDepart} onChange={handleChange} />
          {errors.adresseDepart && <p style={{ color: "red" }}>{errors.adresseDepart}</p>}

          <label>Adresse d'arrivée</label>
          <input type="text" name="adresseArrivee" value={form.adresseArrivee} onChange={handleChange} />
          {errors.adresseArrivee && <p style={{ color: "red" }}>{errors.adresseArrivee}</p>}

          <label>Date départ</label>
          <input type="date" name="dateDepart" value={form.dateDepart} onChange={handleChange} />

          <label>Heure départ</label>
          <input type="time" name="heureDepart" value={form.heureDepart} onChange={handleChange} />
          {errors.dateDepart && <p style={{ color: "red" }}>{errors.dateDepart}</p>}

          <label>Date retour</label>
          <input type="date" name="dateRetour" value={form.dateRetour} onChange={handleChange} />

          <label>Heure retour</label>
          <input type="time" name="heureRetour" value={form.heureRetour} onChange={handleChange} />
          {errors.dateRetour && <p style={{ color: "red" }}>{errors.dateRetour}</p>}

          <label>Type de bus</label>
          <select name="typeBus" value={form.typeBus} onChange={handleChange}>
            <option>Bus de 60 places</option>
            <option>Bus de 35 places</option>
            <option>Bus de 25 places</option>
            <option>Van de 15 places</option>
            <option>Voiture de 7 places</option>
            <option>Voiture de 5 places</option>
          </select>

          <label>Informations supplémentaires</label>
          <textarea name="informations" value={form.informations} onChange={handleChange} rows={3}></textarea>

          <button type="submit" className="submit-btn">Ajouter le devis</button>
        </form>
      </div>
    </div>
  );
}

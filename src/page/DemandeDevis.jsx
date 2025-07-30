import React, { useState } from "react";
import axios from "axios";
import "../style/DemandeDevis.css";
import logo from "../assets/logo.jpg";

export default function DemandeDevis() {
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
    if (!form.email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Adresse email invalide";
    }
    if (!form.adresseDepart.trim()) newErrors.adresseDepart = "Champ requis";
    if (!form.adresseArrivee.trim()) newErrors.adresseArrivee = "Champ requis";
    if (!form.dateDepart || !form.heureDepart) newErrors.dateDepart = "Champ requis";
    if (!form.dateRetour || !form.heureRetour) newErrors.dateRetour = "Champ requis";
    if (!form.telephone.trim().match(/^\+?[0-9\s.-]{7,15}$/)) {
      newErrors.telephone = "Numéro de téléphone invalide";
    }

    const depart = new Date(`${form.dateDepart}T${form.heureDepart}`);
    const retour = new Date(`${form.dateRetour}T${form.heureRetour}`);
    if (depart && retour && retour < depart) {
      newErrors.dateRetour = "La date de retour ne peut pas être antérieure à la date de départ";
    }

    setErrors(newErrors);
    setSuccess("");

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:8000/api/devis", form, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200 || response.status === 201) {
          setSuccess("Demande envoyée avec succès !");
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
    <>
      {/* === NAVBAR === */}
      <nav className="navbar">
        <div className="logo">
          <img
            src={logo}
            alt="Logo Sen Car Express"
            style={{ height: "85px", width: "160px" }}
          />
        </div>
        <div className="menu">
          <a href="/">Accueil</a>
          <a href="/#services">Services</a>
          <a href="/#about">À propos de nous</a>
          <a href="/#contact">Avis</a>
          <a
            href="/devis"
            style={{
              backgroundColor: "#10b981",
              color: "white",
              padding: "8px 16px",
              borderRadius: "40px",
              fontWeight: "bold",
              textDecoration: "none",
              boxShadow: "0 2px 6px rgba(18, 146, 26, 0.3)",
              transition: "background-color 0.3s",
            }}
          >
            Demander un devis
          </a>
        </div>
      </nav>

      {/* === FORMULAIRE === */}
      <div className="container-devis">
        <h1>DEMANDER UN DEVIS</h1>
        {success && <p className="success-message">{success}</p>}
        <form className="devis-form" onSubmit={handleSubmit}>
          {/* Bloc gauche */}
          <div className="bloc">
            <div className="field">
              <label htmlFor="organisme">Nom de l'organisme</label>
              <input
                id="organisme"
                name="organisme"
                type="text"
                value={form.organisme}
                onChange={handleChange}
              />
              {errors.organisme && <p className="error-message">{errors.organisme}</p>}
            </div>
            <div className="field">
              <label htmlFor="nom">Votre nom complet</label>
              <input
                id="nom"
                name="nom"
                type="text"
                value={form.nom}
                onChange={handleChange}
              />
              {errors.nom && <p className="error-message">{errors.nom}</p>}
            </div>
            <div className="field">
              <label htmlFor="email">Adresse email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="field">
              <label htmlFor="adresseDepart">Adresse de départ</label>
              <input
                id="adresseDepart"
                name="adresseDepart"
                type="text"
                value={form.adresseDepart}
                onChange={handleChange}
              />
              {errors.adresseDepart && <p className="error-message">{errors.adresseDepart}</p>}
            </div>
            <div className="field">
              <label htmlFor="adresseArrivee">Adresse d'arrivée</label>
              <input
                id="adresseArrivee"
                name="adresseArrivee"
                type="text"
                value={form.adresseArrivee}
                onChange={handleChange}
              />
              {errors.adresseArrivee && <p className="error-message">{errors.adresseArrivee}</p>}
            </div>
            <div className="field">
              <label>Date de départ</label>
              <input
                type="date"
                name="dateDepart"
                value={form.dateDepart}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Bloc droit */}
          <div className="bloc">
            <div className="field">
              <label>Heure de départ</label>
              <input
                type="time"
                name="heureDepart"
                value={form.heureDepart}
                onChange={handleChange}
              />
              {errors.dateDepart && <p className="error-message">{errors.dateDepart}</p>}
            </div>
            <div className="field">
              <label>Date de retour</label>
              <input
                type="date"
                name="dateRetour"
                value={form.dateRetour}
                onChange={handleChange}
              />
              <label>Heure de retour</label>
              <input
                type="time"
                name="heureRetour"
                value={form.heureRetour}
                onChange={handleChange}
              />
              {errors.dateRetour && <p className="error-message">{errors.dateRetour}</p>}
            </div>
            <div className="field">
              <label htmlFor="telephone">Votre numéro de téléphone</label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                value={form.telephone}
                onChange={handleChange}
              />
              {errors.telephone && <p className="error-message">{errors.telephone}</p>}
            </div>
            <div className="field">
              <label htmlFor="typeBus">Type de bus</label>
              <select
                id="typeBus"
                name="typeBus"
                value={form.typeBus}
                onChange={handleChange}
              >
                <option>Bus de 60 places</option>
                <option>Bus de 35 places</option>
                <option>Bus de 25 places</option>
                <option>Van de 15 places</option>
                <option>Voiture de 7 places</option>
                <option>Voiture de 5 places</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="informations">Informations supplémentaires</label>
              <textarea
                id="informations"
                name="informations"
                rows={3}
                placeholder="Indiquez ici toute information utile..."
                value={form.informations}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            ENVOYER
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Services</h3>
            <ul>
              <li>Location Touristique</li>
              <li>Sortie Pédagogique</li>
              <li>Location pour événement religieux</li>
              <li>Transport Scolaire</li>
              <li>Séminaire & Team-building</li>
            </ul>
          </div>
          <div className="footer-column footer-description">
            <p>
              Sen Car Express propose la location de bus confortables (5 à 60 places) pour tous vos déplacements.
              Tukkil ak Diam : voyager en toute tranquillité, avec confort et sécurité.
            </p>
            <div className="footer-socials">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-linkedin-in"></i>
            </div>
          </div>
          <div className="footer-column">
            <h3>Contact</h3>
            <ul className="contact-list">
              <li><i className="fas fa-phone-alt"></i> 456-575-4551</li>
              <li><i className="fas fa-envelope"></i> example@gmail.com</li>
              <li><i className="fas fa-map-marker-alt"></i> Lorem Ipsum, Dakar</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

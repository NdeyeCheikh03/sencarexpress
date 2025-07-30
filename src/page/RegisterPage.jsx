import React, { useState } from 'react';
import axios from 'axios';
import '../style/RegisterPage.css'; // Assure-toi que ce fichier existe

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register', form);
      alert('Inscription réussie ! Connecte-toi maintenant.');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Créer un compte Admin</h2>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Nom complet"
          required
        />
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterPage;

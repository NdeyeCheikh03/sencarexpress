import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../style/LoginPage.css'; // Vérifie que ce fichier est bien lié

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login', { email, password });
      login(res.data.user);
      navigate('/admin');
    } catch (error) {
      alert('Identifiants incorrects');
      console.error(error);
    }
  };

  return (
    <div className="login-page"> {/* ← cette classe DOIT correspondre au CSS */}
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;

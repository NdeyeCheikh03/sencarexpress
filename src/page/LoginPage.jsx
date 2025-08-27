import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../style/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Reset des erreurs

    try {
      const res = await axios.post(
        'http://localhost:8000/api/login',
        { email, password },
        { headers: { 'Accept': 'application/json' } }
      );

      // Stocker le token dans localStorage
      localStorage.setItem('token', res.data.token);

      // Stocker l'utilisateur dans le contexte
      login(res.data.user);

      // Redirection vers /admin
      navigate('/admin');
    } catch (error) {
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.errors) {
          // Erreurs de validation
          const messages = Object.values(data.errors).flat().join(' ');
          setErrorMsg(messages);
        } else if (data.error) {
          setErrorMsg(data.error);
        } else if (data.message) {
          setErrorMsg(data.message);
        } else {
          setErrorMsg('Identifiants incorrects');
        }
      } else {
        setErrorMsg('Erreur serveur');
      }
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>

        {errorMsg && <div className="error-message">{errorMsg}</div>}

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

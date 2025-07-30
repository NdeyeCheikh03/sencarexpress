// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import DemandeDevis from "./page/DemandeDevis";
import AdminPage from "./page/AdminPage";
import LoginPage from "./page/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import RegisterPage from "./page/RegisterPage";
import AjoutVehicule from './page/AjoutVehiculeForm';
import AjoutChauffeur from './page/AjoutChauffeur';
import VehiculesPage from "./page/VehiculePage";
import ListeChauffeurs from "./page/ListeChauffeur";
import DevisList from "./page/DevisList.jsx";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demande-devis" element={<DemandeDevis />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/vehicules/ajouter" element={<AjoutVehicule />} />
<Route path="/chauffeurs/ajouter" element={<AjoutChauffeur />} />
<Route path="/liste/vehicules" element={<VehiculesPage/>} />
<Route path="/liste/chauffeurs" element={<ListeChauffeurs/>} />
<Route path="/liste/devis" element={<DevisList/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

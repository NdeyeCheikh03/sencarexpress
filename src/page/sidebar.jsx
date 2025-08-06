import React, { useState } from 'react';
import '../style/sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title">Panneau Admin</div>
      <ul>
        {/* Accueil */}
        <li onClick={() => navigate('/admin')}> Accueil</li>

        {/* Gestion des devis */}
        <li onClick={() => toggleMenu('gestionDevis')}>
           Gestion des devis
        </li>
        {openMenu === 'gestionDevis' && (
          <div className="submenu">
            <ul>
              <li onClick={() => navigate('/liste/devis')}>Liste des devis</li>
              <li onClick={() => navigate('/devis/ajouter')}>Ajouter un devis</li>
            </ul>
          </div>
        )}

        {/* Gestion des utilisateurs */}
        <li onClick={() => toggleMenu('gestionUtilisateurs')}>
           Gestion des utilisateurs
        </li>
        {openMenu === 'gestionUtilisateurs' && (
          <div className="submenu">
            <ul>
              <li onClick={() => navigate('/utilisateurs')}>Liste des utilisateurs</li>
              
            </ul>
          </div>
        )}

        {/* Gestion des véhicules */}
        <li onClick={() => toggleMenu('gestionVehicules')}>
           Gestion des véhicules
        </li>
        {openMenu === 'gestionVehicules' && (
          <div className="submenu">
            <ul>
              <li onClick={() => navigate('/liste/vehicules')}>Liste des véhicules</li>
              <li onClick={() => navigate('/vehicules/ajouter')}>Ajouter un véhicule</li>
            </ul>
          </div>
        )}

        {/* Gestion des chauffeurs */}
        <li onClick={() => toggleMenu('gestionChauffeurs')}>
           Gestion des chauffeurs
        </li>
        {openMenu === 'gestionChauffeurs' && (
          <div className="submenu">
            <ul>
              <li onClick={() => navigate('/liste/chauffeurs')}>Liste des chauffeurs</li>
              <li onClick={() => navigate('/chauffeurs/ajouter')}>Ajouter un chauffeur</li>
            </ul>
          </div>
        )}
         <li onClick={() => navigate('/tarification')}>Tarification</li>
      </ul>
    </div>
  );
};

export default Sidebar;

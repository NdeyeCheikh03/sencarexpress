// src/api.js
import axios from "axios";

// URL de base de ton API Laravel
const API_URL = "http://127.0.0.1:8000/api";

// Instance Axios avec config par défaut
const api = axios.create({
  baseURL: API_URL,
});

// Ajouter automatiquement le token d'authentification si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // stocké après login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ===================== AUTH ===================== */
export const register = (data) => api.post("/register", data);
export const login = (data) => api.post("/login", data);
export const getProfile = () => api.get("/me");
export const logout = () => api.post("/logout");

/* ===================== DEVIS ===================== */
export const createDevis = (data) => api.post("/devis", data);
export const getDevis = () => api.get("/devis");
export const updateDevis = (id, data) => api.put(`/devis/${id}`, data);
export const deleteDevis = (id) => api.delete(`/devis/${id}`);

/* ===================== VEHICULES ===================== */
export const createVehicule = (data) => api.post("/vehicules", data);
export const getVehicules = () => api.get("/vehicules");
export const updateVehiculeEtat = (id, data) =>
  api.patch(`/vehicules/${id}/etat`, data);

/* ===================== CHAUFFEURS ===================== */
export const createChauffeur = (data) => api.post("/chauffeurs", data);
export const getChauffeurs = () => api.get("/chauffeurs");

/* ===================== TARIFS ===================== */
export const getTarifs = () => api.get("/tarifs");
export const createTarif = (data) => api.post("/tarifs", data);
export const getTarifById = (id) => api.get(`/tarifs/${id}`);
export const updateTarif = (id, data) => api.put(`/tarifs/${id}`, data);
export const deleteTarif = (id) => api.delete(`/tarifs/${id}`);
/* ===================== DISPONIBILITES ===================== */
export const getDisponibilites = () => api.get("/disponibilites");


export default api;

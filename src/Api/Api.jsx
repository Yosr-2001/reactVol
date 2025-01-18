import axios from 'axios';

// Set the base URL for your Laravel API
const API_BASE_URL = 'http://localhost:8000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * AVIONS
 */
export const getAvions = () => api.get('/avions');
export const createAvion = (avion) => api.post('/avions', avion);
export const updateAvion = (id, avion) => api.put(`/avions/${id}`, avion);
export const deleteAvion = (id) => api.delete(`/avions/${id}`);

/**
 * AEROPORTS
 */
export const getAeroports = () => api.get('/aeroports');
export const createAeroport = (aeroport) => api.post('/aeroports', aeroport);
export const updateAeroport = (id, aeroport) => api.put(`/aeroports/${id}`, aeroport);
export const deleteAeroport = (id) => api.delete(`/aeroports/${id}`);

/**
 * VOLS
 */
export const getVols = () => api.get('/vols');
export const createVol = (vol) => api.post('/vols', vol);
export const updateVol = (id, vol) => api.put(`/vols/${id}`, vol);
export const deleteVol = (id) => api.delete(`/vols/${id}`);

/**
 * RESERVATIONS
 */
export const getReservations = () => api.get('/reservations');
export const createReservation = (reservation) => api.post('/reservations', reservation);

/**
 * PASSAGERS
 */
export const getPassagers = () => api.get('/passagers');

/**
 * OFFRES
 */
export const getOffres = () => api.get('/offres');
export const getOffresPourVol = (volId) => api.get(`/offres/${volId}`);
export const createOffre = (offre) => api.post('/offres', offre);
export const updateOffre = (id, offre) => api.put(`/offres/${id}`, offre);
export const deleteOffre = (id) => api.delete(`/offres/${id}`);


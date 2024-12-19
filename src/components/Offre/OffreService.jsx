import axios from 'axios';

const BASE_URL = 'http://localhost:5235/api/Offre';

export const getOffresAvecPrix = async (volId) => {
  try {
    // Appel à l'API pour récupérer les offres avec le prix du vol associé
    const response = await axios.get(`${BASE_URL}/vol/${volId}`);
    return response.data; // Retourne les offres avec les détails du vol
  } catch (error) {
    console.error('Erreur lors de la récupération des offres:', error);
    throw error;
  }
};

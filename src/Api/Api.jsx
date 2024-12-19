// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5235/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAvions = () => api.get('/Avion');
export const getAeroports = () => api.get('/Aeroport');
export const getVols = () => api.get('/Vol');
export const getReservations = () => api.get('/Reservation');
export const getPassagers = () => api.get('/Passager');

export const createAvion = (avion) => {
  console.log('Create Avion:', avion);
  return api.post('/Avion', avion);
};
// export const updateAvion = (id, avion) => {
//   console.log('Update Avion:', id, avion);
//   return api.put(`/Avion/${id}`, avion);
// };
export const updateAvion = async (avion) => {
  try {
    const response = await fetch(`http://localhost:5235/api/Avion`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avion),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteAvion = (id) => {
  console.log('Delete Avion:', id);
  return api.delete(`/Avion/${id}`);
};

// src/api/api.js
export const createVol = (vol) => {
  console.log('Create Vol:', vol);
  return api.post('/Vol', vol);
};

// export const updateVol = (id, vol) => {
//   console.log('Update Vol:', id, vol);
//   return api.put(`/Vol/${id}`, vol);
// };

export const updateVol = async (id, vol) => {
  try {
    const response = await fetch(`http://localhost:5235/api/Vol`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vol),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return data;
  } catch (error) {
    throw error;
  }
};





export const deleteVol = (id) => {
  console.log('Delete Vol:', id);
  return api.delete(`/Vol/${id}`);
};

export const createAeroport = (aeroport) => {
  console.log('Create Aeroport:', aeroport);
  return api.post('/Aeroport', aeroport);
};
// export const updateAeroport = (id, aeroport) => {
//   console.log('Update Aeroport:', id, aeroport);
//   return api.put(`/Aeroport/${id}`, aeroport);
// };

export const updateAeroport = async (id, aeroport) => {
  try {
    const response = await fetch(`http://localhost:5235/api/Aeroport`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aeroport),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('Content-Type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return data;
  } catch (error) {
    throw error;
  }
};



export const deleteAeroport = (id) => {
  console.log('Delete Aeroport:', id);
  return api.delete(`/Aeroport/${id}`);
};

//export const getVols = () => api.get('/Vol'); 
export const getOffres = () => api.get('/Offre'); 
//export const createOffre = (offre) => api.post('/Offre', offre); 
// export const createOffre = (offre) => {
//   console.log('Create offre:', offre);
//   return api.post('/Offre', offre);
// };
// export const createOffre = (offre) => {
//   console.log('Create offre:', offre);
//   return api.post('/Offre', {
//     nomOffre: offre.nomOffre,
//     pourcentageReduction: parseFloat(offre.pourcentageReduction),
//     idVol: offre.idVol
//   });
// };

export const createOffre = async (offre) => {
  console.log('Create offre:', offre);
  try {
    const response = await fetch('http://localhost:5235/api/Offre', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nomOffre: offre.nomOffre,
        pourcentageReduction: parseFloat(offre.pourcentageReduction),
        idVol: parseInt(offre.idVol, 10), // ID du vol
        vol: offre.vol, // Objet complet du vol
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response error text:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('Content-Type');
    return contentType && contentType.includes('application/json')
      ? await response.json()
      : await response.text();
  } catch (error) {
    console.error('Error in createOffre:', error);
    throw error;
  }
};



export const getOffresPourVol = (volId) => api.get(`/Offre/${volId}`);
export const updateOffre = (id, offre) => api.put(`/Offre/${id}`, offre); 
export const deleteOffre = (id) => api.delete(`/Offre/${id}`);
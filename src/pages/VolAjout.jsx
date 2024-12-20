import React, { useState, useEffect } from 'react';
import { createVol, getAeroports, getAvions } from '../Api/Api';

const VolAjout = ({ refreshData }) => {
  const [formData, setFormData] = useState({
    numeroVol: '',
    heureDepart: '',
    heureArrivee: '',
    statut: '',
    porte: '',
    typeAvion: '',
    idAvion: '',
    idAeroportDepart: '',
    idAeroportArrivee: '',
    prixVol: '',
    nbreReservee: 0, // Toujours égal à 0
  });
  const [submitting, setSubmitting] = useState(false);
  const [aeroports, setAeroports] = useState([]);
  const [avions, setAvions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAeroports = async () => {
      try {
        const response = await getAeroports();
        setAeroports(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des aéroports', error);
        setError('Erreur lors de la récupération des aéroports');
      }
    };

    const fetchAvions = async () => {
      try {
        const response = await getAvions();
        setAvions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des avions', error);
        setError('Erreur lors de la récupération des avions');
      }
    };

    fetchAeroports();
    fetchAvions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Empêcher la modification de `nbreReservee`
    if (name === 'nbreReservee') return;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateFormData = (data) => {
    if (
      !data.numeroVol ||
      !data.heureDepart ||
      !data.heureArrivee ||
      !data.statut ||
      !data.porte ||
      !data.typeAvion ||
      !data.idAvion ||
      !data.idAeroportDepart ||
      !data.idAeroportArrivee ||
      !data.prixVol
    ) {
      setError('Tous les champs sont requis.');
      return false;
    }

    // Vérifier que l'heure d'arrivée est après l'heure de départ
    if (new Date(data.heureArrivee) <= new Date(data.heureDepart)) {
      setError('L’heure d’arrivée doit être après l’heure de départ.');
      return false;
    }

    // Vérifier que les aéroports de départ et d'arrivée sont différents
    if (data.idAeroportDepart === data.idAeroportArrivee) {
      setError('Les aéroports de départ et d’arrivée doivent être différents.');
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!validateFormData(formData)) {
      setSubmitting(false);
      return;
    }

    try {
      const payload = { ...formData, nbreReservee: 0 }; // Assurer nbreReservee = 0
      const response = await createVol(payload);
      console.log('API Response:', response.data);

      setFormData({
        numeroVol: '',
        heureDepart: '',
        heureArrivee: '',
        statut: '',
        porte: '',
        typeAvion: '',
        idAvion: '',
        idAeroportDepart: '',
        idAeroportArrivee: '',
        prixVol: '',
        nbreReservee: 0,
      });

      setSubmitting(false);
      refreshData();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire', error);
      setError(`Erreur lors de la soumission du formulaire : ${error.response?.data?.message || error.message}`);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Ajouter Vol</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label>Numéro de Vol</label>
          <input type="text" name="numeroVol" className="form-control" value={formData.numeroVol} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Heure de Départ</label>
          <input type="datetime-local" name="heureDepart" className="form-control" value={formData.heureDepart} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Heure d'Arrivée</label>
          <input type="datetime-local" name="heureArrivee" className="form-control" value={formData.heureArrivee} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Statut</label>
          <input type="text" name="statut" className="form-control" value={formData.statut} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Porte</label>
          <input type="text" name="porte" className="form-control" value={formData.porte} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Type d'Avion</label>
          <input type="text" name="typeAvion" className="form-control" value={formData.typeAvion} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Avion</label>
          <select name="idAvion" className="form-control" value={formData.idAvion} onChange={handleInputChange} required>
            <option value="">Sélectionnez un avion</option>
            {avions.map((avion) => (
              <option key={avion.idAvion} value={avion.idAvion}>
                {avion.idAvion}-{avion.typeAvion}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Aéroport Départ</label>
          <select name="idAeroportDepart" className="form-control" value={formData.idAeroportDepart} onChange={handleInputChange} required>
            <option value="">Sélectionnez un aéroport</option>
            {aeroports.map((aeroport) => (
              <option key={aeroport.idAeroport} value={aeroport.idAeroport}>
                {aeroport.nomAeroport}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Aéroport Arrivée</label>
          <select name="idAeroportArrivee" className="form-control" value={formData.idAeroportArrivee} onChange={handleInputChange} required>
            <option value="">Sélectionnez un aéroport</option>
            {aeroports.map((aeroport) => (
              <option key={aeroport.idAeroport} value={aeroport.idAeroport}>
                {aeroport.nomAeroport}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Nombre Réservé</label>
          <input type="number" name="nbreReservee" className="form-control" value={formData.nbreReservee} disabled />
        </div>
        <div className="mb-3">
          <label>Prix du Vol</label>
          <input type="number" step="0.01" name="prixVol" className="form-control" value={formData.prixVol} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Ajout en cours...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default VolAjout;
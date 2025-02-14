import React, { useState, useEffect } from 'react';
import { updateVol, getAeroports, getAvions } from '../Api/Api';

const VolModif = ({ formData, setFormData, refreshData }) => {
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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateFormData = (data) => {
    if (!data.numeroVol || !data.heureDepart || !data.heureArrivee || !data.statut || !data.porte || !data.idAvion || !data.typeAvion || !data.idAeroportDepart || !data.idAeroportArrivee || data.nbreReservee === undefined) {
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    console.log('Form Data:', formData);

    if (!validateFormData(formData)) {
      console.error('Les données du formulaire ne sont pas valides');
      setError('Les données du formulaire ne sont pas valides');
      setSubmitting(false);
      return;
    }

    try {
      console.log('Updating Vol:', formData);
      const response = await updateVol(formData.idVol, formData);
      console.log('API Response:', response.data);
      setFormData({});
      setSubmitting(false);
      refreshData();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire', error);
      console.log('Erreur Response:', error.response?.data); // Affichez les détails de la réponse
      setError(`Erreur lors de la soumission du formulaire : ${error.response?.data?.message || error.message}`);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Modifier Vol</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>

        <div className="mb-3">
          <label>ID Vol</label>
          <input type="text" name="idVol" className="form-control" value={formData.idVol || ''} onChange={handleInputChange} required readOnly />
        </div>

        <div className="mb-3">
          <label>Numéro de Vol</label>
          <input type="text" name="numeroVol" className="form-control" value={formData.numeroVol || ''} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Heure de Départ</label>
          <input type="datetime-local" name="heureDepart" className="form-control" value={formData.heureDepart || ''} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Heure d'Arrivée</label>
          <input type="datetime-local" name="heureArrivee" className="form-control" value={formData.heureArrivee || ''} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Statut</label>
          <input type="text" name="statut" className="form-control" value={formData.statut || ''} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Porte</label>
          <input type="text" name="porte" className="form-control" value={formData.porte || ''} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Type d'Avion</label>
          <input type="text" name="typeAvion" className="form-control" value={formData.typeAvion || ''} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Avion</label>
          <select name="idAvion" className="form-control" value={formData.idAvion} onChange={handleInputChange} required>
            <option value="">Sélectionnez un avion</option>
            {avions.map((avion) => (
              <option key={avion.idAvion} value={avion.idAvion}>
                {avion.typeAvion}
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
          <input type="number" name="nbreReservee" className="form-control" value={formData.nbreReservee || ''} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Mise à jour en cours...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  );
};

export default VolModif;

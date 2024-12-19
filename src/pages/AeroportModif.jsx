import React, { useState } from 'react';
import { updateAeroport } from '../Api/Api';

const AeroportModif = ({ formData, setFormData, refreshData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    console.log('Form Data:', formData);

    try {
      console.log('Updating Aeroport:', formData);
      const response = await updateAeroport(formData.idAeroport, formData);
      console.log('API Response:', response);
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
      <h3>Modifier Aéroport</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>

      <div className="mb-3">
          <label>ID Aeroport</label>
          <input type="number" name="idAeroport" className="form-control" value={formData.idAeroport || ''} onChange={handleInputChange} required />
        </div>
        
        <div className="mb-3">
          <label>Nom Aéroport</label>
          <input type="text" name="nomAeroport" className="form-control" value={formData.nomAeroport || ''} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Ville</label>
          <input type="text" name="villeAeroport" className="form-control" value={formData.villeAeroport || ''} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Pays</label>
          <input type="text" name="paysAeroport" className="form-control" value={formData.paysAeroport || ''} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Mise à jour en cours...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  );
};

export default AeroportModif;
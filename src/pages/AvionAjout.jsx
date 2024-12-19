import React, { useState } from 'react';
import { createAvion } from '../Api/Api';

const AvionAjout = ({ refreshData }) => {
  const [formData, setFormData] = useState({});
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
      console.log('Creating Avion:', formData);
      const response = await createAvion(formData);
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
      <h3>Ajouter Avion</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label>Type Avion</label>
          <input type="text" name="typeAvion" className="form-control" value={formData.typeAvion || ''} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Capacité</label>
          <input type="number" name="capaciteAvion" className="form-control" value={formData.capaciteAvion || ''} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label>Fabriquant</label>
          <input type="text" name="fabriquantAvion" className="form-control" value={formData.fabriquantAvion || ''} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Ajout en cours...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default AvionAjout;

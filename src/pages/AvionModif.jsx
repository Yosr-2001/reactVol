import React, { useState } from 'react';
import { updateAvion } from '../Api/Api';
import { useNavigate } from 'react-router-dom';

const AvionModif = ({ formData, setFormData, refreshData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
      console.log('Updating Avion:', formData);
      const response = await updateAvion(formData);
      console.log('API Response:', response);
      setFormData({});
      setSubmitting(false);
      refreshData();
      navigate('/dash');
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire', error);
      console.log('Erreur Response:', error.response?.data);
      setError(`Erreur lors de la soumission du formulaire : ${error.response?.data?.message || error.message}`);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Modifier Avion</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label>ID Avion</label>
          <input type="number" name="idAvion" className="form-control" value={formData.idAvion || ''} onChange={handleInputChange} required readOnly />
        </div>
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
          {submitting ? 'Mise à jour en cours...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  );
};

export default AvionModif;
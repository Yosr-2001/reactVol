import React, { useState, useEffect } from 'react';
import { createOffre, getVols } from '../Api/Api';

const OffreAjout = ({ refreshData }) => {
  const [formData, setFormData] = useState({
    nomOffre: '',
    pourcentageReduction: '',
    idVol: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [vols, setVols] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVols = async () => {
      try {
        const response = await getVols();
        setVols(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des vols', error);
        setError('Erreur lors de la récupération des vols');
      }
    };

    fetchVols();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateFormData = (data) => {
    if (!data.nomOffre) return 'Le nom de l\'offre est requis.';
    if (!data.pourcentageReduction || isNaN(data.pourcentageReduction) || data.pourcentageReduction <= 0) {
      return 'Le pourcentage de réduction doit être un nombre valide supérieur à 0.';
    }
    if (!data.idVol || isNaN(data.idVol)) return 'Un vol valide doit être sélectionné.';
    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
  
    const validationError = validateFormData(formData);
    if (validationError) {
      setError(validationError);
      setSubmitting(false);
      return;
    }
  
    try {
      // Trouver le vol sélectionné à partir de la liste des vols
      const selectedVol = vols.find((vol) => vol.idVol === parseInt(formData.idVol, 10));
      if (!selectedVol) {
        throw new Error('Vol sélectionné introuvable.');
      }
  
      // Préparer les données pour l'API
      const normalizedFormData = {
        nomOffre: formData.nomOffre,
        pourcentageReduction: parseFloat(formData.pourcentageReduction), // Conversion en float
        idVol: parseInt(formData.idVol, 10), // ID du vol
        vol: selectedVol, // Objet complet du vol
      };
  
      console.log('Creating Offre:', normalizedFormData);
  
      const response = await createOffre(normalizedFormData);
      console.log('API Response:', response);
  
      setFormData({
        nomOffre: '',
        pourcentageReduction: '',
        idVol: '',
      });
      refreshData();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire', error);
      setError(`Erreur lors de la soumission : ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div>
      <h3>Ajouter Offre</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label>Nom de l'Offre</label>
          <input
            type="text"
            name="nomOffre"
            className="form-control"
            value={formData.nomOffre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Pourcentage de Réduction</label>
          <input
            type="number"
            step="0.01"
            name="pourcentageReduction"
            className="form-control"
            value={formData.pourcentageReduction}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Vol</label>
          <select
            name="idVol"
            className="form-control"
            value={formData.idVol}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez un vol</option>
            {vols.map((vol) => (
              <option key={vol.idVol} value={vol.idVol}>
                {vol.idVol}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Ajout en cours...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default OffreAjout;

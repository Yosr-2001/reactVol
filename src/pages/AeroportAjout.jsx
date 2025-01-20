import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = "http://127.0.0.1:8000/api";

const AeroportAjout = ({ refreshData }) => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nomAeroport || formData.nomAeroport.trim() === "") {
      newErrors.nomAeroport = "Airport name is required.";
    }
    if (!formData.villeAeroport || formData.villeAeroport.trim() === "") {
      newErrors.villeAeroport = "City is required.";
    }
    if (!formData.paysAeroport || formData.paysAeroport.trim() === "") {
      newErrors.paysAeroport = "Country is required.";
    }

    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newAeroport = {
      NomAeroport: formData.nomAeroport.trim(),

      VilleAeroport: formData.villeAeroport.trim(),
      PaysAeroport: formData.paysAeroport.trim(),
    };

    console.log("Sending payload:", newAeroport);

    try {
      const response = await axios.post(`${API_BASE_URL}/aeroports`, newAeroport);

      console.log("Server response:", response.data);
      if (response.status === 201) {
        console.log("aeroport added successfully:", response.data);
        setFormData({ NomAeroport: "", VilleAeroport: "", PaysAeroport: "" });
        setErrors({});
        alert("aeroport created successfully!");
        navigate("/Dashboard/#aeroport");
      } else {
        throw new Error(`Failed to create Avion. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };



  return (
    <div>
      <h3>Ajouter Aéroport</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
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
          {submitting ? 'Ajout en cours...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default AeroportAjout;

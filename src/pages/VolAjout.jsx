import React, { useState, useEffect } from "react";
import { createVol, getAeroports, getAvions } from "../Api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VolAjout = ({ refreshData }) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numeroVol: '',
    heureDepart: '',
    heureArrivee: '',
    statut: '',
    porte: '',
    typeAvion: '',
    idAeroportDepart: '',
    idAeroportArrivee: '',
    prix: '',
    nbreReservee: 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [aeroports, setAeroports] = useState([]);
  const [avions, setAvions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAeroports = async () => {
      try {
        const response = await getAeroports();
        setAeroports(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des aéroports", error);
        setError("Erreur lors de la récupération des aéroports");
      }
    };

    const fetchAvions = async () => {
      try {
        const response = await getAvions();
        setAvions(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des avions", error);
        setError("Erreur lors de la récupération des avions");
      }
    };

    fetchAeroports();
    fetchAvions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "nbreReservee") return;

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
      !data.prix
    ) {
      setError("Tous les champs sont requis.");
      return false;
    }

    if (new Date(data.heureArrivee) <= new Date(data.heureDepart)) {
      setError("L’heure d’arrivée doit être après l’heure de départ.");
      return false;
    }
    if (data.idAeroportDepart === data.idAeroportArrivee) {
      setError("Les aéroports de départ et d’arrivée doivent être différents.");
      return false;
    }

    if (isNaN(data.prix) || parseFloat(data.prix) <= 0) {
      setError("Le prix doit être un nombre positif.");
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (!validateFormData(formData)) {
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        NumeroVol: formData.numeroVol,
        HeureDepart: formData.heureDepart.replace("T", " "),
        HeureArrivee: formData.heureArrivee.replace("T", " "),
        Statut: formData.statut,
        Porte: formData.porte,
        TypeAvion: formData.typeAvion,
        IdAeroportDepart: formData.idAeroportDepart,
        IdAeroportArrivee: formData.idAeroportArrivee,
        IdAvion: formData.idAvion,
        NbreReservee: 0,
        prix: parseFloat(formData.prix),
      };

      console.log("Payload being sent:", payload);
      const response = await createVol(payload);
      console.log("API Response:", response.data);


      setFormData({
        numeroVol: "",
        heureDepart: "",
        heureArrivee: "",
        statut: "",
        porte: "",
        typeAvion: "",
        idAvion: "",
        idAeroportDepart: "",
        idAeroportArrivee: "",
        prix: "",
        nbreReservee: 0,
      });

      if (response.status === 201) {
        console.log("Flight added successfully:", response.data);

        alert("Avion created successfully!");
        navigate("/Dashboard/#flights");

        setFormData({
          numeroVol: "", heureDepart: "", heureArrivee: "",
          'statut': "", porte: "", typeAvion: "", idAvion: "", idAeroportDepart: "",
          'idAeroportArrivee': "", prix: "", nbreReservee: ""
        });

      }
    } catch (error) {
      console.error("Server error:", error);
      if (error.response) {
        console.error("API response error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("Le serveur ne répond pas.");
      } else {
        console.error("Error setting up request:", error.message);
        setError("Erreur de configuration de la requête.");
      }
    }
    finally {
      setSubmitting(false);
    }
  };


  return (
    <div>
      <h3>Ajouter Vol</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label>Numéro de Vol</label>
          <input
            type="text"
            name="numeroVol"
            className="form-control"
            value={formData.numeroVol}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Heure de Départ</label>
          <input
            type="datetime-local"
            name="heureDepart"
            className="form-control"
            value={formData.heureDepart}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Heure d'Arrivée</label>
          <input
            type="datetime-local"
            name="heureArrivee"
            className="form-control"
            value={formData.heureArrivee}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Statut</label>
          <input
            type="text"
            name="statut"
            className="form-control"
            value={formData.statut}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Porte</label>
          <input
            type="text"
            name="porte"
            className="form-control"
            value={formData.porte}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Type d'Avion</label>
          <input
            type="text"
            name="typeAvion"
            className="form-control"
            value={formData.typeAvion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Avion</label>
          <select
            name="idAvion"
            className="form-control"
            value={formData.idAvion}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez un avion</option>
            {avions.map((avion) => (
              <option key={avion.id} value={avion.id}>
                {avion.type_avion} ({avion.id})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Aéroport Départ</label>
          <select
            name="idAeroportDepart"
            className="form-control"
            value={formData.idAeroportDepart}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez un aéroport</option>
            {aeroports.map((aeroport) => (
              <option key={aeroport.id} value={aeroport.id}>
                {aeroport.nom_aeroport}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Aéroport Arrivée</label>
          <select
            name="idAeroportArrivee"
            className="form-control"
            value={formData.idAeroportArrivee}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez un aéroport</option>
            {aeroports.map((aeroport) => (
              <option key={aeroport.id} value={aeroport.id}>
                {aeroport.nom_aeroport}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Nombre Réservé</label>
          <input
            type="number"
            name="nbreReservee"
            className="form-control"
            value={formData.nbreReservee}
            disabled
          />
        </div>
        <div className="mb-3">
          <label>Prix du Vol</label>
          <input
            type="number"
            step="0.01"
            name="prix"
            className="form-control"
            value={formData.prix}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
};


export default VolAjout;

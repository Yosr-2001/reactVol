import React, { useState, useEffect } from 'react';
import { getVols, deleteVol } from '../Api/Api';
import VolAjout from './VolAjout';
import VolModif from './VolModif';

const VolPage = () => {
  const [vols, setVols] = useState([]);
  const [currentVol, setCurrentVol] = useState(null); // Vol en cours de modification
  const [view, setView] = useState('list'); // list, add, edit
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVols();
  }, []);

  const fetchVols = async () => {
    try {
      const response = await getVols();
      setVols(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des vols');
      console.error('Erreur lors de la récupération des vols', error);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      const response = await deleteVol(id);
      console.log('API Response:', response.data);
      fetchVols();
    } catch (error) {
      setError('Erreur lors de la suppression');
      console.error('Erreur lors de la suppression', error);
    }
  };

  const handleEdit = (vol) => {
    setCurrentVol(vol);
    setView('edit');
  };

  const handleAdd = () => {
    setCurrentVol(null);
    setView('add');
  };

  return (
    <div>
      {view === 'list' && (
        <>
          <h3>Liste des Vols</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="btn btn-primary" onClick={handleAdd}>Ajouter un Vol</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Numéro</th>
                <th>Heure de Départ</th>
                <th>Heure d'Arrivée</th>
                <th>Statut</th>
                <th>Porte</th>
                <th>Type Avion</th>
                <th>Avion</th>
                <th>Aéroport Départ</th>
                <th>Aéroport Arrivée</th>
                <th>Prix</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vols.map((vol) => (
                <tr key={vol.idVol}>
                  <td>{vol.idVol}</td>
                  <td>{vol.numeroVol}</td>
                  <td>{vol.heureDepart}</td>
                  <td>{vol.heureArrivee}</td>
                  <td>{vol.statut}</td>
                  <td>{vol.porte}</td>
                  <td>{vol.typeAvion}</td>
                  <td>{vol.idAvion}</td>
                  <td>{vol.idAeroportDepart}</td>
                  <td>{vol.idAeroportArrivee}</td>
                  <td>{vol.prixVol}</td>
                  <td>
                    <button onClick={() => handleEdit(vol)} className="btn btn-warning btn-sm">Modifier</button>
                    <button onClick={() => handleDelete(vol.idVol)} className="btn btn-danger btn-sm ms-2">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {view === 'add' && (
        <VolAjout refreshData={fetchVols} />
      )}
      {view === 'edit' && (
        <VolModif formData={currentVol} setFormData={setCurrentVol} refreshData={fetchVols} />
      )}
    </div>
  );
};

export default VolPage;

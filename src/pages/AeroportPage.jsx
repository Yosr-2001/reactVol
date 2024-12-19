import React, { useState, useEffect } from 'react';
import { getAeroports, deleteAeroport } from '../Api/Api';
import AeroportAjout from './AeroportAjout';
import AeroportModif from './AeroportModif';

const AeroportPage = () => {
  const [aeroports, setAeroports] = useState([]);
  const [currentAeroport, setCurrentAeroport] = useState(null); // Aéroport en cours de modification
  const [view, setView] = useState('list'); // list, add, edit
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAeroports();
  }, []);

  const fetchAeroports = async () => {
    try {
      const response = await getAeroports();
      setAeroports(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des aéroports');
      console.error('Erreur lors de la récupération des aéroports', error);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      const response = await deleteAeroport(id);
      console.log('API Response:', response.data);
      fetchAeroports();
    } catch (error) {
      setError('Erreur lors de la suppression');
      console.error('Erreur lors de la suppression', error);
    }
  };

  const handleEdit = (aeroport) => {
    setCurrentAeroport(aeroport);
    setView('edit');
  };

  const handleAdd = () => {
    setCurrentAeroport(null);
    setView('add');
  };

  return (
    <div>
      {view === 'list' && (
        <>
          <h3>Liste des Aéroports</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="btn btn-primary" onClick={handleAdd}>Ajouter un Aéroport</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Ville</th>
                <th>Pays</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {aeroports.map((aeroport) => (
                <tr key={aeroport.idAeroport}>
                  <td>{aeroport.idAeroport}</td>
                  <td>{aeroport.nomAeroport}</td>
                  <td>{aeroport.villeAeroport}</td>
                  <td>{aeroport.paysAeroport}</td>
                  <td>
                    <button onClick={() => handleEdit(aeroport)} className="btn btn-warning btn-sm">Modifier</button>
                    <button onClick={() => handleDelete(aeroport.idAeroport)} className="btn btn-danger btn-sm ms-2">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {view === 'add' && (
        <AeroportAjout refreshData={fetchAeroports} />
      )}
      {view === 'edit' && (
        <AeroportModif formData={currentAeroport} setFormData={setCurrentAeroport} refreshData={fetchAeroports} />
      )}
    </div>
  );
};

export default AeroportPage;

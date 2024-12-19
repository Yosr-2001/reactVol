import React, { useState, useEffect } from 'react';
import { getAvions, deleteAvion } from '../Api/Api';
import AvionAjout from './AvionAjout';
import AvionModif from './AvionModif';

const AvionPage = () => {
  const [avions, setAvions] = useState([]);
  const [currentAvion, setCurrentAvion] = useState(null);
  const [view, setView] = useState('list');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAvions();
  }, []);

  const fetchAvions = async () => {
    try {
      const response = await getAvions();
      setAvions(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des avions');
      console.error('Erreur lors de la récupération des avions', error);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      const response = await deleteAvion(id);
      console.log('API Response:', response.data);
      fetchAvions();
    } catch (error) {
      setError('Erreur lors de la suppression');
      console.error('Erreur lors de la suppression', error);
    }
  };

  const handleEdit = (avion) => {
    setCurrentAvion(avion);
    setView('edit');
  };

  const handleAdd = () => {
    setCurrentAvion(null);
    setView('add');
  };

  return (
    <div>
      {view === 'list' && (
        <>
          <h3>Liste des Avions</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="btn btn-primary" onClick={handleAdd}>Ajouter un Avion</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Capacité</th>
                <th>Fabriquant</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {avions.map((avion) => (
                <tr key={avion.idAvion}>
                  <td>{avion.idAvion}</td>
                  <td>{avion.typeAvion}</td>
                  <td>{avion.capaciteAvion}</td>
                  <td>{avion.fabriquantAvion}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(avion)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(avion.idAvion)}
                      className="btn btn-danger btn-sm"
                    >
                      🗑️ Supprimer
                    </button>
                  </td>



                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {view === 'add' && (
        <AvionAjout refreshData={fetchAvions} />
      )}
      {view === 'edit' && (
        <AvionModif formData={currentAvion} setFormData={setCurrentAvion} refreshData={fetchAvions} />
      )}
    </div>
  );
};

export default AvionPage;

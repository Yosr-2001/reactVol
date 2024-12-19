import React, { useState, useEffect } from 'react';
import { getOffres, deleteOffre } from '../Api/Api';
import OffreAjout from './OffreAjout';
//import OffreModif from './OffreModif';

const OffrePage = () => {
  const [offres, setOffres] = useState([]);
  const [currentOffre, setCurrentOffre] = useState(null); // Offre en cours de modification
  const [view, setView] = useState('list'); // list, add, edit
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = async () => {
    try {
      const response = await getOffres();
      setOffres(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des offres');
      console.error('Erreur lors de la récupération des offres', error);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      const response = await deleteOffre(id);
      console.log('API Response:', response.data);
      fetchOffres();
    } catch (error) {
      setError('Erreur lors de la suppression');
      console.error('Erreur lors de la suppression', error);
    }
  };

  const handleEdit = (offre) => {
    setCurrentOffre(offre);
    setView('edit');
  };

  const handleAdd = () => {
    setCurrentOffre(null);
    setView('add');
  };

  return (
    <div>
      {view === 'list' && (
        <>
          <h3>Liste des Offres</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="btn btn-primary" onClick={handleAdd}>Ajouter une Offre</button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom de l'Offre</th>
                <th>Pourcentage de Réduction</th>
                <th>Vol</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {offres.map((offre) => (
                <tr key={offre.idOffre}>
                  <td>{offre.idOffre}</td>
                  <td>{offre.nomOffre}</td>
                  <td>{offre.pourcentageReduction}</td>
                  <td>{offre.idVol}</td>
                  {/* <td> */}
                    {/* <button onClick={() => handleEdit(offre)} className="btn btn-warning btn-sm">Modifier</button> */}
                    {/* <button onClick={() => handleDelete(offre.idOffre)} className="btn btn-danger btn-sm ms-2">Supprimer</button> */}
                  {/* </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {view === 'add' && (
        <OffreAjout refreshData={fetchOffres} />
      )}
      {view === 'edit' && (
        <OffreModif formData={currentOffre} setFormData={setCurrentOffre} refreshData={fetchOffres} />
      )}
    </div>
  );
};

export default OffrePage;

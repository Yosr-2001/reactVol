// src/pages/PassagerPage.js
import React from 'react';

const PassagerPage = ({ data }) => {
  return (
    <div>
      <h3>Liste des Passagers</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Date de naissance</th>
            <th>Téléphone</th>
            <th>Numéro Passeport</th>
          </tr>
        </thead>
        <tbody>
          {data.map((passager) => (
            <tr key={passager.idPassager}>
              <td>{passager.idPassager}</td>
              <td>{passager.nomPassager}</td>
              <td>{passager.prenomPassager}</td>
              <td>{passager.emailPassager}</td>
              <td>{passager.dateNaissance}</td>
              <td>{passager.telephonePassager}</td>
              <td>{passager.numeroPasseport}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PassagerPage;

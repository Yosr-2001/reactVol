import React, { useEffect, useState } from 'react';
import { getVols, getOffres } from '../../Api/Api';
import Navbar from '../Navbar/Navbar';

const OfferList = () => {
  const [vols, setVols] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const volsResponse = await getVols();
        const offersResponse = await getOffres();
        setVols(volsResponse.data);
        setOffers(offersResponse.data);
      } catch (error) {
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  const volDict = vols.reduce((acc, vol) => {
    acc[vol.idVol] = vol;
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className="offers-section">
        <h2>Special Offers</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nom de l'Offre</th>
              <th>Numéro du Vol</th>
              <th>Prix de Base</th>
              <th>Prix après Réduction</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => {
              const vol = volDict[offer.idVol];
              return vol ? (
                <tr key={offer.idOffre}>
                  <td>{offer.nomOffre}</td>
                  <td>{vol.numeroVol}</td>
                  <td>{vol.prixVol} DT</td>
                  <td>{(vol.prixVol * (1 - offer.pourcentageReduction))} DT</td>
                </tr>
              ) : null;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OfferList;
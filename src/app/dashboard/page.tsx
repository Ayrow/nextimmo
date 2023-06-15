'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { IListingDocument } from '../../../types/listingTypes';

const Dashboard = () => {
  const [allFetchedListings, setAllFetchedListings] = useState([]);
  const [totalListings, setTotalListings] = useState(0);

  const getAllListings = async () => {
    const etat = 'tous les états';
    try {
      const res = await fetch(`/api/allListings?etat=${etat}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { allListings, totalListingsFound } = await res.json();

      if (allListings) {
        setAllFetchedListings(allListings);
        setTotalListings(totalListingsFound);
      } else {
        //display alert error fetching listings
      }
    } catch (error) {
      alert(error);
      // add Modal or alert for error
    }
  };

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <div className='flex justify-center m-5'>
      <div className=''>
        <h4>Nombre d'annonces publiées:</h4>
        {totalListings ?? 0}
      </div>
    </div>
  );
};

export default Dashboard;

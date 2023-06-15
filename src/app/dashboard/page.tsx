'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { IListingDocument } from '../../../types/listingTypes';
import Link from 'next/link';

const Dashboard = () => {
  const [allFetchedListings, setAllFetchedListings] = useState([]);
  const [totalListings, setTotalListings] = useState(0);

  const getAllListings = async () => {
    const etat = 'tous les états';
    const statut = ['bientôt', 'disponible', 'offre en Cours', 'vendu', 'loué'];
    const typeDeBien = [
      'maison',
      'appartement',
      'terrain',
      'immeuble',
      'parking',
      'garage',
      'bureau',
    ];

    try {
      const res = await fetch(
        `/api/allListings?statut=${statut}&etat=${etat}&typeDeBien=${typeDeBien}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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

  const nbListings = ({ toFilter, basedOn }) => {
    const filtered = allFetchedListings.filter(
      (listing: IListingDocument) => listing[toFilter] === basedOn
    );
    return filtered;
  };

  let listingWithMost: IListingDocument;

  const toCheckForMost = [
    { name: 'nbViews', label: 'vues' },
    { name: 'nbAjoutFavoris', label: 'favoris' },
    { name: 'nbContact', label: 'contact' },
  ];

  const filteredListingWithMost = (valueToCheck: string) => {
    const sortedArray: IListingDocument[] = allFetchedListings.sort(
      (a, b) => a[valueToCheck] - b[valueToCheck]
    );
    listingWithMost = sortedArray[sortedArray.length - 1];
  };

  const slug = `annonce-${listingWithMost?.transaction}-${listingWithMost?.typeDeBien}-${listingWithMost?.lieu.ville}`;

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <div className='m-5'>
      <h2 className='text-xl text-center my-10'>Statistiques</h2>
      <div className='flex gap-5 flex-wrap justify-center'>
        <div className='p-4 flex flex-col gap-2 border rounded-xl'>
          <p className='text-lg font-bold'>
            Nombre total d'annonces: {totalListings ?? 0}
          </p>
          <p>
            Nombre d'annonces publiées:{' '}
            {nbListings({ toFilter: 'etat', basedOn: 'publiée' }).length}
          </p>
          <p>
            Nombre d'annonces en brouillon:{' '}
            {nbListings({ toFilter: 'etat', basedOn: 'brouillon' }).length}
          </p>
        </div>
        <div className='p-4 flex flex-col gap-2 border rounded-xl'>
          {toCheckForMost.map((value) => {
            filteredListingWithMost(value.name);
            return (
              <p className=''>
                Annonce avec le plus de {value.label} :{' '}
                <Link
                  className='italic'
                  href={`/annonces/${slug}/${listingWithMost?.ref}`}>
                  {listingWithMost?.ref || ''}
                </Link>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

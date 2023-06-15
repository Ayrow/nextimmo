'use client';

import { useEffect, useState } from 'react';
import { ModalCategories, useAppContext } from '../context/app/appContext';
import { IListingDocument } from '../../types/listingTypes';
import GridCard from './listings/GridCard';

const FilteredFewListings = ({
  sort,
  limit,
}: {
  sort: string;
  limit: number;
}) => {
  const [allListings, setAllListings] = useState<IListingDocument[]>(null);
  const { actions } = useAppContext();

  const getAllListings = async (): Promise<void> => {
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
        `/api/allListings?typeDeBien=${typeDeBien}&sort=${sort}&page=1&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { allListings } = await res.json();
      if (allListings) {
        setAllListings(allListings);
      } else {
        actions.displayModal({
          modalTitle: 'Erreur',
          modalCategory: ModalCategories.Error,
          modalMsg:
            'Erreur dans la récupération des annonces, veuillez réessayer ultérieurement.',
        });
      }
    } catch (error) {
      actions.displayModal({
        modalTitle: 'Erreur',
        modalCategory: ModalCategories.Error,
        modalMsg:
          'Erreur dans la récupération des annonces, veuillez réessayer ultérieurement.',
      });
    }
  };

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <div
      className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-10 gap-5'}>
      {allListings?.map((listing) => {
        return <GridCard key={listing.ref} listing={listing} />;
      })}
    </div>
  );
};

export default FilteredFewListings;

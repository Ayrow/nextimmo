'use client';

import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/user/authContext';
import { IListingDocument } from '../../../../types/listingTypes';
import Link from 'next/link';

const SavedListings = () => {
  const { user } = useAuthContext();
  const [savedListings, setSavedListings] = useState<IListingDocument[]>([]);

  const getAllSavedListings = async () => {
    try {
      const res = await fetch(`/api/user/savedListings?userId=${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data) {
        setSavedListings(data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAllSavedListings();
  }, []);

  if (user && user.role === 'user') {
    return (
      <div className='h-screen bg-sky-950'>
        {savedListings.length === 0 && (
          <div className='h-full flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-5 border rounded-xl p-10 shadow-black shadow-lg'>
              <h3 className='text-2xl'>
                Vous n'avez pas encore d'annonces en favoris
              </h3>
              <p>Ajoutez-en pour les voir apparaître ici!</p>
              <Link
                className='text-xl border rounded-lg px-2 py-1'
                href={'/annonces'}>
                Voir les annonces
              </Link>
            </div>
          </div>
        )}

        {savedListings?.map((listing) => {
          return <p>{listing.ref}</p>;
        })}
      </div>
    );
  }
};

export default SavedListings;

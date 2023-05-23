'use client';

import { useEffect, useState } from 'react';
import { useListingsContext } from '../../../context/listings/listingsContext';
import ListCard from '../../../components/listings/ListCard';
import { useAppContext } from '../../../context/app/appContext';
import ConfirmDeletionModal from '../../../components/modals/ConfirmDeletionModal';

const ManageListings = () => {
  const { getAllListings, allListings, deleteListing } = useListingsContext();
  const { state } = useAppContext();

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <div className='p-10 bg-gray-900 w-full relative'>
      {state.showModal && <ConfirmDeletionModal deleteItem={deleteListing} />}
      // Filter and sort section here
      <h2 className='text-center text-xl font-bold'>Manage Listings</h2>
      <div className='flex flex-col gap-5 mt-10'>
        {allListings &&
          allListings?.map((listing) => {
            const { ref } = listing;
            return <ListCard key={ref} listing={listing} />;
          })}
      </div>
    </div>
  );
};

export default ManageListings;

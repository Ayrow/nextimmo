'use client';

import { useEffect, useState } from 'react';
import { useListingsContext } from '../../../context/listings/listingsContext';
import ListCard from '../../../components/listings/ListCard';

const ManageListings = () => {
  const { getAllListings, allListings } = useListingsContext();

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <div className='p-10 bg-gray-900'>
      // Filter and sort section here
      <h2 className='text-center text-xl font-bold'>Manage Listings</h2>
      <div className='flex flex-col gap-5 mt-10'>
        {allListings?.map((listing) => {
          const { ref } = listing;
          return <ListCard key={ref} listing={listing} />;
        })}
      </div>
    </div>
  );
};

export default ManageListings;

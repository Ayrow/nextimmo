'use client';

import { useEffect, useState } from 'react';
import { useListingsContext } from '../../../context/listings/listingsContext';
import GridCard from '../../../components/listings/GridCard';
import ListCard from '../../../components/listings/ListCard';

const ManageListings = () => {
  const { getAllListings, allListings } = useListingsContext();
  const [isDisplayGrid, setIsDisplayGrid] = useState(true);

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <div className='p-10'>
      <h2 className='text-center text-xl font-bold'>Manage Listings</h2>
      <div>
        {allListings?.map((listing) => {
          const { ref } = listing;
          return isDisplayGrid ? (
            <GridCard key={ref} listing={listing} />
          ) : (
            <ListCard key={ref} listing={listing} />
          );
        })}
      </div>
    </div>
  );
};

export default ManageListings;

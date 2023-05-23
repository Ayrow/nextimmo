'use client';

import GridCard from '../../components/listings/GridCard';
import ListCard from '../../components/listings/ListCard';
import { useEffect, useState } from 'react';
import { useListingsContext } from '../../context/listings/listingsContext';

const Listings = () => {
  const { allListings, getAllListings } = useListingsContext();
  const [isgridList, setIsGridList] = useState<boolean>(true);

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <section className='bg-gray-900 py-5'>
      // Filter and sort section here
      <h2 className='text-center text-xl font-bold p-5'>Listings</h2>
      <div
        className={
          isgridList
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-10 gap-5'
            : 'flex flex-wrap flex-col m-10 gap-5'
        }>
        {allListings?.map((listing) => {
          return isgridList ? (
            <GridCard key={listing.ref} listing={listing} />
          ) : (
            <ListCard key={listing.ref} listing={listing} />
          );
        })}
      </div>
    </section>
  );
};

export default Listings;

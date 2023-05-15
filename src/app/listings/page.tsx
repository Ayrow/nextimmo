'use client';

import GridCard from '../../components/listings/GridCard';
import ListCard from '../../components/listings/ListCard';
import { useEffect, useState } from 'react';
import { useListingsContext } from '../../context/listings/listingsContext';

const Listings = () => {
  const { allListings, getAllListings } = useListingsContext();
  const [gridList, setGridList] = useState<boolean>(true);

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <section>
      <h2 className='text-center text-xl font-bold mt-5'>Listings</h2>
      {allListings.map((listing) => {
        return (
          <div>
            {gridList ? (
              <GridCard listing={listing} />
            ) : (
              <ListCard listing={listing} />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default Listings;

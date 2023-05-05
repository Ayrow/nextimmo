'use client';

import GridCard from '../../components/listings/GridCard';
import ListCard from '../../components/listings/ListCard';
import { useState } from 'react';

const Listings = () => {
  const [gridList, setGridList] = useState<boolean>(true);

  const exampleListings = [
    {
      title: 'Big house',
      surface: 300,
    },
  ];

  return (
    <section>
      <h2 className='text-center text-xl font-bold mt-5'>Listings</h2>
      {exampleListings.map((listing) => {
        return <div>{gridList ? <GridCard /> : <ListCard />}</div>;
      })}
    </section>
  );
};

export default Listings;

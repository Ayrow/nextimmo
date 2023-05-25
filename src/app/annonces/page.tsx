'use client';

import GridCard from '../../components/listings/GridCard';
import ListCard from '../../components/listings/ListCard';
import { useEffect, useState } from 'react';
import { useListingsContext } from '../../context/listings/listingsContext';

const queryParams = {
  transaction: '',
  statut: 'disponible',
  quartier: '',
  ville: '',
  codePostal: undefined,
  typeDeBien: '',
  minPrice: '',
  maxPrice: '',
  minSurfaceInt: undefined,
  maxSurfaceInt: undefined,
  nbPieces: undefined,
  nbChambres: undefined,
  nbSDB: undefined,
  typeChauffage: '',
  equipements: [],
  exposition: '',
  page: 1,
  numOfPages: 1,
  sort: 'latest',
  // sortOptions: ['latest', 'oldest', 'a-z'],
  limit: 12,
};

const Listings = () => {
  // const { allListings, getAllListings } = useListingsContext();
  const [allListings, setAllListings] = useState(null);
  const [valuesQueries, setValuesQueries] = useState(queryParams);

  const getAllListings = async (signal: AbortSignal) => {
    const {
      transaction,
      statut,
      quartier,
      ville,
      codePostal,
      typeDeBien,
      minPrice,
      maxPrice,
    } = valuesQueries;
    const searchParams = new URLSearchParams();
    Object.entries(valuesQueries).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, value);
      }
    });
    const queryParams = searchParams.toString();

    try {
      const res = await fetch(`/api/allListings?${queryParams}`, {
        method: 'GET',
        signal: signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data) {
        setAllListings(data);
      } else {
        //display alert error fetching listings
      }
    } catch (error) {
      alert(error);
      // add Modal or alert for error
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getAllListings(signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section className='bg-gray-900 py-5'>
      // Filter and sort section here
      <h2 className='text-center text-xl font-bold p-5'>Listings</h2>
      <div
        className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-10 gap-5'}>
        {allListings?.map((listing) => {
          return <GridCard key={listing.ref} listing={listing} />;
        })}
      </div>
    </section>
  );
};

export default Listings;

'use client';

import GridCard from '../../components/listings/GridCard';
import PageBtnContainer from '../../components/buttons/PageBtnContainer';
import { useEffect, useState } from 'react';
import { useListingsContext } from '../../context/listings/listingsContext';
import FiltersListingPage from '../../components/filters/FiltersListingPage';

const queryParams = {
  transaction: 'vente',
  statut: 'disponible',
  quartier: '',
  ville: '',
  codePostal: undefined,
  typeDeBien: '',
  minPrice: undefined,
  maxPrice: undefined,
  minSurfaceInt: undefined,
  maxSurfaceInt: undefined,
  minSurfaceExt: undefined,
  nbPieces: undefined,
  nbChambres: undefined,
  nbSDB: undefined,
  typeChauffage: '',
  equipements: undefined,
  exposition: '',
  sort: 'latest',
  // sortOptions: ['latest', 'oldest'],
  limit: 12,
};

const Listings = () => {
  // const { allListings, getAllListings } = useListingsContext();
  const [allListings, setAllListings] = useState(null);
  const [valuesQueries, setValuesQueries] = useState(queryParams);
  const [totalNumberListings, setTotalNumberListings] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllListings = async (signal: AbortSignal) => {
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
      const { allListings, totalListingsFound, numOfPages } = await res.json();
      if (allListings) {
        setAllListings(allListings);
        setTotalNumberListings(totalListingsFound);
        setTotalPages(numOfPages);
      } else {
        //display alert error fetching listings
      }
    } catch (error) {
      alert(error);
      // add Modal or alert for error
    }
    console.log('totalPages', totalPages);
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
      <FiltersListingPage
        valuesQueries={valuesQueries}
        setValuesQueries={setValuesQueries}
      />
      <div className=''>
        <p className='font-bold text-center'>{totalNumberListings} annonces</p>
      </div>
      <h2 className='text-center text-xl font-bold p-5'>Annonces</h2>
      <div
        className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-10 gap-5'}>
        {allListings?.map((listing) => {
          return <GridCard key={listing.ref} listing={listing} />;
        })}
      </div>
      {totalPages > 0 && (
        <PageBtnContainer
          numOfPages={totalPages}
          page={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
};

export default Listings;

'use client';

import GridCard from '../../components/listings/GridCard';
import PageBtnContainer from '../../components/buttons/PageBtnContainer';
import { useEffect, useState } from 'react';

import FiltersListingPage from '../../components/filters/FiltersListingPage';
import { IListing } from '../../../types/listingTypes';

type QueryParamsType = {
  transaction: string;
  statut: string;
  quartier: string;
  ville: string;
  codePostal: string;
  typeDeBien: string[];
  minPrice: string;
  maxPrice: string;
  minSurfaceInt: string;
  maxSurfaceInt: string;
  minSurfaceExt: string;
  nbPieces: string;
  nbChambres: string;
  nbSDB: string;
  typeChauffage: string;
  equipements: string[];
  exposition: string;
  sort: string;
  // sortOptions: ['latest', 'oldest'],
  limit: number;
};

const queryParams: QueryParamsType = {
  transaction: 'vente',
  statut: 'disponible',
  quartier: '',
  ville: '',
  codePostal: '',
  typeDeBien: ['maison'],
  minPrice: '',
  maxPrice: '',
  minSurfaceInt: '',
  maxSurfaceInt: '',
  minSurfaceExt: '',
  nbPieces: '',
  nbChambres: '',
  nbSDB: '',
  typeChauffage: '',
  equipements: [],
  exposition: '',
  sort: 'latest',
  // sortOptions: ['latest', 'oldest'],
  limit: 12,
};

const Listings = () => {
  // const { allListings, getAllListings } = useListingsContext();
  const [allListings, setAllListings] = useState<IListing[]>(null);
  const [valuesQueries, setValuesQueries] = useState(queryParams);
  const [totalNumberListings, setTotalNumberListings] = useState<number>(null);
  const [totalPages, setTotalPages] = useState<number>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getAllListings = async (signal: AbortSignal): Promise<void> => {
    const searchParams = new URLSearchParams();
    Object.entries(valuesQueries).forEach(([key, value]) => {
      if (value) {
        searchParams.append(key, String(value));
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
      if (error !== 'AbortError') {
        console.log('error', error);
        // add Modal or alert for error
      }
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchListings = async (): Promise<void> => {
      await getAllListings(signal);
    };

    const debounceFetchListings = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchListings, 300); // Adjust the delay as needed
    };

    debounceFetchListings();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [valuesQueries]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const regexMixCharNumb = /^(?=.*[a-zA-Z])(?=.*\d).*$/;
    const regexOnlyChar = /[a-zA-Z]/;
    const regexOnlyNumber = /^\d+$/;

    if (
      (name === 'typeDeBien' && value !== '') ||
      (name == 'equipements' && value !== '')
    ) {
      let newArray: string[] = valuesQueries[name];
      if (valuesQueries[name].includes(value)) {
        newArray = newArray.filter((item) => item !== value);
      } else {
        newArray.push(value);
      }
      setValuesQueries((prevValuesQueries) => ({
        ...prevValuesQueries,
        [name]: newArray,
      }));
    } else {
      setValuesQueries((prevValuesQueries) => ({
        ...prevValuesQueries,
        [name]: value,
      }));
    }
  };

  return (
    <section className='bg-gray-900 py-5'>
      <FiltersListingPage
        valuesQueries={valuesQueries}
        handleInputChange={handleInputChange}
      />
      <div className=''>
        <p className='font-bold text-center'>
          {totalNumberListings}{' '}
          {totalNumberListings > 1 ? 'annonces trouvées' : 'annonce trouvé'}
        </p>
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

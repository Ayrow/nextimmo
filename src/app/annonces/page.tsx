'use client';

import GridCard from '../../components/listings/GridCard';
import PageBtnContainer from '../../components/buttons/PageBtnContainer';
import { useEffect, useState } from 'react';

import FiltersListingPage from '../../components/filters/FiltersListingPage';
import { IListing, QueryParamsType } from '../../../types/listingTypes';
import { useRouter, useSearchParams } from 'next/navigation';
import { queryParams } from '../../../utils/listingDetails';

const sortOptions = [
  'plus récente',
  'plus ancienne',
  'prix croissant',
  'prix décroissant',
];

const Listings = () => {
  const params = Object.fromEntries(useSearchParams());
  // const { allListings, getAllListings } = useListingsContext();
  const [allListings, setAllListings] = useState<IListing[]>(null);
  let paramsObject: QueryParamsType = queryParams;
  if (params) {
    const searchParams = useSearchParams();
    paramsObject = Array.from(searchParams.entries()).reduce(
      (obj, [key, value]) => {
        if (obj[key]) {
          if (Array.isArray(obj[key])) {
            obj[key].push(value);
          } else {
            obj[key] = [obj[key], value];
          }
        } else {
          obj[key] = value;
        }
        return obj;
      },
      {} as QueryParamsType
    );
    console.log('paramsObject', paramsObject);
  }

  const [valuesQueries, setValuesQueries] = useState(
    Object.keys(params).length === 0 ? queryParams : paramsObject
  );
  const [totalNumberListings, setTotalNumberListings] = useState<number>(null);
  const [totalPages, setTotalPages] = useState<number>(null);
  // const [currentPage, setCurrentPage] = useState(1);
  const [isSortingDropdownOpen, setIsSortingDropdownOpen] = useState(false);

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
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('valuesQueries', valuesQueries);
    let timeoutId: NodeJS.Timeout;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchListings = async (): Promise<void> => {
      await getAllListings(signal);
    };

    const debounceFetchListings = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchListings, 200); // Adjust the delay as needed
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
    console.log('name', name);
    console.log('value', value);
    console.log('valuesQueries[name]', valuesQueries[name]);
    console.log('valuesQueries', valuesQueries);
    if (
      (name === 'typeDeBien' && value !== '') ||
      (name == 'equipementsInt' && value !== '') ||
      (name == 'equipementsExt' && value !== '') ||
      (name === 'nbPieces' && value !== '') ||
      (name === 'nbSDB' && value !== '') ||
      (name === 'nbChambres' && value !== '') ||
      (name === 'exposition' && value !== '') ||
      (name === 'typeChauffage' && value !== '')
    ) {
      const newValue = value.replace(/\s/g, '').replace('é', 'e');

      let newArray: string[];
      if (valuesQueries[name] === '') {
        newArray = [];
      } else if (
        typeof valuesQueries[name] === 'string' &&
        valuesQueries[name] !== ''
      ) {
        newArray.push(valuesQueries[name]);
      } else {
        newArray = valuesQueries[name];
      }

      if (valuesQueries[name]?.includes(newValue)) {
        newArray = newArray.filter((item) => item !== newValue);
      } else {
        if (valuesQueries[name]) {
          newArray.push(newValue);
        }
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
        sortOptions={sortOptions}
        isSortingDropdownOpen={isSortingDropdownOpen}
        setIsSortingDropdownOpen={setIsSortingDropdownOpen}
        valuesQueries={valuesQueries}
        handleInputChange={handleInputChange}
      />
      <div className='flex gap-10 items-center'>
        <p className='font-bold ml-10'>
          {totalNumberListings}{' '}
          {totalNumberListings > 1 ? 'annonces trouvées' : 'annonce trouvée'}
        </p>
        <div className='hidden relative md:grid'>
          <button
            className='border capitalize rounded-xl px-2 py-1 w-40 flex gap-5 justify-around'
            onClick={() => setIsSortingDropdownOpen(!isSortingDropdownOpen)}>
            {valuesQueries.sort} {isSortingDropdownOpen ? '⇑' : '⇓'}
          </button>
          {isSortingDropdownOpen && (
            <div className='absolute border rounded-md left-0 mt-10 z-50 bg-sky-950 flex flex-col items-start pl-2 gap-2 w-full'>
              {sortOptions.map((sort) => {
                return (
                  <button
                    className='capitalize'
                    name='sort'
                    value={sort}
                    onClick={handleInputChange}>
                    {sort}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div
        className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-10 gap-5'}>
        {allListings?.map((listing) => {
          return <GridCard key={listing.ref} listing={listing} />;
        })}
      </div>
      {totalPages > 0 && (
        <PageBtnContainer
          numOfPages={totalPages}
          page={valuesQueries.page}
          handleInputChange={handleInputChange}
          // setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
};

export default Listings;

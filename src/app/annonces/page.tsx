'use client';

import GridCard from '../../components/listings/GridCard';
import PageBtnContainer from '../../components/buttons/PageBtnContainer';
import { useEffect, useRef, useState } from 'react';

import FiltersListingPage from '../../components/filters/FiltersListingPage';
import { IListing, ListingQueryParamsType } from '../../../types/listingTypes';
import { useSearchParams } from 'next/navigation';
import { queryParams, sortOptions } from '../../../utils/listingDetails';
import {
  EventTargetType,
  HandleInputChangeType,
} from '../../../types/functionTypes';
import { useCloseOnOutsideClick } from '../../hooks/useCloseOnOutsideClick';
import DropdownButtons from '../../components/buttons/DropdownButtons';

const Listings = () => {
  const ref = useRef<HTMLDivElement>(null);
  const params = Object.fromEntries(useSearchParams());
  const [allListings, setAllListings] = useState<IListing[]>(null);
  let paramsObject: ListingQueryParamsType = queryParams;
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
      {} as ListingQueryParamsType
    );
  }

  const [valuesQueries, setValuesQueries] = useState(
    Object.keys(params).length === 0 ? queryParams : paramsObject
  );
  const [totalNumberListings, setTotalNumberListings] = useState<number>(null);
  const [totalPages, setTotalPages] = useState<number>(null);

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

  const closeDropdown = () => {
    setIsSortingDropdownOpen(false);
  };

  useCloseOnOutsideClick(closeDropdown, ref);

  useEffect(() => {
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

  const handleInputChange: HandleInputChangeType = (event) => {
    const { name, value } = event.target as EventTargetType;

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
        newArray.push(valuesQueries[name] as string);
      } else {
        newArray = valuesQueries[name] as string[];
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
      <div className='flex items-center sm:flex-col gap-5 sm:gap-1 sm:items-center'></div>
      <div className='flex items-center md:flex-col gap-5 md:gap-1 md:items-center justify-center'>
        <FiltersListingPage
          sortOptions={sortOptions}
          isSortingDropdownOpen={isSortingDropdownOpen}
          setIsSortingDropdownOpen={setIsSortingDropdownOpen}
          valuesQueries={valuesQueries}
          handleInputChange={handleInputChange}
        />
        <div className='flex gap-5'>
          <DropdownButtons
            displayName={`tri: ${valuesQueries.sort}`}
            options={sortOptions}
            handleFilterChange={handleInputChange}
            name='sort'
          />
        </div>
      </div>
      <p className='font-bold text-center my-5'>
        {totalNumberListings}{' '}
        {totalNumberListings > 1 ? 'annonces trouvées' : 'annonce trouvée'}
      </p>
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
        />
      )}
    </section>
  );
};

export default Listings;

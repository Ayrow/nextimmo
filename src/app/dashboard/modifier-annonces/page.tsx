'use client';

import { useEffect, useRef, useState } from 'react';
import { useListingsContext } from '../../../context/listings/listingsContext';
import ListCard from '../../../components/listings/ListCard';
import { useAppContext } from '../../../context/app/appContext';
import ConfirmDeletionModal from '../../../components/modals/ConfirmDeletionModal';
import { IListing } from '../../../../types/listingTypes';
import {
  etatsAnnonceOptions,
  queryParams,
  sortOptions,
  statutOptions,
} from '../../../../utils/listingDetails';
import FiltersListingPage from '../../../components/filters/FiltersListingPage';
import {
  EventTargetType,
  HandleInputChangeType,
} from '../../../../types/functionTypes';
import PageBtnContainer from '../../../components/buttons/PageBtnContainer';
import { useCloseOnOutsideClick } from '../../../hooks/useCloseOnOutsideClick';
import DropdownButtons from '../../../components/buttons/DropdownButtons';

const ManageListings = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { deleteListing } = useListingsContext();
  const [allListings, setAllListings] = useState<IListing[]>(null);
  const [valuesQueries, setValuesQueries] = useState(queryParams);
  const { state } = useAppContext();
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

  const closeDropdown = () => {
    setIsSortingDropdownOpen(false);
  };

  useCloseOnOutsideClick(closeDropdown, ref);

  useEffect(() => {
    setValuesQueries((prevValues) => ({
      ...prevValues,
      etat: 'tous les états',
    }));
  }, []);

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

  return (
    <div className='p-10 bg-gray-900 w-full'>
      {state.modal.showModal && (
        <ConfirmDeletionModal deleteItem={deleteListing} />
      )}
      <h2 className='text-center text-xl font-bold'>Manage Listings</h2>

      <div className='flex items-center flex-wrap md:flex-col gap-5 md:gap-1 md:items-center justify-center'>
        <FiltersListingPage
          sortOptions={sortOptions}
          isSortingDropdownOpen={isSortingDropdownOpen}
          setIsSortingDropdownOpen={setIsSortingDropdownOpen}
          valuesQueries={valuesQueries}
          handleInputChange={handleInputChange}
        />
        <div className='flex flex-wrap justify-center gap-5'>
          <DropdownButtons
            displayName={`etat: ${valuesQueries.etat}`}
            options={etatsAnnonceOptions}
            handleFilterChange={handleInputChange}
            name='etat'
          />
          <DropdownButtons
            displayName={`statut: ${valuesQueries.statut}`}
            options={statutOptions}
            handleFilterChange={handleInputChange}
            name='statut'
          />
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
      <div className='flex flex-col gap-5 mt-10'>
        {allListings &&
          allListings?.map((listing) => {
            const { ref } = listing;
            return <ListCard key={ref} listing={listing} />;
          })}
      </div>
      {totalPages > 0 && (
        <PageBtnContainer
          numOfPages={totalPages}
          page={valuesQueries.page}
          handleInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default ManageListings;

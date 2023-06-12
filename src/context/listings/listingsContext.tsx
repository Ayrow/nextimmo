'use client';

import { createContext, useContext, useState } from 'react';
import { IListingDocument } from '../../../types/listingTypes';
import { useAppContext } from '../app/appContext';

type ListingContextType = {
  allListings: [IListingDocument];
  getAllListings: (signal: AbortSignal) => void;
  deleteListing: (ref: string) => void;
  editListing: (ref: string) => void;
  updateListing: (ref: string) => void;
  separateThousands: (number: number) => string;
};

const ListingsContext = createContext<ListingContextType>(null);

const ListingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { actions } = useAppContext();
  const [allListings, setAllListings] = useState<[IListingDocument]>(undefined);

  const getAllListings = async (signal: AbortSignal) => {
    try {
      const res = await fetch('/api/allListings', {
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

  const deleteListing = async (ref: string) => {
    try {
      const res = await fetch(`/api/listing?ref=${ref}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data) {
        setAllListings(data);
      } else {
        // display error
      }
    } catch (error) {
      alert(error);
      // display pop up alert
    }
    actions.closeModal();
  };

  const separateThousands = (number: number) => {
    const numberString = number.toString(); // Convert number to string

    let separatedString = ''; // Initialize the separated string

    for (let i = numberString.length - 1; i >= 0; i--) {
      separatedString = numberString[i] + separatedString;

      if ((numberString.length - i) % 3 === 0 && i !== 0) {
        separatedString = ' ' + separatedString;
      }
    }

    return separatedString;
  };

  const editListing = () => {};

  const updateListing = () => {};

  return (
    <ListingsContext.Provider
      value={{
        getAllListings,
        allListings,
        deleteListing,
        editListing,
        updateListing,
        separateThousands,
      }}>
      {children}
    </ListingsContext.Provider>
  );
};

const useListingsContext = () => {
  return useContext(ListingsContext);
};

export { ListingsProvider, useListingsContext };

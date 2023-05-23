'use client';

import { createContext, useContext, useState } from 'react';
import { IListingDocument } from '../../../types/listingTypes';
import { useAppContext } from '../app/appContext';

type ListingContextType = {
  allListings: [IListingDocument];
  singleListing: IListingDocument;
  getAllListings: () => void;
  getSingleListing: (ref: string) => void;
  deleteListing: (ref: string) => void;
  editListing: (ref: string) => void;
  updateListing: (ref: string) => void;
  separateThousands: (number: number) => string;
};

const ListingsContext = createContext<ListingContextType>(null);

const ListingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { actions } = useAppContext();
  const [allListings, setAllListings] = useState<[IListingDocument]>(undefined);
  const [singleListing, setSingleListing] =
    useState<IListingDocument>(undefined);

  const getAllListings = async () => {
    try {
      const res = await fetch('/api/allListings', {
        method: 'GET',
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

  const getSingleListing = async (ref: string) => {
    console.log('getting single listing');
    try {
      const res = await fetch(`/api/listing?ref=${ref}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data) {
        setSingleListing(data);
      } else {
        alert('error');
        // display error
      }
    } catch (error) {
      alert(error);
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
        singleListing,
        getSingleListing,
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

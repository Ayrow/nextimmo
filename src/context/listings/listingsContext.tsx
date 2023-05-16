'use client';

import { createContext, useContext, useState } from 'react';
import { IListingDocument } from '../../../types/listingTypes';

type ListingContextType = {
  allListings: [IListingDocument];
  singleListing: IListingDocument;
  getAllListings: () => void;
  getSingleListing: (id: any) => void;
};

const ListingsContext = createContext<ListingContextType>(null);

const ListingsProvider = ({ children }: { children: React.ReactNode }) => {
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

  const getSingleListing = async (ref: string) => {};

  return (
    <ListingsContext.Provider
      value={{ getAllListings, allListings, singleListing, getSingleListing }}>
      {children}
    </ListingsContext.Provider>
  );
};

const useListingsContext = () => {
  return useContext(ListingsContext);
};

export { ListingsProvider, useListingsContext };

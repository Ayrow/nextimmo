'use client';

import { useEffect } from 'react';

const ManageListings = () => {
  const getAllListings = async () => {
    try {
      await fetch('/api/allListings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      alert(error);
      // add Modal for error
    }
  };

  useEffect(() => {}, []);

  return (
    <div className='p-10'>
      <h2 className='text-center text-xl font-bold'>Manage Listings</h2>
      <div></div>
    </div>
  );
};

export default ManageListings;

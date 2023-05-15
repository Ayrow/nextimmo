'use client';

import { useEffect } from 'react';

const SingleListing = ({ params }) => {
  useEffect(() => {
    console.log('params', params);
    console.log('params.slug', params.slug);
  }, []);
  return <div>SingleListing</div>;
};

export default SingleListing;

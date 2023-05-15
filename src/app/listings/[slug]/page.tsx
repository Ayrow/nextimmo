'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export async function generateStaticParams() {
  const listings = await fetch('/api/allListings').then((res) => res.json());

  return listings.map((listing) => ({
    slug: listing.slug,
  }));
}

const SingleListing = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  useEffect(() => {
    // fetch Single Listing data
  }, []);

  return (
    <div className='bg-gray-900 px-2 lg:px-10 py-5'>
      <div className='flex flex-col-reverse lg:flex-row gap-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1'>
          <div className='flex flex-col justify-center gap-5'>
            <h2 className='text-2xl'>Maison à vendre 5 pièces • 82 m2</h2>
            <div>
              <p>lieu: Trébeurden</p>
              <p className=' text-sm'>ref: annonce-1</p>
            </div>
          </div>
          <div className=''>
            <p className='text-red-500 text-2xl font-bold'>100 000 €</p>
            <p className='text-xs text-gray-200 italic'>
              (340000 euros Hors Honoraires) - Honoraires : 6.5 % TTC à la
              charge de l'acquéreur inclus.
            </p>
          </div>
        </div>

        <div>
          //Image carousel
          <Image
            src={'/house.jpg'}
            alt={`photo-1`}
            width='1000'
            height='1000'
            className='rounded-2xl'
          />
        </div>
      </div>
    </div>
  );
};

export default SingleListing;

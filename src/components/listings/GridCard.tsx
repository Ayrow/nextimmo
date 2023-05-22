'use client';

import { useState } from 'react';
import { IListingDocument } from '../../../types/listingTypes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useListingsContext } from '../../context/listings/listingsContext';

const GridCard = ({ listing }: { listing: IListingDocument }) => {
  const {
    ref,
    nbPieces,
    prix,
    location,
    typeDeBien,
    lieu,
    surfaceInt,
    statut,
    photos,
  } = listing;

  const { separateThousands } = useListingsContext();
  const [currentPhoto, setIsCurrentPhoto] = useState(1);

  const slug = `annonce-${listing.transaction}-${typeDeBien}-${listing.lieu.ville}`;

  return (
    <Link
      href={`/listings/${slug}/${ref}`}
      className='relative border rounded-2xl cursor-pointer'>
      <div className='relative'>
        {photos.length > 0 && currentPhoto > 1 && (
          <button
            className='absolute px-1 top-1/2 left-2 font-bold shadow-2xl bg-gray-900 bg-opacity-50 rounded-full text-3xl'
            onClick={() => setIsCurrentPhoto(currentPhoto - 1)}>
            ⇦
          </button>
        )}
        <Image
          src={photos.length > 1 ? photos[currentPhoto - 1] : '/house.jpg'}
          alt={`photo-${currentPhoto}`}
          width='500'
          height='500'
          className='rounded-t-2xl'
        />
        {photos.length > currentPhoto && (
          <button
            className='absolute px-1 top-1/2 right-2 font-bold shadow-2xl bg-gray-900 bg-opacity-50 rounded-full text-3xl'
            onClick={() => setIsCurrentPhoto(currentPhoto + 1)}>
            ⇨
          </button>
        )}
      </div>

      <div className='p-5'>
        <div className='flex flex-wrap justify-between'>
          <p className='capitalize'>
            {typeDeBien} - {nbPieces} pièces - {surfaceInt}m2
          </p>
          <p className='text-red-500 font-bold'>
            {prix && separateThousands(prix)} €
          </p>
        </div>

        <p className='mt-5'>
          {lieu.ville}, {lieu.codePostal}
        </p>

        <p>ref: {ref}</p>

        <div className='flex flex-wrap justify-around mt-5'>
          <button
            type='button'
            className='border rounded-xl py-2 px-5 border-red-500 text-red-500 bg-gray-950'>
            Favoris
          </button>
          <button type='button' className='border rounded-xl py-2 px-5'>
            Message
          </button>
        </div>
      </div>
    </Link>
  );
};

export default GridCard;

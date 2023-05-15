'use client';

import { useState } from 'react';
import { IListingDocument } from '../../../types/listingTypes';
import Image from 'next/image';

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

  const [currentPhoto, setIsCurrentPhoto] = useState(1);

  return (
    <div className='relative border rounded-2xl'>
      <div className='relative'>
        {photos.length > 0 && currentPhoto > 1 && (
          <button
            className='absolute top-1/2 left-5 font-bold'
            onClick={() => setIsCurrentPhoto(currentPhoto - 1)}>
            Left
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
            className='absolute top-1/2 right-5 font-bold'
            onClick={() => setIsCurrentPhoto(currentPhoto + 1)}>
            Right
          </button>
        )}
      </div>

      <div className='p-5'>
        <div className='flex flex-wrap justify-between'>
          <p className='capitalize'>
            {typeDeBien} - {nbPieces} pièces - {surfaceInt}m2
          </p>
          <p className='text-red-500 font-bold'>{prix} €</p>
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
    </div>
  );
};

export default GridCard;

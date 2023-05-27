'use client';

import { useState } from 'react';
import { IListingDocument } from '../../../types/listingTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useListingsContext } from '../../context/listings/listingsContext';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();
  const { separateThousands } = useListingsContext();
  const [currentPhoto, setIsCurrentPhoto] = useState(1);

  const slug = `annonce-${listing.transaction}-${typeDeBien}-${listing.lieu.ville}`;

  enum possiblePhotosDirection {
    Left,
    Right,
  }

  const handleClick = (
    direction: possiblePhotosDirection,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (direction === possiblePhotosDirection.Left) {
      setIsCurrentPhoto(currentPhoto - 1);
    } else {
      setIsCurrentPhoto(currentPhoto + 1);
    }
  };

  return (
    <div
      className='relative border rounded-2xl cursor-pointer'
      onClick={() => router.push(`/annonces/${slug}/${ref}`)}>
      <div className='relative'>
        <div className='absolute top-2 left-2 bg-blue-500 border border-sky-900 px-2 rounded-xl'>
          {statut}
        </div>
        {photos.length > 0 && currentPhoto > 1 && (
          <button
            className='absolute px-1 top-1/2 left-2 font-bold shadow-2xl bg-gray-900 bg-opacity-50 rounded-full text-3xl'
            onClick={(e) => handleClick(possiblePhotosDirection.Left, e)}>
            ⇦
          </button>
        )}
        <Image
          src={photos.length > 1 ? photos[currentPhoto - 1] : '/house.jpg'}
          alt={`photo-${currentPhoto}`}
          width='500'
          height='500'
          className='rounded-t-2xl h-72'
        />
        {photos.length > currentPhoto && (
          <button
            className='absolute px-1 top-1/2 right-2 font-bold shadow-2xl bg-gray-900 bg-opacity-50 rounded-full text-3xl'
            onClick={(e) => handleClick(possiblePhotosDirection.Right, e)}>
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
          {lieu.quartier}, {lieu.codePostal} {lieu.ville}
        </p>

        <p>ref: {ref}</p>

        <div className='flex flex-wrap justify-around gap-2 mt-5'>
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

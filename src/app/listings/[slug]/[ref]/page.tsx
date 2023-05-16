'use client';

import Image from 'next/image';
import { useEffect } from 'react';

const SingleListing = ({
  params,
}: {
  params: { slug: string; ref: string };
}) => {
  const { slug } = params;

  useEffect(() => {
    console.log('params', params);

    console.log('slug', slug);
    // fetch Single Listing data
  }, []);

  return (
    <div className='bg-gray-900 px-2 lg:px-10 py-5 w-full'>
      <div className='flex flex-col-reverse lg:flex-row gap-5 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-5 px-2'>
          <div className='flex flex-col justify-center gap-5 col-span-2'>
            <h2 className='text-2xl'>Maison à vendre 5 pièces • 82 m2</h2>
            <div className='flex flex-col gap-2'>
              <p>lieu: Trébeurden</p>
              <p className=' text-sm'>ref: annonce-1</p>
            </div>
          </div>
          <div className=' md:col-start-3 lg:col-start-1'>
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

      <div className='flex flex-col gap-5 mt-10'>
        <div className='flex flex-col gap-5 border-b pb-5'>
          <h3>L'essentiel</h3>
          <div className='flex flex-wrap gap-10'>
            <p>5 pièces</p>
            <p>Surface: 80 m²</p>
            <p>2 chambres</p>
            <p>1 salle de bain/eau</p>
            <p>Terrain 730 m²</p>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-5 border-b pb-5'>
            <h3>Interieur</h3>
            <div className='flex flex-wrap gap-10'>
              <p>Cheminée</p>
            </div>
          </div>
          <div className='flex flex-col gap-5 border-b pb-5'>
            <h3>Exterieur</h3>
            <div className='flex flex-wrap gap-10'>
              <p>Terrasse</p>
              <p>Garage</p>
              <p>Cave</p>
              <p>Avec jardin</p>
            </div>
          </div>
          <div className='flex flex-col gap-5 border-b pb-5'>
            <h3>Autre</h3>
            <div className='flex flex-wrap gap-10'>
              <p>Terrasse</p>
              <p>Garage</p>
              <p>Cave</p>
              <p>Avec jardin</p>
            </div>
          </div>
          <div className='flex flex-col gap-5 border-b pb-5'>
            <h3>Description</h3>
            <div className='flex flex-wrap gap-10'>
              <p>Construit en 1900</p>
              <p>Construction en pierre</p>
              <p>Composé de 2 étages</p>
            </div>

            <p>
              Les informations sur les risques auxquels ce bien est exposé sont
              disponibles sur le site Géorisques : www.georisques.gouv.fr
            </p>
          </div>
          <div className='flex flex-col gap-5'>
            <h3>Bilan énergétique</h3>
            // show infos
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListing;

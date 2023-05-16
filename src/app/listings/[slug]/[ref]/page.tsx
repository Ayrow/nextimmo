'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useListingsContext } from '../../../../context/listings/listingsContext';

export async function generateStaticParams() {
  const listings = await fetch('/api/allListings').then((res) => res.json());

  return listings.map((listing) => ({
    ref: listing.ref,
  }));
}

const SingleListing = ({
  params,
}: {
  params: { slug: string; ref: string };
}) => {
  const { ref } = params;
  const { getSingleListing, singleListing } = useListingsContext();
  const [currentPhoto, setIsCurrentPhoto] = useState(1);

  function separateNumbers(number: number) {
    const numberString = number.toString(); // Convert number to string

    let separatedString = ''; // Initialize the separated string

    for (let i = numberString.length - 1; i >= 0; i--) {
      separatedString = numberString[i] + separatedString;

      if ((numberString.length - i) % 3 === 0 && i !== 0) {
        separatedString = ' ' + separatedString;
      }
    }

    return separatedString;
  }

  const displayAllTrueKeys = (object: object) => {
    const trueKeys = Object.entries(object).filter(
      ([key, value]) => value === true
    );
    return trueKeys;
  };

  useEffect(() => {
    getSingleListing(ref);
  }, []);

  return (
    <div className='bg-gray-900 px-2 lg:px-10 py-5 w-full'>
      <div className='flex flex-col-reverse lg:flex-row gap-5 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-5 px-2'>
          <div className='flex flex-col justify-center gap-5 col-span-2'>
            <h2 className='text-2xl capitalize'>
              {singleListing?.typeDeBien} à{' '}
              {singleListing?.transaction == 'vente' ? 'vendre' : 'louer'}{' '}
              {singleListing?.nbPieces}{' '}
              {singleListing?.nbPieces > 1 ? 'pièces' : 'pièce'} •{' '}
              {singleListing?.surfaceInt} m2
            </h2>
            <div className='flex flex-col gap-2'>
              <p>
                {singleListing?.lieu?.quartier}
                {', '}
                {singleListing?.lieu?.ville} ({singleListing?.lieu?.codePostal})
              </p>
              <p className=' text-sm'>ref: annonce-1</p>
            </div>
          </div>
          <div className=' md:col-start-3 lg:col-start-1'>
            {singleListing?.transaction === 'vente' ? (
              <p className='text-red-500 text-2xl font-bold'>
                {singleListing?.prix && separateNumbers(singleListing?.prix)} €
              </p>
            ) : (
              <p className='text-red-500 text-2xl font-bold'>
                {singleListing &&
                  separateNumbers(singleListing?.location?.loyerMensuel)}{' '}
                €
              </p>
            )}

            {singleListing?.transaction === 'vente' ? (
              <p className='text-xs text-gray-200 italic'>
                (340000 euros Hors Honoraires) - Honoraires :{' '}
                {singleListing?.honoraires?.taux} % TTC à la charge{' '}
                {singleListing?.honoraires?.aCharge === 'acheteur'
                  ? "de l'acquéreur"
                  : 'du vendeur'}
                .
              </p>
            ) : (
              <p className='text-xs text-gray-200 italic'>
                Caution: {singleListing?.location?.caution} € - Frais d'agence :{' '}
                {singleListing?.honoraires?.fraisAgence}.
              </p>
            )}
          </div>
        </div>

        <div className='relative'>
          {singleListing?.photos.length > 0 && currentPhoto > 1 && (
            <button
              className='absolute px-1 top-1/2 left-2 font-bold shadow-2xl bg-gray-900 bg-opacity-50 rounded-full text-3xl'
              onClick={() => setIsCurrentPhoto(currentPhoto - 1)}>
              ⇦
            </button>
          )}
          <Image
            src={
              singleListing?.photos.length > 1
                ? singleListing?.photos[currentPhoto - 1]
                : '/house.jpg'
            }
            alt={`photo-${currentPhoto}`}
            width='1000'
            height='1000'
            className='rounded-2xl'
          />
          {singleListing?.photos.length > currentPhoto && (
            <button
              className='absolute px-1 top-1/2 right-2 font-bold shadow-2xl bg-gray-900 bg-opacity-50 rounded-full text-3xl'
              onClick={() => setIsCurrentPhoto(currentPhoto + 1)}>
              ⇨
            </button>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-5 mt-10'>
        <div className='flex flex-col gap-5 border-b pb-5'>
          <h3 className='font-bold'>L'essentiel</h3>
          <div className='flex flex-wrap gap-10'>
            <p>{singleListing?.nbPieces} pièces</p>
            <p>Surface: {singleListing?.surfaceInt} m²</p>

            {singleListing?.nbChambres > 0 && (
              <p>{singleListing?.nbChambres} chambres</p>
            )}

            <p>{singleListing?.nbSDB} salle de bain/eau</p>
            {singleListing?.surfaceExt > 0 && (
              <p>Terrain {singleListing?.surfaceExt} m²</p>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-5 border-b pb-5'>
            <h3 className='font-bold'>Interieur</h3>
            <div className='flex flex-wrap gap-10'>
              {singleListing?.equipements?.interieur &&
                displayAllTrueKeys(singleListing?.equipements?.interieur).map(
                  ([key, value]) => <p className='capitalize'>{key}</p>
                )}
            </div>
          </div>
          <div className='flex flex-col gap-5 border-b pb-5'>
            <h3 className='font-bold'>Exterieur</h3>
            <div className='flex flex-wrap gap-10'>
              {singleListing?.equipements?.exterieur &&
                displayAllTrueKeys(singleListing?.equipements?.exterieur).map(
                  ([key, value]) => <p className='capitalize'>{key}</p>
                )}
            </div>
          </div>
          <div className='flex flex-col gap-5 border-b pb-5'>
            <h3 className='font-bold'>Autre</h3>
            <div className='flex flex-wrap gap-10'>
              {singleListing?.dateConstruction && (
                <p>{singleListing?.dateConstruction}</p>
              )}
              {singleListing?.nbEtages > 1 ? (
                <p>Composé de {singleListing?.nbEtages} étages</p>
              ) : (
                <p>Plain-pied</p>
              )}
              <p>Chauffage: {singleListing?.typeChauffage}</p>
            </div>
          </div>
          <div className='flex flex-col gap-5 border-b pb-5'>
            <h3 className='font-bold'>Description</h3>
            <p>{singleListing?.description}</p>

            <p className='italic'>
              Les informations sur les risques auxquels ce bien est exposé sont
              disponibles sur le site Géorisques : www.georisques.gouv.fr
            </p>
          </div>
          <div className='flex flex-col gap-5'>
            <h3 className='font-bold'>Bilan énergétique</h3>
            // show infos
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListing;

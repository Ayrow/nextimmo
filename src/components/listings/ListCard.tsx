'use client';

import Image from 'next/image';
import { IListingDocument } from '../../../types/listingTypes';

import { useListingsContext } from '../../context/listings/listingsContext';
import Link from 'next/link';
import { ModalCategories, useAppContext } from '../../context/app/appContext';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaEye, FaHeart } from 'react-icons/fa';

const ListCard = ({ listing }: { listing: IListingDocument }) => {
  const {
    _id,
    ref,
    transaction,
    nbPieces,
    prix,
    location,
    typeDeBien,
    lieu,
    surfaceInt,
    statut,
    photos,
    etat,
    nbVues,
    nbAjoutFavoris,
    nbContact,
  } = listing;

  const { separateThousands, updateListingsNumbers } = useListingsContext();
  const router = useRouter();
  const { actions } = useAppContext();
  const slug = `annonce-${listing.transaction}-${typeDeBien}-${listing.lieu.ville}/${ref}`;

  const editListing = () => {
    actions.editItem(ref);
    router.push(`/dashboard/ajouter-annonce?editing=${ref}`);
  };

  return (
    <div className='relative w-full border rounded-2xl p-5'>
      <div className='flex justify-end gap-5 my-2'>
        <button className='flex items-center gap-2'>
          <FaEye /> {nbVues}
        </button>
        <button className='flex items-center gap-2'>
          <FaHeart /> {nbAjoutFavoris}
        </button>
        <button className='flex items-center gap-2'>
          <FaEnvelope /> {nbContact}
        </button>
      </div>
      <div className=' flex flex-col lg:flex-row flex-wrap items-center justify-between gap-5 '>
        <div className='flex flex-wrap items-center flex-col gap-2'>
          <p className='capitalize'>
            <span
              className={
                etat === 'brouillon' ? 'text-orange-500' : 'text-green-500'
              }>
              {etat} - {transaction} - {statut}
            </span>{' '}
          </p>
          <p className='font-bold'>ref: {ref}</p>

          <Image
            src={photos.length > 0 ? photos[0] : '/house.jpg'}
            alt={`photo ref: ${ref}`}
            width='100'
            height='100'
            className='rounded-xl'
          />
        </div>

        <div className='text-center'>
          <p className='capitalize'>
            {typeDeBien} - {nbPieces} pièces - {surfaceInt}m2
          </p>

          <p className=''>
            {lieu.ville}, {lieu.codePostal}
          </p>
        </div>

        <p className='text-red-500 font-bold'>
          {transaction === 'vente'
            ? prix && separateThousands(prix)
            : location.loyerMensuel &&
              separateThousands(location.loyerMensuel)}{' '}
          €
        </p>

        <div className='flex flex-wrap gap-5'>
          <Link
            href={`/annonces/${slug}`}
            className='border rounded-xl py-2 px-5 border-blue-500 shadow-blue-500 shadow-md'>
            Voir
          </Link>
          <button
            type='button'
            onClick={editListing}
            className='border rounded-xl py-2 px-5 border-orange-500 shadow-orange-500 shadow-md'>
            Modifier
          </button>
          <button
            type='button'
            onClick={() =>
              actions.displayModal({
                modalMsg: `Êtes-vous sûr(e) de vouloir supprimer l'annonce`,
                modalTitle: "Suppression d'annonce",
                modalCategory: ModalCategories.Delete,
                refItem: `${ref}`,
              })
            }
            className='border rounded-xl py-2 px-5 border-red-500 shadow-red-500 shadow-md'>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCard;

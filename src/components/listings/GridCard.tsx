'use client';

import { useEffect, useState } from 'react';
import { IListingDocument } from '../../../types/listingTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useListingsContext } from '../../context/listings/listingsContext';
import { useRouter } from 'next/navigation';
import { UserFromDB, useAuthContext } from '../../context/user/authContext';
import { ModalCategories, useAppContext } from '../../context/app/appContext';
import NotificationModal from '../modals/NotificationModal';
import { FaEye, FaHeart } from 'react-icons/fa';

const GridCard = ({ listing }: { listing: IListingDocument }) => {
  const {
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
  } = listing;

  const router = useRouter();
  const { separateThousands, updateListingsNumbers } = useListingsContext();
  const { state, actions } = useAppContext();
  const [currentPhoto, setIsCurrentPhoto] = useState(1);
  const { user, updateCurrentUser } = useAuthContext();
  const [listOfAlreadySeenListings, setListOfAlreadySeenListings] = useState(
    []
  );
  const [listFavoritesListings, setListFavoritesListings] = useState([]);

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

  const addToFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (user) {
      updateUserFavorites();
    } else {
      actions.displayModal({
        modalTitle: 'Compte nécessaire',
        modalCategory: ModalCategories.Notification,
        modalMsg: 'Il vous faut un compte pour ajouter en favoris',
      });
    }
  };

  const updateUserFavorites = async () => {
    const listingId = listing._id;
    try {
      const res = await fetch(
        `/api/user/savedListings?userId=${user._id}&listingId=${listingId}`,
        {
          method: 'POST',
          body: JSON.stringify({ listingId }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data: UserFromDB = await res.json();
      updateCurrentUser(data);
      if (data?.saved.includes(listingId)) {
        updateListingsNumbers({
          listingId: listingId,
          valueChange: 'increment',
          toUpdate: 'favorites',
        });
      } else {
        updateListingsNumbers({
          listingId: listingId,
          valueChange: 'decrement',
          toUpdate: 'favorites',
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (state.seenListings) {
      setListOfAlreadySeenListings(state.seenListings);
    }
  }, []);

  return (
    <div
      className='relative border rounded-2xl cursor-pointer'
      onClick={() => router.push(`/annonces/${slug}/${ref}`)}>
      {state.modal.showModal && <NotificationModal />}
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
        {listOfAlreadySeenListings.includes(listing._id) &&
          user?.role !== ('admin' || 'agent') && (
            <div className='absolute bg-gray-500 bg-opacity-40 z-30 inset-0 flex items-center justify-center text-9xl'>
              <FaEye />
            </div>
          )}
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
          <div className='flex flex-col flex-wrap'>
            <p className='capitalize'>
              {typeDeBien}
              {nbPieces !== 0 && ` - ${nbPieces} pièces`}
            </p>
            <p>
              {['maison', 'appartement', 'immeuble', 'bureau'].includes(
                typeDeBien
              ) && `${surfaceInt} m2`}
            </p>
          </div>
          <p className='text-red-500 font-bold'>
            {transaction === 'vente' && prix && `${separateThousands(prix)} €`}
            {transaction === 'location' &&
              location.loyerMensuel &&
              `${location.loyerMensuel} € / mois`}
          </p>
        </div>

        <p className='mt-5'>
          {lieu.quartier && `${lieu.quartier}, `}
          {lieu.codePostal} {lieu.ville}
        </p>

        <p>ref: {ref}</p>

        <div className='flex flex-wrap justify-around gap-2 mt-5'>
          <button
            type='button'
            onClick={addToFavorite}
            className='border flex items-center gap-2 rounded-xl py-2 px-5 border-red-500'>
            <FaHeart
              className={`${
                user?.saved?.includes(listing._id)
                  ? 'text-red-500'
                  : 'text-white'
              }`}
            />
            <span className='text-red-500'>Favoris</span>
          </button>
          <Link
            href={{ pathname: '/contact', query: { ref: ref } }}
            className='border rounded-xl py-2 px-5'>
            <button onClick={(e) => e.stopPropagation()}>Message</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GridCard;

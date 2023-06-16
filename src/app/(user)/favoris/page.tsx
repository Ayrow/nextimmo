'use client';

import { useEffect, useState } from 'react';
import { UserFromDB, useAuthContext } from '../../../context/user/authContext';
import { IListingDocument } from '../../../../types/listingTypes';
import Link from 'next/link';
import ListCard from '../../../components/listings/ListCard';
import Image from 'next/image';
import { useListingsContext } from '../../../context/listings/listingsContext';
import {
  ModalCategories,
  useAppContext,
} from '../../../context/app/appContext';
import ActionModal from '../../../components/modals/ActionModal';

const SavedListings = () => {
  const { user, updateCurrentUser } = useAuthContext();
  const { state, actions } = useAppContext();
  const { separateThousands, updateListingsNumbers } = useListingsContext();
  const [savedListings, setSavedListings] = useState<IListingDocument[]>([]);

  const getAllSavedListings = async () => {
    try {
      const res = await fetch(`/api/user/savedListings?userId=${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data) {
        setSavedListings(data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteFavorite = async (ref) => {
    const listingId = ref;
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
    actions.closeModal();
  };

  useEffect(() => {
    getAllSavedListings();
  }, [user]);

  if (user && user.role === 'user') {
    return (
      <div className='bg-sky-950 p-5'>
        {state.modal.showModal && <ActionModal />}
        {savedListings.length > 0 && (
          <>
            <h2 className='py-20 text-center text-xl'>
              Retrouvez vos annonces préférées
            </h2>
            <div className='flex flex-col gap-5'>
              {savedListings?.map((listing) => {
                const {
                  ref,
                  photos,
                  typeDeBien,
                  nbPieces,
                  surfaceInt,
                  lieu,
                  transaction,
                  prix,
                  location,
                } = listing;
                const slug = `annonce-${transaction}-${typeDeBien}-${lieu.ville}/${ref}`;
                return (
                  <div
                    key={listing._id}
                    className='relative w-full border rounded-2xl p-5'>
                    <div className=' flex flex-col lg:flex-row flex-wrap items-center justify-between gap-5 '>
                      <div className='flex flex-wrap items-center flex-col gap-2'>
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
                          onClick={() =>
                            actions.displayModal({
                              modalMsg: `Êtes-vous sûr(e) de vouloir supprimer l'annonce de vos favoris`,
                              modalTitle: 'Suppression de favoris',
                              modalCategory: ModalCategories.Delete,
                              refItem: `${listing._id}`,
                              modalFunction: deleteFavorite,
                            })
                          }
                          className='border rounded-xl py-2 px-5 border-red-500 shadow-red-500 shadow-md'>
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {savedListings?.length === 0 && (
          <div className='h-full flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center gap-5 border rounded-xl p-10 shadow-black shadow-lg'>
              <h3 className='text-2xl'>
                Vous n'avez pas encore d'annonces en favoris
              </h3>
              <p>Ajoutez-en pour les voir apparaître ici!</p>
              <Link
                className='text-xl border rounded-lg px-2 py-1'
                href={'/annonces'}>
                Voir les annonces
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default SavedListings;

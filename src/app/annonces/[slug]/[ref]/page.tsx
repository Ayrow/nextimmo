'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useListingsContext } from '../../../../context/listings/listingsContext';
import { IListing, IListingDocument } from '../../../../../types/listingTypes';
import BackButton from '../../../../components/buttons/BackButton';
import {
  listEquipementsExterieur,
  listEquipementsInterieur,
  listTypeChauffage,
} from '../../../../../utils/listingDetails';
import Link from 'next/link';
import { FaEnvelope, FaHeart } from 'react-icons/fa';
import {
  ModalCategories,
  useAppContext,
} from '../../../../context/app/appContext';
import NotificationModal from '../../../../components/modals/NotificationModal';
import {
  UserFromDB,
  useAuthContext,
} from '../../../../context/user/authContext';

export async function generateStaticParams() {
  const listings = await fetch('/api/allListings').then((res) => res.json());

  return listings.map((listing: IListing) => ({
    ref: listing.ref,
  }));
}

const SingleListing = ({
  params,
}: {
  params: { slug: string; ref: string };
}) => {
  const { ref } = params;
  const { separateThousands, updateListingsNumbers } = useListingsContext();
  const [singleListing, setSingleListing] =
    useState<IListingDocument>(undefined);
  const { state, actions } = useAppContext();
  const { user, updateCurrentUser } = useAuthContext();
  const [currentPhoto, setIsCurrentPhoto] = useState(1);

  let displayNoteDPE = '';
  let displayNoteGES = '';

  const notesDPE = [
    { letter: 'A', range: { min: 0, max: 50 } },
    { letter: 'B', range: { min: 50, max: 90 } },
    { letter: 'C', range: { min: 91, max: 150 } },
    { letter: 'D', range: { min: 151, max: 230 } },
    { letter: 'E', range: { min: 231, max: 330 } },
    { letter: 'F', range: { min: 331, max: 450 } },
    { letter: 'G', range: { min: 451, max: 999 } },
  ];

  const notesGES = [
    { letter: 'A', range: { min: 0, max: 5 } },
    { letter: 'B', range: { min: 6, max: 10 } },
    { letter: 'C', range: { min: 11, max: 20 } },
    { letter: 'D', range: { min: 21, max: 35 } },
    { letter: 'E', range: { min: 36, max: 55 } },
    { letter: 'F', range: { min: 56, max: 80 } },
    { letter: 'G', range: { min: 81, max: 999 } },
  ];

  for (const noteDPE of notesDPE) {
    const { min, max } = noteDPE.range;
    if (
      singleListing?.consoEnergetique >= min &&
      singleListing?.consoEnergetique <= max
    ) {
      displayNoteDPE = noteDPE.letter;
      break;
    }
  }

  for (const noteGES of notesGES) {
    const { min, max } = noteGES.range;
    if (singleListing?.ges >= min && singleListing?.ges <= max) {
      displayNoteGES = noteGES.letter;
      break;
    }
  }

  const colorVariantsDPE = {
    A: 'bg-[#029163]',
    B: 'bg-[#46a64a]',
    C: 'bg-[#6db56b]',
    D: 'bg-[#f2e314]',
    E: 'bg-[#edab0f]',
    F: 'bg-[#e8782f]',
    G: 'bg-[#d1201e]',
  };

  const colorVariantsGES = {
    A: 'bg-[#99d5f7]',
    B: 'bg-[#80abcd]',
    C: 'bg-[#6d87a8]',
    D: 'bg-[#546384]',
    E: 'bg-[#434665]',
    F: 'bg-[#332d47]',
    G: 'bg-[#231a2f]',
  };

  const getSingleListing = async (ref: string, signal: AbortSignal) => {
    setSingleListing(null);
    try {
      const res = await fetch(`/api/listing?ref=${ref}`, {
        method: 'GET',
        signal: signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data) {
        setSingleListing(data);
        addToAlreadySeen(data._id);
      } else {
        actions.displayModal({
          modalTitle: 'Erreur',
          modalCategory: ModalCategories.Error,
          modalMsg: `Une erreur est survenue, veuillez réessayer ultérieurement.`,
          modalConfirmText: 'Continuer',
        });
      }
    } catch (error) {
      actions.displayModal({
        modalTitle: 'Erreur',
        modalCategory: ModalCategories.Error,
        modalMsg: `Une erreur est survenue, veuillez réessayer ultérieurement.`,
        modalConfirmText: 'Continuer',
      });
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
        modalConfirmText: 'Continuer',
      });
    }
  };

  const updateUserFavorites = async () => {
    const listingId = singleListing._id;
    try {
      const res = await fetch(
        `/api/user?userId=${user._id}&update=nbAjoutFavoris`,
        {
          method: 'PATCH',
          body: JSON.stringify({ listingId }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data: UserFromDB = await res.json();
      if (data) {
        updateCurrentUser(data);
        data.alreadySeen.includes(listingId)
          ? updateListingsNumbers({
              listingId: listingId,
              toUpdate: 'favorites',
              valueChange: 'increment',
            })
          : updateListingsNumbers({
              listingId: listingId,
              toUpdate: 'favorites',
              valueChange: 'decrement',
            });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const addToAlreadySeen = async (listingId) => {
    if (user && !user.alreadySeen.includes(listingId)) {
      try {
        const res = await fetch(`/api/user?userId=${user._id}&update=nbVues`, {
          method: 'PATCH',
          body: JSON.stringify({ listingId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data: UserFromDB = await res.json();
        if (data) {
          updateCurrentUser(data);
          actions.addSeenListingsToSessionStorage(data.alreadySeen);
          updateListingsNumbers({
            listingId: listingId,
            toUpdate: 'views',
            valueChange: 'increment',
          });
        }
      } catch (error) {
        console.log('error', error);
      }
    } else if (!state.seenListings?.includes(listingId)) {
      actions.addListingToAlreadySeen(listingId);
      updateListingsNumbers({
        listingId: listingId,
        toUpdate: 'views',
        valueChange: 'increment',
      });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getSingleListing(ref, signal);
    return () => {
      controller.abort();
    };
  }, [ref]);

  if (!singleListing) {
    <div>Data is loading...</div>;
  } else {
    return (
      <div className='bg-gray-900 px-2 lg:px-10 py-5 w-full'>
        {state.modal.showModal && <NotificationModal />}
        <div className='flex justify-between mb-3'>
          <BackButton />
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={addToFavorite}
              className='border flex items-center gap-2 rounded-xl py-3 px-3 border-red-500'>
              <FaHeart
                className={`${
                  user?.saved?.includes(singleListing._id)
                    ? 'text-red-500'
                    : 'text-white'
                }`}
              />
            </button>
            <Link
              href={{ pathname: '/contact', query: { ref: ref } }}
              className='border flex items-center rounded-xl py-3 px-3'>
              <FaEnvelope />
            </Link>
          </div>
        </div>

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
                  {singleListing?.lieu?.ville} (
                  {singleListing?.lieu?.codePostal})
                </p>
                <p className=' text-sm'>ref: annonce-1</p>
              </div>
            </div>
            <div className=' md:col-start-3 lg:col-start-1'>
              {singleListing?.transaction === 'vente' ? (
                <p className='text-red-500 text-2xl font-bold'>
                  {singleListing?.prix &&
                    separateThousands(singleListing?.prix)}{' '}
                  €
                </p>
              ) : (
                <p className='text-red-500 text-2xl font-bold'>
                  {singleListing &&
                    separateThousands(
                      singleListing?.location?.loyerMensuel
                    )}{' '}
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
                  Caution: {singleListing?.location?.caution} € - Frais d'agence
                  : {singleListing?.honoraires?.fraisAgence}.
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
              <p>{singleListing?.nbPieces} pièce(s)</p>
              <p>Surface: {singleListing?.surfaceInt} m²</p>

              {singleListing?.nbChambres > 0 && (
                <p>{singleListing?.nbChambres} chambre(s)</p>
              )}

              <p>{singleListing?.nbSDB} salle(s) de bain/eau</p>
              {singleListing?.surfaceExt > 0 && (
                <p>Terrain {singleListing?.surfaceExt} m²</p>
              )}
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-5 border-b pb-5'>
              <h3 className='font-bold'>Interieur</h3>
              <div className='flex flex-wrap gap-10'>
                {listEquipementsInterieur.map((element) => {
                  if (
                    singleListing?.equipements?.interieur.includes(element.name)
                  ) {
                    return (
                      <p key={element.id} className='capitalize'>
                        {element.label}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
            <div className='flex flex-col gap-5 border-b pb-5'>
              <h3 className='font-bold'>Exterieur</h3>
              <div className='flex flex-wrap gap-10'>
                {listEquipementsExterieur.map((element) => {
                  if (
                    singleListing?.equipements?.exterieur.includes(element.name)
                  ) {
                    return (
                      <p key={element.id} className='capitalize'>
                        {element.label}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
            <div className='flex flex-col gap-5 border-b pb-5'>
              <h3 className='font-bold'>Autre</h3>
              <div className='flex flex-wrap gap-10'>
                {singleListing?.dateConstruction && (
                  <p>Date de construction: {singleListing?.dateConstruction}</p>
                )}
                {singleListing?.nbEtages > 1 && (
                  <p>Composé de {singleListing?.nbEtages} étages</p>
                )}
                {singleListing?.typeChauffage && (
                  <p>
                    Chauffage:{' '}
                    {listTypeChauffage.map((element) => {
                      if (element.name === singleListing?.typeChauffage) {
                        return element.label;
                      }
                    })}
                  </p>
                )}
              </div>
            </div>
            <div className='flex flex-col gap-5 border-b pb-5'>
              <h3 className='font-bold'>Description</h3>
              <p>{singleListing?.description}</p>

              <p className='italic'>
                Les informations sur les risques auxquels ce bien est exposé
                sont disponibles sur le site Géorisques : www.georisques.gouv.fr
              </p>
            </div>
            <div className='flex flex-col gap-5'>
              <h3 className='font-bold'>Bilan énergétique</h3>
              <div>
                <h4 className='pb-5'>Consommation Energétique :</h4>
                <div className='relative flex gap-2 items-start'>
                  {notesDPE.map((gradeRange) => (
                    <div key={gradeRange.letter}>
                      <div
                        className={
                          gradeRange.letter === displayNoteDPE
                            ? `px-2 rounded flex justify-center font-bold border border-white ${
                                colorVariantsDPE[gradeRange.letter]
                              }`
                            : `px-2 rounded border border-white ${
                                colorVariantsDPE[gradeRange.letter]
                              }`
                        }>
                        {gradeRange.letter}
                      </div>
                      {gradeRange.letter === displayNoteDPE && (
                        <div className='flex flex-col items-center'>
                          <p className='text-blue-500'>⬆︎</p>
                          <p className='font-bold'>
                            {singleListing?.consoEnergetique}
                          </p>
                          <p>kWh/m2.an</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className='pb-5'>Emission de Gaz :</h4>
                <div className='relative flex gap-2 items-start'>
                  {notesGES.map((gradeRange) => (
                    <div key={gradeRange.letter}>
                      <div
                        className={
                          gradeRange.letter === displayNoteGES
                            ? `px-2 rounded flex border border-white justify-center font-bold ${
                                colorVariantsGES[gradeRange.letter]
                              }`
                            : `px-2 rounded border border-white ${
                                colorVariantsGES[gradeRange.letter]
                              }`
                        }>
                        {gradeRange.letter}
                      </div>
                      {gradeRange.letter === displayNoteGES && (
                        <div className='flex flex-col items-center'>
                          <p className='text-blue-500'>⬆︎</p>
                          <p className='font-bold'>{singleListing?.ges}</p>
                          <p>kgeqCO2/m².an</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleListing;

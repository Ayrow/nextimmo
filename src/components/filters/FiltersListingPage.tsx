'use client';

import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import FilterCard from './FilterCard';
import FilterButton from './FilterButton';
import FilterCheckbox from './FilterCheckbox';
import FilterText from './FilterText';
import AdvancedSearch from './AdvancedSearch';
import { listTypeDeBien, nbRooms } from '../../../utils/listingDetails';
import BasicSearch from './BasicSearch';
import { ListingQueryParamsType } from '../../../types/listingTypes';
import { EventTargetType } from '../../../types/functionTypes';
import { useCloseOnOutsideClick } from '../../hooks/useCloseOnOutsideClick';

const FiltersListingPage = ({
  valuesQueries,
  handleInputChange,
}: {
  valuesQueries: ListingQueryParamsType;
  handleInputChange: (MouseEvent) => void;
  sortOptions: string[];
  isSortingDropdownOpen: boolean;
  setIsSortingDropdownOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const regexContainsChar = /[a-zA-Z]/;
  const ref = useRef<HTMLDivElement>(null);

  const {
    transaction,
    refListing,
    quartier,
    ville,
    codePostal,
    typeDeBien,
    minPrice,
    maxPrice,
    minSurfaceInt,
    maxSurfaceInt,
    minSurfaceExt,
    maxSurfaceExt,
    nbPieces,
    nbChambres,
    nbSDB,
    typeChauffage,
    equipementsInt,
    equipementsExt,
    exposition,
  } = valuesQueries;

  type CardsType = {
    [key: string]: boolean;
  };

  const initialCardsState: CardsType = {
    refListing: false,
    transaction: false,
    typeDeBien: false,
    localisation: false,
    prix: false,
    surfaceInt: false,
    nbPieces: false,
    rechercheAvancee: false,
  };

  const [isMobileFilterOpen, setISMobileFilterOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(initialCardsState);

  const openCloseCard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { name } = e.target as EventTargetType;
    const data = {
      ...initialCardsState,
      [name]: !isCardOpen[name],
    };
    setIsCardOpen(data);
  };

  const closeAllCards = () => {
    setIsCardOpen(initialCardsState);
  };

  useCloseOnOutsideClick(closeAllCards, ref);

  const renderRoomNumberText = (
    arrayNumberRoom: string[] | string,
    typeOfRoom: string
  ) => {
    if (arrayNumberRoom?.length > 0) {
      if (arrayNumberRoom.length === 1 && arrayNumberRoom.includes('1')) {
        return `${arrayNumberRoom} ${typeOfRoom}`;
      } else if (
        arrayNumberRoom.length === 1 &&
        !arrayNumberRoom.includes('1')
      ) {
        return `${arrayNumberRoom} ${typeOfRoom}s`;
      } else {
        if (
          !arrayNumberRoom.includes('6') &&
          typeof arrayNumberRoom !== 'string'
        ) {
          return `${arrayNumberRoom.sort().join(', ')} ${typeOfRoom}s`;
        } else if (
          arrayNumberRoom.includes('6') &&
          typeof arrayNumberRoom !== 'string'
        ) {
          return `${arrayNumberRoom.sort().join(', ')} ${typeOfRoom}s et +`;
        }
      }
    } else {
      return 'Nombre de Pièces';
    }
  };

  const checkArrayString = (prop: string | string[]) => {
    if (typeof prop === 'string') {
      return prop;
    } else {
      return prop.join(', ');
    }
  };

  const renderNumberTextOnly = (
    text: string,
    min: string,
    max: string,
    symbol: string
  ) => {
    if (!min && !max) {
      return text;
    } else if (min && !max) {
      if (regexContainsChar.test(min)) {
        return text;
      } else {
        return `A partir de ${min} ${symbol}`;
      }
    } else if (!min && max) {
      if (regexContainsChar.test(max)) {
        return text;
      } else {
        return `maximum ${max} ${symbol}`;
      }
    } else if (min && max) {
      if (regexContainsChar.test(min) && regexContainsChar.test(max)) {
        return text;
      } else if (regexContainsChar.test(min)) {
        return `maximum ${max} ${symbol}`;
      } else if (regexContainsChar.test(max)) {
        return `minimum ${min} ${symbol}`;
      } else {
        return `${min} à ${max} ${symbol}`;
      }
    }
  };

  return (
    <div className='my-5 sm:m-5'>
      {/* Mobile */}
      <div>
        <div className='md:hidden flex justify-start'>
          <button
            className='border px-3 py-1 rounded-lg'
            onClick={() => setISMobileFilterOpen(true)}>
            Filtrer
          </button>
        </div>
        {isMobileFilterOpen && (
          <div className='md:hidden fixed overflow-scroll z-50 inset-0 p-10 w-full h-full bg-black'>
            <div className='flex justify-end'>
              <button
                className='text-md gap-5 border rounded-xl p-2 hover:bg-gray-700'
                onClick={() => setISMobileFilterOpen(false)}>
                Fermer [X]
              </button>
            </div>
            <p className='mt-5 mb-7 text-xl'>Affinez votre recherche</p>
            <BasicSearch
              refListing={refListing}
              handleInputChange={handleInputChange}
              transaction={transaction}
              typeDeBien={typeDeBien}
              quartier={quartier}
              ville={ville}
              codePostal={codePostal}
              nbPieces={nbPieces}
            />
            <AdvancedSearch
              nbRooms={nbRooms}
              equipementsInt={equipementsInt}
              equipementsExt={equipementsExt}
              handleInputChange={handleInputChange}
              nbChambres={nbChambres}
              closeAllCards={closeAllCards}
              minSurfaceExt={minSurfaceExt}
              maxSurfaceExt={maxSurfaceExt}
              exposition={exposition}
              nbSDB={nbSDB}
              typeChauffage={typeChauffage}
            />
            <div className='mt-10'>
              <button
                onClick={closeAllCards}
                className='border-b border-b-transparent hover:border-b hover:border-white text-xl font-bold'>
                - Valider -
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop*/}
      <div
        className='hidden md:flex md:flex-wrap border rounded-xl p-5 shadow-xl shadow-black'
        ref={ref}>
        <div className='flex flex-wrap gap-5 items-center m-5 md:flex-auto '>
          <div className=''>
            <button
              className={`${
                isCardOpen.refListing && 'bg-blue-700'
              } px-3 py-1 border capitalize rounded-lg`}
              name='refListing'
              value={refListing}
              onClick={openCloseCard}>
              {refListing ? refListing : 'Référence Annonce'}
            </button>
            {isCardOpen.refListing && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='refListing'
                resetValue=''
                closeAllCards={closeAllCards}>
                <p className='text-center font-bold'>
                  Vous avez une référence d'annonce ?
                </p>
                <div className='flex gap-3 m-3'>
                  <FilterText
                    name='refListing'
                    value={refListing}
                    handleInputChange={handleInputChange}
                    placeholder=''
                    symbol=''
                  />
                </div>
              </FilterCard>
            )}
          </div>

          <div className=''>
            <button
              className={`${
                isCardOpen.transaction && 'bg-blue-700'
              } px-3 py-1 border capitalize rounded-lg`}
              name='transaction'
              value={transaction}
              onClick={openCloseCard}>
              {transaction === 'vente' ? 'Acheter' : 'Louer'}
            </button>
            {isCardOpen.transaction && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='transaction'
                resetValue='vente'
                closeAllCards={closeAllCards}>
                <p className='text-center font-bold'>Vous souhaitez ?</p>
                <div className='flex gap-3 m-3'>
                  <FilterButton
                    name='transaction'
                    value='vente'
                    displayName='Acheter'
                    handleInputChange={handleInputChange}
                    classCheck={transaction === 'vente'}
                  />
                  <FilterButton
                    name='transaction'
                    value='location'
                    displayName='Louer'
                    handleInputChange={handleInputChange}
                    classCheck={transaction === 'location'}
                  />
                </div>
              </FilterCard>
            )}
          </div>

          <div>
            <button
              className={`${
                isCardOpen.typeDeBien && 'bg-blue-700'
              } px-3 py-1 border capitalize rounded-lg`}
              name='typeDeBien'
              value={typeDeBien}
              onClick={openCloseCard}>
              {typeDeBien?.length > 0
                ? checkArrayString(typeDeBien)
                : 'Type(s) de bien'}
            </button>
            {isCardOpen.typeDeBien && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='typeDeBien'
                resetValue={[]}
                closeAllCards={closeAllCards}>
                <p className='text-center font-bold'>
                  Quel(s) type(s) de bien ?
                </p>
                <div className='flex mt-5 flex-wrap gap-5'>
                  {listTypeDeBien.map((type) => {
                    const { id, name, label } = type;
                    return (
                      <FilterCheckbox
                        key={id}
                        name='typeDeBien'
                        value={name}
                        label={label}
                        handleInputChange={handleInputChange}
                        isChecked={typeDeBien?.includes(name)}
                      />
                    );
                  })}
                </div>
              </FilterCard>
            )}
          </div>

          <div>
            <button
              className={`${
                isCardOpen.localisation && 'bg-blue-700'
              } px-3 py-1 border capitalize rounded-lg`}
              name='localisation'
              onClick={openCloseCard}>
              {quartier || ville || codePostal
                ? `${quartier} ${ville} ${codePostal}`
                : 'Localisation'}
            </button>
            {isCardOpen.localisation && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='localisation'
                resetValue=''
                closeAllCards={closeAllCards}>
                <p className='text-center font-bold'>À quel endroit ?</p>
                <div className='flex gap-5 my-5'>
                  <FilterText
                    name='quartier'
                    value={quartier}
                    handleInputChange={handleInputChange}
                    placeholder='Quartier'
                    symbol=''
                  />
                  <FilterText
                    name='ville'
                    value={ville}
                    handleInputChange={handleInputChange}
                    placeholder='Ville'
                    symbol=''
                  />
                  <FilterText
                    name='codePostal'
                    value={codePostal}
                    handleInputChange={handleInputChange}
                    placeholder='Code Postal'
                    symbol=''
                  />
                </div>
              </FilterCard>
            )}
          </div>

          <div>
            <button
              className={`${
                isCardOpen.prix && 'bg-blue-700'
              } px-3 py-1 border capitalize rounded-lg`}
              name='prix'
              value='prix'
              onClick={openCloseCard}>
              {renderNumberTextOnly('Prix min/max', minPrice, maxPrice, '€')}
            </button>
            {isCardOpen.prix && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='prix'
                resetValue=''
                closeAllCards={closeAllCards}>
                <p className='text-center font-bold'>Quel est votre budget ?</p>
                <div className='flex gap-3 my-3'>
                  <FilterText
                    name='minPrice'
                    value={minPrice}
                    placeholder='minimum'
                    symbol='€'
                    handleInputChange={handleInputChange}
                  />
                  <FilterText
                    name='maxPrice'
                    value={maxPrice}
                    placeholder='maximum'
                    symbol='€'
                    handleInputChange={handleInputChange}
                  />
                </div>
              </FilterCard>
            )}
          </div>

          <div>
            <button
              className={`${
                isCardOpen.surfaceInt && 'bg-blue-700'
              } px-3 py-1 border capitalize rounded-lg`}
              name='surfaceInt'
              value='surfaceInt'
              onClick={openCloseCard}>
              {renderNumberTextOnly(
                'Surface min/max',
                minSurfaceInt,
                maxSurfaceInt,
                'm2'
              )}
            </button>
            {isCardOpen.surfaceInt && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='surfaceInt'
                resetValue=''
                closeAllCards={closeAllCards}>
                <p className='text-center font-bold'>
                  Quelle surface Intérieure ?
                </p>
                <div className='flex gap-3 my-3'>
                  <FilterText
                    name='minSurfaceInt'
                    value={minSurfaceInt}
                    placeholder='minimum'
                    symbol='m2'
                    handleInputChange={handleInputChange}
                  />

                  <FilterText
                    name='maxSurfaceInt'
                    value={maxSurfaceInt}
                    placeholder='maximum'
                    symbol='m2'
                    handleInputChange={handleInputChange}
                  />
                </div>
              </FilterCard>
            )}
          </div>

          <div>
            <button
              className={`${
                isCardOpen.nbPieces && 'bg-blue-700'
              } px-3 py-1 border capitalize rounded-lg`}
              name='nbPieces'
              onClick={openCloseCard}>
              {renderRoomNumberText(nbPieces, 'pièce')}
            </button>
            {isCardOpen.nbPieces && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='nbPieces'
                resetValue=''
                closeAllCards={closeAllCards}>
                <p className='text-center font-bold'>Combien de pièces ?</p>
                <div className='flex flex-wrap gap-3 my-3'>
                  {nbRooms.map((nb) => {
                    return (
                      <button
                        key={nb}
                        id='filter-input'
                        name='nbPieces'
                        value={nb}
                        onClick={(e) => handleInputChange(e)}
                        className={
                          nbPieces?.includes(nb)
                            ? 'border px-3 py-1 rounded-lg bg-gray-600'
                            : 'border px-3 py-1 rounded-lg'
                        }>
                        {nb !== '6' ? nb : '6 +'}
                      </button>
                    );
                  })}
                </div>
              </FilterCard>
            )}
          </div>
        </div>

        <div className='flex justify-end w-full'>
          <button
            className='text-red-500 border-b border-b-transparent hover:border-b-red-500'
            name='rechercheAvancee'
            value='rechercheAvancee'
            onClick={openCloseCard}>
            Recherche Avancée
          </button>
          {isCardOpen.rechercheAvancee && (
            <div className='absolute w-1/2 right-0 border p-4 mt-4 mr-2 z-50 rounded-xl bg-sky-950'>
              <p className='text-center font-bold'>Affiner votre recherche</p>
              <AdvancedSearch
                nbRooms={nbRooms}
                equipementsInt={equipementsInt}
                equipementsExt={equipementsExt}
                handleInputChange={handleInputChange}
                nbChambres={nbChambres}
                closeAllCards={closeAllCards}
                minSurfaceExt={minSurfaceExt}
                maxSurfaceExt={maxSurfaceExt}
                exposition={exposition}
                nbSDB={nbSDB}
                typeChauffage={typeChauffage}
              />
              <div className='flex justify-end gap-10 mt-5'>
                <button
                  onClick={closeAllCards}
                  className='border-b border-b-transparent hover:border-b hover:border-white'>
                  Valider
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltersListingPage;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import FilterCard from './FilterCard';
import FilterButton from './FilterButton';
import FilterCheckbox from './FilterCheckbox';

const FiltersListingPage = ({ valuesQueries, handleInputChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const regexMixCharNumb = /^(?=.*[a-zA-Z])(?=.*\d).*$/;
  const regexContainsChar = /[a-zA-Z]/;
  const {
    transaction,
    statut,
    quartier,
    ville,
    codePostal,
    typeDeBien,
    minPrice,
    maxPrice,
    minSurfaceInt,
    maxSurfaceInt,
    minSurfaceExt,
    nbPieces,
    nbChambres,
    nbSDB,
    typeChauffage,
    equipements,
    exposition,
    sort,
    limit,
  } = valuesQueries;

  const initialCardsState = {
    transaction: false,
    typeDeBien: false,
    localisation: false,
    prix: false,
    surfaceInt: false,
    nbPieces: false,
    rechercheAvancee: false,
  };

  const NbRooms = ['1', '2', '3', '4', '5', '6'];

  const [isCardOpen, setIsCardOpen] = useState(initialCardsState);

  const openCloseCard = (e) => {
    const { name } = e.target;
    const data = {
      ...initialCardsState,
      [name]: !isCardOpen[name],
    };
    setIsCardOpen(data);
  };

  const closeAllCards = () => {
    setIsCardOpen(initialCardsState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      closeAllCards();
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const renderRoomNumberText = (
    arrayNumberRoom: string[],
    typeOfRoom: string
  ) => {
    if (arrayNumberRoom.length > 0) {
      if (arrayNumberRoom.length === 1 && arrayNumberRoom.includes('1')) {
        return `${arrayNumberRoom} ${typeOfRoom}`;
      } else if (
        arrayNumberRoom.length === 1 &&
        !arrayNumberRoom.includes('1')
      ) {
        return `${arrayNumberRoom} ${typeOfRoom}s`;
      } else {
        if (!arrayNumberRoom.includes('6')) {
          return `${arrayNumberRoom.sort().join(', ')} ${typeOfRoom}s`;
        } else if (arrayNumberRoom.includes('6')) {
          return `${arrayNumberRoom.sort().join(', ')} ${typeOfRoom}s et +`;
        }
      }
    } else {
      return 'Nombre de Pièces';
    }
  };

  const renderNumberTextOnly = (text: string, min: string, max: string) => {
    if (!min && !max) {
      return text;
    } else if (min && !max) {
      if (regexContainsChar.test(min)) {
        return text;
      } else {
        return `A partir de ${min}€`;
      }
    } else if (!min && max) {
      if (regexContainsChar.test(max)) {
        return text;
      } else {
        return `maximum ${max}`;
      }
    } else if (min && max) {
      if (regexContainsChar.test(min) && regexContainsChar.test(max)) {
        return text;
      } else if (regexContainsChar.test(min)) {
        return `maximum ${max}`;
      } else if (regexContainsChar.test(max)) {
        return `minimum ${min}`;
      } else {
        return `${min} à ${max}`;
      }
    }
  };

  return (
    <div className='m-5'>
      {/* Mobile */}
      <div>
        <div className='md:hidden flex justify-end gap-5'>
          <button className='border px-2 rounded-lg'>Filtrer</button>
          <div>
            <button className='border px-2 rounded-lg'>Plus récent </button>
            {/* dropDown for sorting */}
          </div>
        </div>

        {/* Modal with filters */}
      </div>

      {/* Desktop*/}
      <div className='relative' ref={ref}>
        <div className='hidden md:flex m-5 md:flex-auto justify-between border gap-5 rounded-xl p-5 shadow-xl shadow-black'>
          <div>
            <button
              className='px-3 py-1 border rounded-lg'
              name='transaction'
              value={transaction}
              onClick={(e) => openCloseCard(e)}>
              {transaction === 'vente' ? 'Acheter' : 'Louer'}
            </button>
            {isCardOpen.transaction && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='transaction'
                resetValue='vente'
                title='Vous souhaitez ?'
                closeAllCards={closeAllCards}>
                <div className='flex gap-3 my-3'>
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
              className='px-3 py-1 border rounded-lg'
              name='typeDeBien'
              value={typeDeBien}
              onClick={(e) => openCloseCard(e)}>
              {typeDeBien.length > 0
                ? typeDeBien.join(', ')
                : 'Type(s) de bien'}
            </button>
            {isCardOpen.typeDeBien && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='typeDeBien'
                resetValue={[]}
                title='Quel(s) type(s) de bien ?'
                closeAllCards={closeAllCards}>
                <div className='flex gap-5'>
                  <FilterCheckbox
                    name='typeDeBien'
                    value='maison'
                    handleInputChange={handleInputChange}
                    isChecked={typeDeBien.includes('maison')}
                  />
                  <FilterCheckbox
                    name='typeDeBien'
                    value='appartement'
                    handleInputChange={handleInputChange}
                    isChecked={typeDeBien.includes('appartement')}
                  />
                </div>
              </FilterCard>
            )}
          </div>

          <div>
            <button
              className='px-3 py-1 border rounded-lg'
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
                title='A quel endroit ?'
                closeAllCards={closeAllCards}>
                <div className='relative flex gap-5 my-5'>
                  <input
                    type='text'
                    id='filter-input'
                    name='quartier'
                    value={quartier}
                    onChange={(e) => handleInputChange(e)}
                    className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Quartier'
                  />
                  <input
                    type='text'
                    id='filter-input'
                    name='ville'
                    value={ville}
                    onChange={(e) => handleInputChange(e)}
                    className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Ville'
                  />
                  <input
                    type='text'
                    id='filter-input'
                    name='codePostal'
                    value={codePostal}
                    onChange={(e) => handleInputChange(e)}
                    className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Code Postal'
                  />
                </div>
              </FilterCard>
            )}
          </div>

          <div>
            <button
              className='px-3 py-1 border rounded-lg'
              name='prix'
              value='prix'
              onClick={openCloseCard}>
              {renderNumberTextOnly('Prix min/max', minPrice, maxPrice)}
            </button>
            {isCardOpen.prix && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='prix'
                resetValue=''
                title='Quel est votre budget ?'
                closeAllCards={closeAllCards}>
                <div className='flex gap-3 my-3'>
                  <div className='relative mb-6'>
                    <input
                      type='text'
                      id='filter-input'
                      name='minPrice'
                      value={minPrice}
                      onChange={(e) => handleInputChange(e)}
                      min={0}
                      className='border text-sm rounded-lg block w-full pr-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                      placeholder='minimum'
                    />
                    <div className='absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none'>
                      <span className='w-5 h-5'>€</span>
                    </div>
                  </div>
                  <div className='relative mb-6'>
                    <input
                      type='text'
                      id='filter-input'
                      name='maxPrice'
                      value={maxPrice}
                      onChange={(e) => handleInputChange(e)}
                      min={0}
                      className='border text-sm rounded-lg block w-full pr-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                      placeholder='maximum'
                    />
                    <div className='absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none'>
                      <span className='w-5 h-5'>€</span>
                    </div>
                  </div>
                </div>
              </FilterCard>
            )}
          </div>

          <div>
            <button
              className='px-3 py-1 border rounded-lg'
              name='surfaceInt'
              value='surfaceInt'
              onClick={openCloseCard}>
              {renderNumberTextOnly(
                'Surface min/max',
                minSurfaceInt,
                maxSurfaceInt
              )}
            </button>
            {isCardOpen.surfaceInt && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='surfaceInt'
                resetValue=''
                title='Quelle surface Intérieure ?'
                closeAllCards={closeAllCards}>
                <div className='flex gap-3 my-3'>
                  <div className='relative mb-6'>
                    <input
                      type='text'
                      id='filter-input'
                      name='minSurfaceInt'
                      value={minSurfaceInt}
                      onChange={(e) => handleInputChange(e)}
                      min={0}
                      className='border text-sm rounded-lg block w-full pr-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                      placeholder='minimum'
                    />
                    <div className='absolute inset-y-0 right-3 flex items-center pl-3 pointer-events-none'>
                      <span className='w-5 h-5'>m2</span>
                    </div>
                  </div>
                  <div className='relative mb-6'>
                    <input
                      type='text'
                      id='filter-input'
                      name='maxSurfaceInt'
                      value={maxSurfaceInt}
                      onChange={(e) => handleInputChange(e)}
                      min={0}
                      className='border text-sm rounded-lg block w-full pr-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                      placeholder='maximum'
                    />
                    <div className='absolute inset-y-0 right-3 flex items-center pl-3 pointer-events-none'>
                      <span className='w-5 h-5'>m2</span>
                    </div>
                  </div>
                </div>
              </FilterCard>
            )}
          </div>

          <div>
            <button
              className='px-3 py-1 border rounded-lg'
              name='nbPieces'
              onClick={(e) => openCloseCard(e)}>
              {renderRoomNumberText(nbPieces, 'pièce')}
            </button>
            {isCardOpen.nbPieces && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='nbPieces'
                resetValue=''
                title='Combien de pièces ?'
                closeAllCards={closeAllCards}>
                <div className='flex gap-2 my-3'>
                  {NbRooms.map((nb) => {
                    return (
                      <button
                        id='filter-input'
                        name='nbPieces'
                        value={nb}
                        onClick={(e) => handleInputChange(e)}
                        className={
                          nbPieces.includes(nb)
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

          <div>
            <button
              className='px-3 py-1 text-red-500'
              name='rechercheAvancee'
              value='rechercheAvancee'
              onClick={openCloseCard}>
              Recherche Avancée
            </button>
            {isCardOpen.rechercheAvancee && <div>Card with the rest</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersListingPage;

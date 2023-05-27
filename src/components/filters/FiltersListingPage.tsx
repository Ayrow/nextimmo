'use client';

import React, { useEffect, useRef, useState } from 'react';
import FilterCard from './FilterCard';

const FiltersListingPage = ({ valuesQueries, handleInputChange }) => {
  const ref = useRef<HTMLDivElement>(null);
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
    prix: false,
  };

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
                value='vente'
                title='Vous souhaitez ?'
                closeAllCards={closeAllCards}>
                <div className='flex gap-3 my-3'>
                  <button
                    id='filter-input'
                    name='transaction'
                    value='vente'
                    onClick={(e) => handleInputChange(e)}
                    className={
                      transaction == 'vente'
                        ? 'border m-2 p-5 rounded-lg bg-gray-600'
                        : 'border m-2 p-5 rounded-lg'
                    }>
                    Acheter
                  </button>
                  <button
                    id='filter-input'
                    name='transaction'
                    value='location'
                    onClick={(e) => handleInputChange(e)}
                    className={
                      transaction == 'location'
                        ? 'border m-2 p-5 rounded-lg bg-gray-600'
                        : 'border m-2 p-5 rounded-lg'
                    }>
                    Louer
                  </button>
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
                value=''
                title='Quel(s) type(s) de bien ?'
                closeAllCards={closeAllCards}>
                <div className='flex gap-5'>
                  <div className='flex my-3 items-center'>
                    <input
                      type='checkbox'
                      id='filter-input'
                      name='typeDeBien'
                      value='maison'
                      onClick={(e) => handleInputChange(e)}
                      checked={typeDeBien.includes('maison')}
                      className='border m-2 p-5 rounded-lg'
                    />
                    <label>Maison</label>
                  </div>
                  <div className='flex my-3 items-center'>
                    <input
                      type='checkbox'
                      id='filter-input'
                      name='typeDeBien'
                      value='appartement'
                      onClick={(e) => handleInputChange(e)}
                      className='border m-2 p-5 rounded-lg'
                      checked={typeDeBien.includes('appartement')}
                    />
                    <label>Appartement</label>
                  </div>
                </div>
              </FilterCard>
            )}
          </div>

          <button className='px-3 py-1 border rounded-lg'>Localisation</button>

          <div>
            <button
              className='px-3 py-1 border rounded-lg'
              name='prix'
              value='prix'
              onClick={(e) => openCloseCard(e)}>
              Prix min/max
            </button>
            {isCardOpen.prix && (
              <FilterCard
                handleInputChange={handleInputChange}
                name='prix'
                value='prix'
                title='Quel est votre budget ?'
                closeAllCards={closeAllCards}>
                <div className='flex gap-3 my-3'>
                  <div className='relative mb-6'>
                    <input
                      type='text'
                      id='filter-input'
                      name='minPrice'
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

          <button className='px-3 py-1 border rounded-lg'>Surface</button>
          <button className='px-3 py-1 border rounded-lg'>Pièces</button>
          <button className='px-3 py-1 text-red-500'>Recherche Avancée</button>
        </div>
        {/* Modal for each button */}
      </div>
    </div>
  );
};

export default FiltersListingPage;

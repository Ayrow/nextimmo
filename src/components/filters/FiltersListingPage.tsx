'use client';

import React, { useEffect, useRef, useState } from 'react';
import FilterCard from './FilterCard';
import FilterButton from './FilterButton';
import FilterCheckbox from './FilterCheckbox';
import FilterText from './FilterText';
import AdvancedSearchCardDesktop from './AdvancedSearchCardDesktop';

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
    maxSurfaceExt,
    nbPieces,
    nbChambres,
    nbSDB,
    typeChauffage,
    equipementsInt,
    equipementsExt,
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

  const nbRooms = ['1', '2', '3', '4', '5', '6'];
  const allTypesDeBien = [
    'maison',
    'appartement',
    'terrain',
    'immeuble',
    'parking',
    'garage',
    'bureau',
  ];
  const allEquipementsInt = [
    'cave',
    'garage',
    'veranda',
    'ascenseur',
    'plain Pied',
    'accessibilité PMR',
    'digiCode',
    'alarme',
    'interphone',
    'cheminée',
    'climatisation',
    'gardien',
    'toilette Séparé',
    'cuisine Équipée',
  ];

  const allEquipementsExt = [
    'balcon',
    'terrasse',
    'piscine',
    'jardin',
    'stationnement',
    'portail',
  ];

  const allTypesChauffage = [
    'gaz',
    'fioul',
    'electrique',
    'solaire',
    'bois',
    'pac',
  ];
  const allExpositions = [
    'nord',
    'sud',
    'est',
    'ouest',
    'vue Mer',
    'proche Mer',
  ];

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
        <div className='hidden md:flex md:flex-wrap m-5 md:flex-auto justify-between border gap-5 rounded-xl p-5 shadow-xl shadow-black'>
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
                <div className='flex flex-wrap gap-5'>
                  {allTypesDeBien.map((type) => {
                    return (
                      <FilterCheckbox
                        key={type}
                        name='typeDeBien'
                        value={`${type}`}
                        handleInputChange={handleInputChange}
                        isChecked={typeDeBien.includes(`${type}`)}
                      />
                    );
                  })}
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
                  <FilterText
                    name='quartier'
                    value={quartier}
                    handleInputChange={handleInputChange}
                    placeholder='quartier'
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
              className='px-3 py-1 border rounded-lg'
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
                title='Quel est votre budget ?'
                closeAllCards={closeAllCards}>
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
              className='px-3 py-1 border rounded-lg'
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
                title='Quelle surface Intérieure ?'
                closeAllCards={closeAllCards}>
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
                <div className='flex flex-wrap gap-3 my-3'>
                  {nbRooms.map((nb) => {
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
            {isCardOpen.rechercheAvancee && (
              <AdvancedSearchCardDesktop
                nbRooms={nbRooms}
                equipementsInt={equipementsInt}
                equipementsExt={equipementsExt}
                handleInputChange={handleInputChange}
                nbChambres={nbChambres}
                closeAllCards={closeAllCards}
                allEquipementsInt={allEquipementsInt}
                allEquipementsExt={allEquipementsExt}
                minSurfaceExt={minSurfaceExt}
                maxSurfaceExt={maxSurfaceExt}
                allExpositions={allExpositions}
                exposition={exposition}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersListingPage;

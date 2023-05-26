import React, { useEffect, useRef, useState } from 'react';

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
        <div className='hidden md:flex m-5 border justify-between rounded-xl p-5 shadow-xl shadow-black'>
          <div>
            <button
              className='px-3 py-1 border rounded-lg'
              name='transaction'
              value='Acheter'
              onClick={(e) => openCloseCard(e)}>
              {transaction === 'vente' ? 'Acheter' : 'Louer'}
            </button>
            {isCardOpen.transaction && (
              <div className='absolute border p-4 mt-4 z-50 rounded-xl bg-sky-950'>
                <p className='text-center font-bold'>Vous souhaitez?</p>
                <div className='flex gap-3 my-3'>
                  <button
                    id='filter-input'
                    name='transaction'
                    value='vente'
                    onClick={(e) => handleInputChange(e)}
                    className='border m-2 p-5 rounded-lg'>
                    Acheter
                  </button>
                  <button
                    id='filter-input'
                    name='transaction'
                    value='location'
                    onClick={(e) => handleInputChange(e)}
                    className='border m-2 p-5 rounded-lg'>
                    Louer
                  </button>
                </div>
                <div className='flex justify-between gap-10 mt-5'>
                  <button
                    name='transaction'
                    value='vente'
                    onClick={(e) => handleInputChange(e)}>
                    Réinitialiser
                  </button>
                  <button
                    onClick={closeAllCards}
                    className='border border-b-transparent hover:border-b-2 hover:border-white'>
                    Valider
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              className='px-3 py-1 border rounded-lg'
              name='typeDeBien'
              value='Type de Bien'
              onClick={(e) => openCloseCard(e)}>
              Type de Bien
            </button>
            {isCardOpen.typeDeBien && (
              <div className='absolute border p-4 flex gap-3 mt-4 z-50 rounded-xl bg-sky-950'>
                <p>Quel(s) type(s) de bien(s)?</p>
                <div></div>
              </div>
            )}
          </div>

          <button className='px-3 py-1 border rounded-lg'>Localisation</button>
          <button className='px-3 py-1 border rounded-lg'>Prix</button>
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

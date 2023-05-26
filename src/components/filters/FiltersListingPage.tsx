import React, { useEffect, useRef, useState } from 'react';

const FiltersListingPage = ({ valuesQueries, setValuesQueries }) => {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      setIsCardOpen(initialCardsState);
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
              {transaction}
            </button>
            {isCardOpen.transaction && (
              <div className='absolute border p-4 flex gap-3 mt-4 z-50 rounded-xl bg-sky-950'>
                <button>Acheter</button>
                <button>Louer</button>
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
                <button>Acheter</button>
                <button>Louer</button>
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

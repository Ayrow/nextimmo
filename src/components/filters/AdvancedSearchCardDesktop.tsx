'use client';

import { useState } from 'react';

const AdvancedSearchCardDesktop = ({
  nbRooms,
  allEquipementsInt,
  allEquipementsExt,
  equipementsInt,
  equipementsExt,
  handleInputChange,
  nbChambres,
  closeAllCards,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className='absolute w-1/2 right-0 border p-4 mt-4 mr-2 z-50 rounded-xl bg-sky-950'>
      <p className='text-center font-bold'>Affiner votre recherche</p>
      <div>
        <p className='font-bold my-3'>Combien de Chambres?</p>
        <div className='flex gap-2'>
          {nbRooms.map((nb) => {
            return (
              <button
                id='filter-input'
                name='nbChambres'
                value={nb}
                onClick={handleInputChange}
                className={
                  nbChambres.includes(nb)
                    ? 'border px-3 py-1 rounded-lg bg-gray-600'
                    : 'border px-3 py-1 rounded-lg'
                }>
                {nb !== '6' ? nb : '6 +'}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className='font-bold my-5'>Quels équipements?</p>
        <div className='flex flex-wrap gap-5'>
          {allEquipementsInt.map((equipement) => {
            return (
              <button
                id='filter-input'
                name='equipementsInt'
                value={equipement.replace(/\s/g, '').replace('é', 'e')}
                onClick={handleInputChange}
                className={
                  equipementsInt.includes(
                    `${equipement}`.replace(/\s/g, '').replace('é', 'e')
                  )
                    ? 'border p-2 rounded-lg text-sm bg-gray-600 capitalize'
                    : 'border p-2 text-sm rounded-lg capitalize'
                }>
                {`${equipement}`}
              </button>
            );
          })}
        </div>
        <div className='flex flex-wrap mt-5 gap-5'>
          {showMore &&
            allEquipementsExt.map((equipement) => {
              return (
                <button
                  id='filter-input'
                  name='equipementsExt'
                  value={equipement}
                  onClick={handleInputChange}
                  className={
                    equipementsExt.includes(`${equipement}`)
                      ? 'border p-2 rounded-lg text-sm bg-gray-600 capitalize'
                      : 'border p-2 text-sm rounded-lg capitalize'
                  }>
                  {`${equipement}`}
                </button>
              );
            })}
        </div>
        <button className='my-5' onClick={() => setShowMore(!showMore)}>
          {showMore ? '- Voir Moins' : '+ Voir Plus'}
        </button>
      </div>

      <div className='flex justify-end gap-10 mt-5'>
        <button
          onClick={closeAllCards}
          className='border-b border-b-transparent hover:border-b hover:border-white'>
          Valider
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearchCardDesktop;

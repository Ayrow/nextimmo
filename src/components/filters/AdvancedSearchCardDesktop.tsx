'use client';

import { useState } from 'react';
import FilterText from './FilterText';
import FilterCheckbox from './FilterCheckbox';

const AdvancedSearchCardDesktop = ({
  nbRooms,
  allEquipementsInt,
  allEquipementsExt,
  equipementsInt,
  equipementsExt,
  handleInputChange,
  nbChambres,
  closeAllCards,
  minSurfaceExt,
  maxSurfaceExt,
  allExpositions,
  exposition,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className='absolute w-1/2 right-0 border p-4 mt-4 mr-2 z-50 rounded-xl bg-sky-950'>
      <p className='text-center font-bold'>Affiner votre recherche</p>
      <div>
        <p className='font-bold my-3'>Combien de Chambres?</p>
        <div className='flex gap-2'>
          {nbRooms.map((nb: string) => {
            return (
              <button
                key={nb}
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
          {allEquipementsInt.map((equipement: string) => {
            return (
              <button
                key={equipement}
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
            allEquipementsExt.map((equipement: string) => {
              return (
                <button
                  key={equipement}
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

        <button className='' onClick={() => setShowMore(!showMore)}>
          {showMore ? '- Voir Moins' : '+ Voir Plus'}
        </button>
      </div>

      <div>
        <p className='font-bold my-5'>Quelle surface de terrain?</p>

        <div className='flex gap-3 my-3'>
          <FilterText
            name='minSurfaceExt'
            value={minSurfaceExt}
            placeholder='minimum'
            symbol='m2'
            handleInputChange={handleInputChange}
          />

          <FilterText
            name='maxSurfaceExt'
            value={maxSurfaceExt}
            placeholder='maximum'
            symbol='m2'
            handleInputChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <p className='font-bold my-5'>Quelle exposition?</p>

        <div>
          <div className='flex flex-wrap gap-5'>
            {allExpositions.map((singleExp) => {
              return (
                <FilterCheckbox
                  key={singleExp}
                  name='exposition'
                  value={`${singleExp}`}
                  handleInputChange={handleInputChange}
                  isChecked={exposition.includes(singleExp.replace(/\s/g, ''))}
                />
              );
            })}
          </div>
        </div>
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

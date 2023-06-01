'use client';

import { useState } from 'react';
import FilterText from './FilterText';
import FilterCheckbox from './FilterCheckbox';
import {
  ListingDetailsTypes,
  listEquipementsExterieur,
  listEquipementsInterieur,
  listExpositionsBien,
} from '../../../utils/listingDetails';

const AdvancedSearchCardDesktop = ({
  nbRooms,
  equipementsInt,
  equipementsExt,
  handleInputChange,
  nbChambres,
  closeAllCards,
  minSurfaceExt,
  maxSurfaceExt,
  exposition,
  nbSDB,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className='absolute w-1/2 right-0 border p-4 mt-4 mr-2 z-50 rounded-xl bg-sky-950'>
      <p className='text-center font-bold'>Affiner votre recherche</p>
      <div>
        <p className='font-bold my-3'>Combien de Chambres ?</p>
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
        <p className='font-bold my-3'>Combien de Salle de bain / eau ?</p>
        <div className='flex gap-2'>
          {nbRooms.map((nb: string) => {
            return (
              <button
                key={nb}
                id='filter-input'
                name='nbSDB'
                value={nb}
                onClick={handleInputChange}
                className={
                  nbSDB.includes(nb)
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
          {listEquipementsInterieur.map((equipement) => {
            const { id, name, label } = equipement;
            return (
              <button
                key={id}
                id='filter-input'
                name='equipementsInt'
                value={name.replace(/\s/g, '').replace('é', 'e')}
                onClick={handleInputChange}
                className={
                  equipementsInt.includes(
                    `${equipement}`.replace(/\s/g, '').replace('é', 'e')
                  )
                    ? 'border p-2 rounded-lg text-sm bg-gray-600 capitalize'
                    : 'border p-2 text-sm rounded-lg capitalize'
                }>
                {`${label}`}
              </button>
            );
          })}
        </div>
        <div className='flex flex-wrap mt-5 gap-5'>
          {showMore &&
            listEquipementsExterieur.map((equipement) => {
              const { id, name, label } = equipement;
              return (
                <button
                  key={id}
                  id='filter-input'
                  name='equipementsExt'
                  value={name}
                  onClick={handleInputChange}
                  className={
                    equipementsExt.includes(`${name}`)
                      ? 'border p-2 rounded-lg text-sm bg-gray-600 capitalize'
                      : 'border p-2 text-sm rounded-lg capitalize'
                  }>
                  {`${label}`}
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
            {listExpositionsBien.map((singleExp) => {
              const { id, label } = singleExp;
              return (
                <FilterCheckbox
                  key={id}
                  name='exposition'
                  value={`${label}.replace(/\s/g, '')`}
                  handleInputChange={handleInputChange}
                  isChecked={exposition.includes(label.replace(/\s/g, ''))}
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

'use client';

import { useState } from 'react';
import FilterText from './FilterText';
import FilterCheckbox from './FilterCheckbox';
import {
  listEquipementsExterieur,
  listEquipementsInterieur,
  listExpositionsBien,
  listTypeChauffage,
} from '../../../utils/listingDetails';

const AdvancedSearch = ({
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
  typeChauffage,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className='flex flex-col gap-10'>
      <div className='mt-10'>
        <p className='font-bold mb-3'>Combien de Chambres ?</p>
        <div className='flex gap-3'>
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
        <p className='font-bold mb-3'>Combien de Salle de bain / eau ?</p>
        <div className='flex gap-3'>
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
        <p className='font-bold mb-3'>Quels équipements?</p>
        <div className='flex flex-wrap gap-3'>
          {listEquipementsExterieur.map((equipement) => {
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
          {showMore &&
            listEquipementsInterieur.map((equipement) => {
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

        <button className='mt-5' onClick={() => setShowMore(!showMore)}>
          {showMore ? '- Voir Moins' : '+ Voir Plus'}
        </button>
      </div>

      <div className=''>
        <p className='font-bold mb-3'>Quelle surface de terrain?</p>

        <div className='flex gap-3'>
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

      <div className=''>
        <p className='font-bold mb-3'>Quelle exposition?</p>
        <div>
          <div className='flex flex-wrap gap-5'>
            {listExpositionsBien.map((singleExp) => {
              const { id, name, label } = singleExp;
              return (
                <FilterCheckbox
                  key={id}
                  name='exposition'
                  value={name}
                  label={label}
                  handleInputChange={handleInputChange}
                  isChecked={exposition.includes(name)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className=''>
        <p className='font-bold mb-3'>Quel type de chauffage ?</p>

        <div className='flex flex-wrap gap-5'>
          {listTypeChauffage.map((element) => {
            const { id, label, name } = element;
            return (
              <FilterCheckbox
                key={id}
                name='typeChauffage'
                value={name}
                label={label}
                handleInputChange={handleInputChange}
                isChecked={typeChauffage.includes(name)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;

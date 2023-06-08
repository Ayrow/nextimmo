'use client';

import { useState } from 'react';
import FilterButton from './filters/FilterButton';
import FilterText from './filters/FilterText';
import { listTypeDeBien, queryParams } from '../../utils/listingDetails';
import FilterCheckbox from './filters/FilterCheckbox';
import Link from 'next/link';
import {
  EventTargetType,
  HandleInputChangeType,
} from '../../types/functionTypes';

const BasicHomepageSearch: React.FC = () => {
  const [valuesQueries, setValuesQueries] = useState(queryParams);

  const handleInputChange: HandleInputChangeType = (event) => {
    const { name, value } = event.target as EventTargetType;
    if (name === 'typeDeBien' && value !== '') {
      const newValue = value.replace(/\s/g, '').replace('é', 'e');

      let newArray: string[];
      if (valuesQueries[name] === '') {
        newArray = [];
      } else if (
        typeof valuesQueries[name] === 'string' &&
        valuesQueries[name] !== ''
      ) {
        newArray.push(valuesQueries[name] as string);
      } else {
        newArray = valuesQueries[name] as string[];
      }

      if (valuesQueries[name].includes(newValue)) {
        newArray = newArray.filter((item) => item !== newValue);
      } else {
        if (valuesQueries[name]) {
          newArray.push(newValue);
        }
      }
      setValuesQueries((prevValuesQueries) => ({
        ...prevValuesQueries,
        [name]: newArray,
      }));
    } else if (name === 'localisation') {
      setValuesQueries((prevValuesQueries) => ({
        ...prevValuesQueries,
        quartier: value,
        ville: value,
        codePostal: value,
      }));
    } else {
      setValuesQueries((prevValuesQueries) => ({
        ...prevValuesQueries,
        [name]: value,
      }));
    }
  };

  return (
    <div className='border p-5 rounded-xl shadow-lg bg-sky-900 shadow-gray-900 flex flex-col items-center gap-5'>
      <div className='flex justify-center gap-3'>
        <FilterButton
          handleInputChange={handleInputChange}
          name='transaction'
          value='vente'
          displayName='Acheter'
          classCheck={valuesQueries.transaction === 'vente'}
        />
        <FilterButton
          handleInputChange={handleInputChange}
          name='transaction'
          value='location'
          displayName='Louer'
          classCheck={valuesQueries.transaction === 'location'}
        />
      </div>
      <div className='flex flex-col sm:flex-row gap-3'>
        <FilterText
          name='quartier'
          value={valuesQueries.quartier}
          placeholder='Quartier'
          handleInputChange={handleInputChange}
          symbol=''
        />
        <FilterText
          name='ville'
          value={valuesQueries.ville}
          placeholder='Ville'
          handleInputChange={handleInputChange}
          symbol=''
        />
        <FilterText
          name='codePostal'
          value={valuesQueries.codePostal}
          placeholder='Code Postal'
          handleInputChange={handleInputChange}
          symbol=''
        />
      </div>

      <div className='flex gap-3 flex-col sm:flex-row items-center'>
        <FilterText
          name='maxPrice'
          value={valuesQueries.maxPrice}
          placeholder='Prix maximum'
          handleInputChange={handleInputChange}
          symbol='€'
        />
        <FilterText
          name='minSurfaceInt'
          value={valuesQueries.minSurfaceInt}
          placeholder='Surface minimum'
          handleInputChange={handleInputChange}
          symbol='m2'
        />
      </div>

      <div className='flex flex-wrap gap-5'>
        {listTypeDeBien.map((element) => {
          return (
            <FilterCheckbox
              key={element.id}
              name='typeDeBien'
              value={element.name}
              label={element.label}
              isChecked={valuesQueries.typeDeBien.includes(element.name)}
              handleInputChange={handleInputChange}
            />
          );
        })}
      </div>
      <div className='flex items-center gap-10'>
        <Link
          href={{ pathname: '/annonces', query: valuesQueries }}
          className='border p-2 rounded-lg'>
          Rechercher
        </Link>
        <Link href='/recherche-avancee'>Recherche Avancée ⇒</Link>
      </div>
    </div>
  );
};

export default BasicHomepageSearch;

'use client';

import { useState } from 'react';
import AdvancedSearch from '../../components/filters/AdvancedSearch';
import BasicSearch from '../../components/filters/BasicSearch';
import { QueryParamsType } from '../annonces/page';
import { nbRooms } from '../../../utils/listingDetails';
import FilterText from '../../components/filters/FilterText';
import Link from 'next/link';

const queryParams: QueryParamsType = {
  transaction: 'vente',
  statut: 'disponible',
  quartier: '',
  ville: '',
  codePostal: '',
  typeDeBien: ['maison', 'appartement'],
  minPrice: '',
  maxPrice: '',
  minSurfaceInt: '',
  maxSurfaceInt: '',
  minSurfaceExt: '',
  maxSurfaceExt: '',
  nbPieces: [],
  nbChambres: [],
  nbSDB: '',
  typeChauffage: [],
  equipementsInt: [],
  equipementsExt: [],
  exposition: [],
  sort: 'plus récente',
  limit: 2,
  page: 1,
};

const RechercheAvancee = () => {
  const [valuesQueries, setValuesQueries] = useState(queryParams);

  const {
    transaction,
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
  } = valuesQueries;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (
      (name === 'typeDeBien' && value !== '') ||
      (name == 'equipementsInt' && value !== '') ||
      (name == 'equipementsExt' && value !== '') ||
      (name === 'nbPieces' && value !== '') ||
      (name === 'nbSDB' && value !== '') ||
      (name === 'nbChambres' && value !== '') ||
      (name === 'exposition' && value !== '') ||
      (name === 'typeChauffage' && value !== '')
    ) {
      const newValue = value.replace(/\s/g, '').replace('é', 'e');
      let newArray: string[] =
        valuesQueries[name] === '' ? [] : valuesQueries[name];
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
    <div className='m-10'>
      <h2 className='text-center text-xl font-bold my-10'>
        Recherche avancée pour votre futur bien
      </h2>
      <BasicSearch
        handleInputChange={handleInputChange}
        transaction={transaction}
        typeDeBien={typeDeBien}
        quartier={quartier}
        ville={ville}
        codePostal={codePostal}
        nbPieces={nbPieces}
      />
      <div className=' mt-10'>
        <p className='font-bold'>Quel est votre budget ?</p>
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
      </div>

      <div className=' mt-10'>
        <p className='font-bold'>Quelle surface Intérieure ?</p>
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
      </div>
      <AdvancedSearch
        nbRooms={nbRooms}
        equipementsInt={equipementsInt}
        equipementsExt={equipementsExt}
        handleInputChange={handleInputChange}
        nbChambres={nbChambres}
        closeAllCards=''
        minSurfaceExt={minSurfaceExt}
        maxSurfaceExt={maxSurfaceExt}
        exposition={exposition}
        nbSDB={nbSDB}
        typeChauffage={typeChauffage}
      />
      <div className=' mt-12'>
        <Link
          href={{ pathname: '/annonces', query: valuesQueries }}
          className=' border p-2 rounded-lg'>
          Rechercher
        </Link>
      </div>
    </div>
  );
};

export default RechercheAvancee;

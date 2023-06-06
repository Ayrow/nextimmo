'use client';

import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';

import { EventTargetType } from '../../../types/functionTypes';
import { useCloseOnOutsideClick } from '../../hooks/useCloseOnOutsideClick';
import FilterText from './FilterText';

const FiltersUsers = ({
  valuesQueries,
  handleFilterChange,
  sortOptions,
  isSortingDropdownOpen,
  setIsSortingDropdownOpen,
}: {
  valuesQueries: any;
  handleFilterChange: (MouseEvent) => void;
  sortOptions: string[];
  isSortingDropdownOpen: boolean;
  setIsSortingDropdownOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { username, email, role, sort } = valuesQueries;

  const [isMobileFilterOpen, setISMobileFilterOpen] = useState(false);

  const closeMobileFilter = () => {
    setISMobileFilterOpen(false);
  };

  const closeSortingDropdown = () => {
    setIsSortingDropdownOpen(false);
  };

  useCloseOnOutsideClick(closeSortingDropdown, ref);

  return (
    <div className='m-5'>
      {/* Mobile */}
      <div>
        <div className='md:hidden flex justify-end gap-5'>
          <button
            className='border px-2 rounded-lg'
            onClick={() => setISMobileFilterOpen(true)}>
            Filtrer
          </button>
          <div className='relative'>
            <button
              className='border capitalize rounded-xl px-2 py-1 w-40 flex gap-5 justify-around'
              onClick={() => setIsSortingDropdownOpen(!isSortingDropdownOpen)}>
              {sort} {isSortingDropdownOpen ? '⇑' : '⇓'}
            </button>
            {isSortingDropdownOpen && (
              <div className='absolute border rounded-md left-0 mt-2 z-50 bg-sky-950 flex flex-col items-start pl-2 gap-2 w-full'>
                {sortOptions.map((sort: string, index: number) => {
                  return (
                    <button
                      key={index}
                      className='capitalize'
                      name='sort'
                      value={sort}
                      onClick={handleFilterChange}>
                      {sort}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {isMobileFilterOpen && (
          <div className='md:hidden absolute z-50 inset-0 p-10 w-full h-full bg-gray-900'>
            <div className='flex justify-end'>
              <button
                className='text-md gap-5 border rounded-xl p-2 hover:bg-gray-700'
                onClick={() => setISMobileFilterOpen(false)}>
                Fermer [X]
              </button>
            </div>
            <p className='mt-5 mb-7 text-xl'>Affinez votre recherche</p>
            <div>// Filters for mobile go here</div>
            <div className='mt-10'>
              <button
                onClick={closeMobileFilter}
                className='border-b border-b-transparent hover:border-b hover:border-white text-xl font-bold'>
                - Valider -
              </button>
            </div>
          </div>
        )}
        {/* Modal with filters */}
      </div>

      {/* Desktop*/}
      <div className='relative' ref={ref}>
        <div className='hidden md:flex md:flex-wrap items-center m-5 md:flex-auto border gap-5 rounded-xl p-5 shadow-xl shadow-black'>
          <FilterText
            name='username'
            value={username}
            handleInputChange={handleFilterChange}
            placeholder="Nom d'utilisateur"
            symbol=''
          />
          <FilterText
            name='email'
            value={email}
            handleInputChange={handleFilterChange}
            placeholder='Email'
            symbol=''
          />
          <div className='relative inline-block text-gray-700'>
            <select
              name='role'
              onChange={handleFilterChange}
              value={role}
              className='bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 w-full h-10 pl-3 pr-6 text-base border rounded-lg appearance-none focus:shadow-outline'>
              <option value=''>Tous les rôles</option>
              <option value='user'>Utilisateur</option>
              <option value='agent'>Agent</option>
              <option value='admin'>Admin</option>
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
              <svg className='w-4 h-4 fill-slate-200' viewBox='0 0 20 20'>
                <path
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'
                  fillRule='evenodd'></path>
              </svg>
            </div>
          </div>

          <button
            className='pl-10'
            name='resetAll'
            onClick={handleFilterChange}>
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersUsers;

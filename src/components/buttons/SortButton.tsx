'use client';
import { useRef, useState } from 'react';
import { useCloseOnOutsideClick } from '../../hooks/useCloseOnOutsideClick';

const SortButton = ({ displayName, sortOptions, handleFilterChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useCloseOnOutsideClick(closeDropdown, ref);

  return (
    <div className='relative' ref={ref}>
      <button
        className='border capitalize rounded-xl px-2 py-1 w-40 flex gap-5 justify-around'
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {displayName} {isDropdownOpen ? '⇑' : '⇓'}
      </button>
      {isDropdownOpen && (
        <div className='absolute border rounded-md left-0 mt-2 z-50 bg-sky-950 flex flex-col items-start w-full'>
          {sortOptions.map((sort: string, index: number) => {
            return (
              <button
                key={index}
                className={
                  displayName === sort
                    ? `capitalize bg-gray-950 w-full rounded-md`
                    : `capitalize w-full`
                }
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
  );
};

export default SortButton;

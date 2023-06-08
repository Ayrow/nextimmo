'use client';
import { useRef, useState } from 'react';
import { useCloseOnOutsideClick } from '../../hooks/useCloseOnOutsideClick';

const DropdownButtons = ({
  displayName,
  options,
  handleFilterChange,
  name,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useCloseOnOutsideClick(closeDropdown, ref);

  return (
    <div className='relative w-52' ref={ref}>
      <button
        className='border capitalize rounded-xl px-2 py-1 flex justify-around w-full'
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {displayName.split(/(?=[A-Z])/).join(' ')} {isDropdownOpen ? '⇑' : '⇓'}
      </button>
      {isDropdownOpen && (
        <div className='absolute border rounded-md left-0 mt-2 z-50 bg-sky-950 flex flex-col items-start w-full'>
          {options.map((option: string, index: number) => {
            return (
              <button
                key={index}
                className={
                  displayName === option.split(/(?=[A-Z])/)
                    ? `capitalize bg-gray-950 w-full rounded-md`
                    : `capitalize w-full`
                }
                name={name}
                value={option}
                onClick={handleFilterChange}>
                {option.split(/(?=[A-Z])/).join(' ')}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownButtons;

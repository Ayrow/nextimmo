'use client';

import { Dispatch, SetStateAction, useRef } from 'react';
import NavLink from './NavLink';
import { LinksTypes } from '../../../utils/links';

type Props = {
  signOutUser: () => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen?: Dispatch<SetStateAction<boolean>>;
  links: LinksTypes[];
};

const DropdownMenu = ({
  signOutUser,
  setIsDropdownOpen,
  isDropdownOpen,
  links,
}: Props) => {
  const ref = useRef();

  const toggleDropdown = (e: MouseEvent) => {
    if (ref.current && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  document.addEventListener('click', toggleDropdown);

  const logOut = () => {
    signOutUser();
    setIsDropdownOpen(false);
  };

  return (
    <div
      ref={ref}
      className='fixed inset-0 sm:inset-auto sm:absolute w-full sm:w-52 sm:right-0 sm:items-center bg-black rounded-xl mt-2'>
      <div className='sm:hidden flex justify-end pr-10 bg-transparent border border-transparent'>
        <button className='' onClick={() => setIsDropdownOpen(false)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='h-8 w-8 text-white'
            viewBox='0 0 1792 1792'>
            <path d='M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z'></path>
          </svg>
        </button>
      </div>
      <div className='p-2 flex flex-col gap-5'>
        {links.map((link: LinksTypes) => {
          return (
            <NavLink
              key={link.id}
              path={link.path}
              label={link.label}
              targetSegment={link.path}
            />
          );
        })}

        <button
          onClick={logOut}
          className='block py-2 pl-3 pr-4 rounded md:bg-transparent text-red-500 md:p-0 hover:text-red-700 text-left'>
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;

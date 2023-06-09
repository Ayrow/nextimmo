'use client';

import { UserFromDB, useAuthContext } from '../../context/user/authContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DropdownMenu from '../navigation/DropdownMenu';
import { userLinks, agentLinks, adminLinks } from '../../../utils/links';

const AccountButton = () => {
  const { user, signOutUser } = useAuthContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  let navigationLinks = [];

  const [currentUser, setCurrentUser] = useState<UserFromDB>();

  const checkRole = () => {
    if (currentUser.role === 'user') {
      navigationLinks = userLinks;
    } else if (currentUser.role === 'agent') {
      navigationLinks = agentLinks;
    } else if (currentUser.role === 'admin') {
      navigationLinks = adminLinks;
    }
  };

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  if (!currentUser) {
    return (
      <Link
        href='/signin'
        className='text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>
        Sign in
      </Link>
    );
  } else {
    checkRole();
    return (
      <div className='relative'>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='hidden sm:flex text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 text-center md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>
          {currentUser?.role === 'user' ? 'Compte' : 'Tableau de bord'}
        </button>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='flex sm:hidden text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-2 text-center md:mr-0 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'>
          <span className='sr-only'>Ouvrir menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'></path>
          </svg>
        </button>
        {isDropdownOpen && (
          <DropdownMenu
            signOutUser={signOutUser}
            setIsDropdownOpen={setIsDropdownOpen}
            isDropdownOpen={isDropdownOpen}
            links={navigationLinks}
          />
        )}
      </div>
    );
  }
};

export default AccountButton;

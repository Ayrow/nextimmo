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
  const checkRole = () => {
    if (user.role === 'user') {
      navigationLinks = userLinks;
    } else if (user.role === 'agent') {
      navigationLinks = agentLinks;
    } else if (user.role === 'admin') {
      navigationLinks = adminLinks;
    }
  };

  const [currentUser, setCurrentUser] = useState<UserFromDB>();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  if (!currentUser) {
    return (
      <Link
        href='/signin'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
        Sign in
      </Link>
    );
  } else {
    checkRole();
    return (
      <div className='relative'>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          {currentUser?.role === 'user' ? 'Compte' : 'Tableau de bord'}
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

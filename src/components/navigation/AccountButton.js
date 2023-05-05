'use client';

import { useUserContext } from '../../context/user/userContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DropdownMenu from './DropdownMenu';
import { userLinks, agentLinks, adminLinks } from '../../../utils/links';

const AccountButton = () => {
  const { user, signOutUser } = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <div>
      {!currentUser ? (
        <Link
          href='/signin'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Sign in
        </Link>
      ) : (
        <div>
          {currentUser.role === 'user' && (
            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Account
              </button>
              {isDropdownOpen && (
                <DropdownMenu
                  signOutUser={signOutUser}
                  setIsDropdownOpen={setIsDropdownOpen}
                  isDropdownOpen={isDropdownOpen}
                  links={userLinks}
                />
              )}
            </div>
          )}

          {currentUser.role === 'agent' && (
            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Dashboard
              </button>
              {isDropdownOpen && (
                <DropdownMenu
                  signOutUser={signOutUser}
                  setIsDropdownOpen={setIsDropdownOpen}
                  isDropdownOpen={isDropdownOpen}
                  links={agentLinks}
                />
              )}
            </div>
          )}

          {currentUser.role === 'admin' && (
            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Account
              </button>
              {isDropdownOpen && (
                <DropdownMenu
                  signOutUser={signOutUser}
                  setIsDropdownOpen={setIsDropdownOpen}
                  isDropdownOpen={isDropdownOpen}
                  links={adminLinks}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountButton;

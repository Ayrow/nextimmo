'use client';

import { useUserContext } from '@/context/user/userContext';
import Link from 'next/link';
import { useState } from 'react';
import DropdownAccount from './DropdownAccount';

const AccountButton = () => {
  const { user, signOutUser } = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div>
      {(() => {
        if (!user) {
          return (
            <Link
              href='/signin'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
              Sign in
            </Link>
          );
        } else if (user.role == 'user') {
          return (
            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Account
              </button>
              {isDropdownOpen && (
                <DropdownAccount
                  signOutUser={signOutUser}
                  setIsDropdownOpen={setIsDropdownOpen}
                  isDropdownOpen={isDropdownOpen}
                />
              )}
            </div>
          );
        } else if (user.role == 'agent') {
          return (
            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Dashboard
              </button>
              {isDropdownOpen && (
                <DropdownAccount
                  signOutUser={signOutUser}
                  setIsDropdownOpen={setIsDropdownOpen}
                  isDropdownOpen={isDropdownOpen}
                />
              )}
            </div>
          );
        } else if (user.role == 'admin') {
          return (
            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Dashboard
              </button>
              {isDropdownOpen && (
                <DropdownAccount
                  signOutUser={signOutUser}
                  setIsDropdownOpen={setIsDropdownOpen}
                  isDropdownOpen={isDropdownOpen}
                />
              )}
            </div>
          );
        }
      })()}
    </div>
  );
};

export default AccountButton;

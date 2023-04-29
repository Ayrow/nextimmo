'use client';

import { useUserContext } from '@/context/user/userContext';
import Link from 'next/link';

const AccountButton = () => {
  const { user, signOutUser } = useUserContext();
  return (
    <div>
      {user ? (
        <div>
          <Link href='/'>Account {user.email}</Link>
          <button onClick={signOutUser}>Sign out</button>
        </div>
      ) : (
        <Link
          href='/signin'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Sign in
        </Link>
      )}
    </div>
  );
};

export default AccountButton;

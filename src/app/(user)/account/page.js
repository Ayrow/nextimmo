'use client';

import { useUserContext } from '@/context/user/userContext';

const Account = () => {
  const { user } = useUserContext();

  return (
    <div className='relative'>
      <div>
        <p>Username: {user}</p>
      </div>
    </div>
  );
};

export default Account;

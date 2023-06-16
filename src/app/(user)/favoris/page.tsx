'use client';

import { useAuthContext } from '../../../context/user/authContext';

const SavedListings = () => {
  const { user } = useAuthContext();

  if (user && user.role === 'user') {
    return <div>SavedListings</div>;
  }
};

export default SavedListings;

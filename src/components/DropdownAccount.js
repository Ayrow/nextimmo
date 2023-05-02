import { useRef } from 'react';
import NavLink from './NavLink';

const DropdownAccount = ({
  signOutUser,
  setIsDropdownOpen,
  isDropdownOpen,
}) => {
  const ref = useRef();

  const toggleDropdown = (e) => {
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
        <NavLink path='/account' label='Account' targetSegment='account' />
        <NavLink
          path='/saved-listings'
          label='Saved Listings'
          targetSegment='saved-listings'
        />
        <button
          onClick={logOut}
          className='block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 hover:text-blue-700 text-left'>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default DropdownAccount;

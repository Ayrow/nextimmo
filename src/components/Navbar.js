import Link from 'next/link';
import Image from 'next/image';
import NavLink from './NavLink';
import AccountButton from './AccountButton';

const Navbar = () => {
  return (
    <nav className=' bg-gray-900 relative w-full z-20 top-0 left-0 border-b border-gray-600'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link href='/' className='flex items-center'>
          <Image
            src='https://flowbite.com/docs/images/logo.svg'
            className='h-8 mr-3'
            alt='Logo'
            width='150'
            height='150'
          />
          <span className='self-center text-2xl font-semibold whitespace-nowrap text-white'>
            Nextimmo
          </span>
        </Link>
        <div className='flex md:order-2'>
          <AccountButton />
          <button
            type='button'
            className='inline-flex items-center p-2 text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600'>
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6'
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
        </div>
        <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'>
          <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  bg-gray-800 md:bg-gray-900 border-gray-700'>
            <li>
              <NavLink path='/' label='Accueil' targetSegment={null} />
            </li>
            <li>
              <NavLink
                path='/listings'
                label='Listings'
                targetSegment='/listings'
              />
            </li>
            <li>
              <NavLink
                path='/contact'
                label='Contact'
                targetSegment='/contact'
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

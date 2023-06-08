import Link from 'next/link';
import Image from 'next/image';
import NavLink from './NavLink';
import AccountButton from '../buttons/AccountButton';

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
        </div>
        <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'>
          <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  bg-gray-800 md:bg-gray-900 border-gray-700'>
            <li>
              <NavLink path='/' label='Accueil' targetSegment='/' />
            </li>
            <li>
              <NavLink
                path='/annonces'
                label='Annonces'
                targetSegment='/annonces'
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
      <div className='bg-sky-950 md:hidden flex gap-5 justify-center'>
        <NavLink path='/' label='Accueil' targetSegment='/' />
        <NavLink path='/annonces' label='Annonces' targetSegment='/annonces' />
        <NavLink path='/contact' label='Contact' targetSegment='/contact' />
      </div>
    </nav>
  );
};

export default Navbar;

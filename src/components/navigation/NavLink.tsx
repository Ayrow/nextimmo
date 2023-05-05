'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ label, path, targetSegment }) => {
  const activePath = usePathname();

  return (
    <Link
      className={`${
        activePath === targetSegment ? 'text-blue-500' : 'text-white'
      } block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 hover:text-blue-700 capitalize`}
      href={path}>
      {label}
    </Link>
  );
};

export default NavLink;

'use client';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const NavLink = ({ label, path, targetSegment }) => {
  const activeSegment = useSelectedLayoutSegment();
  return (
    <Link
      className={`${
        activeSegment === targetSegment ? 'text-blue-500' : 'text-white'
      } block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 hover:text-blue-700 capitalize`}
      href={path}>
      {label}
    </Link>
  );
};

export default NavLink;

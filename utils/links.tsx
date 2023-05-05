'user client';

// import { FaHeart, FaSuitcase, FaUserEdit, FaChalkboard } from 'react-icons/fa';

export type LinksTypes = {
  id: number;
  label: string;
  path: string;
};

const userLinks: LinksTypes[] = [
  {
    id: 1,
    label: 'account',
    path: '/account',
    //  icon: <FaChalkboard />,
  },
  {
    id: 2,
    label: 'saved listings',
    path: '/saved-listings',
    //  icon: <FaUserEdit />,
  },
];

const agentLinks: LinksTypes[] = [
  {
    id: 1,
    label: 'dashboard',
    path: '/dashboard',
    //  icon: <FaChalkboard />,
  },
  {
    id: 2,
    label: 'add listing',
    path: '/dashboard/add-listing',
    //  icon: <FaSuitcase />,
  },
  {
    id: 3,
    label: 'manage listings',
    path: '/dashboard/manage-listings',
    //  icon: <FaSuitcase />,
  },
];

const adminLinks: LinksTypes[] = [
  {
    id: 1,
    label: 'dashboard',
    path: 'dashboard',
    //  icon: <FaChalkboard />,
  },
  {
    id: 2,
    label: 'account',
    path: 'dashboard/account',
    //  icon: <FaUserEdit />,
  },
  {
    id: 3,
    label: 'users',
    path: 'dashboard/users',
    //  icon: <FaSuitcase />,
  },
  {
    id: 4,
    label: 'agents',
    path: 'dashboard/agents',
    // icon: <FaHeart />,
  },
  {
    id: 5,
    label: 'add listing',
    path: 'dashboard/add-listing',
    //  icon: <FaSuitcase />,
  },
  {
    id: 6,
    label: 'manage listings',
    path: 'dashboard/manage-listings',
    //  icon: <FaSuitcase />,
  },
];

export { userLinks, agentLinks, adminLinks };
